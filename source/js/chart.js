//holds the current countries selected to be displayed on the chart
var activeChartCountries =[];


//adjust the year slider values based on what is available
function changeSliderValues(dataType){
	var minMax = getAvailableYears(dataType)

	//console.log("max = " + curMax + " | min = " + curMin);
	$("#yearSelectSlider").slider("option", "max", minMax.max); 
	$("#yearSelectSlider").slider("option", "min", minMax.min);
	
	//update the map since the user changed the dataset
	updateMap();
}

//update the map based on the current dataset selected and the year selected
function updateMap(){
	console.log("update map");
	//get the current year and the current dataset
	var year =  $('#yearSelectSlider').slider( "option", "value" );
	var dataType =  $("input:radio[name ='dataSelection']:checked").val();
	
	//get the name of the type of chart selected
	var dataSetName = $("input:radio[name ='dataSelection']:checked").parent().text();
 

	if((dataType)&&(year)){
		console.log(dataType + " | " + year);
		//label the map (fill in text on the map overlay) and show it
		$("#mapOverlay").text(dataSetName + " - " + year);
		$("#mapOverlay").show();
		
		var inverse = updateChloropleth(dataType, year);
		var isConflictKey = false;
		//build the map key
		if(dataType === "conflict"){
			isConflictKey = true;
		}
		
		buildMapKey(inverse,  $("#switchRawOrTrend").bootstrapSwitch('state'), isConflictKey);
		//if this is showing conflict then only show the red
		if(isConflictKey){
			$("#mapKey").hide();
		}
		else{
			$("#mapKey").show();
		}
	}
}



//update the colors of the chlopleth
function updateChloropleth(dataType, year){
	//var dataPath = getFullDataPath(dataType, year);
	//loop through each country
	
	//the min and max values of the desired dataset.  Used to determine the scale of the quantize function
	var values=[];
	var countryDataValue;
	
	//determine if the user wants raw or trend data
	if($("#switchRawOrTrend").bootstrapSwitch('state')===true){
		var useRawData = "value";
	}
	else{
		var useRawData = "trend";
	}
	console.log(useRawData);

	
	//retrieve and sort all of the datapoints for percentile calculation later
	if(useRawData){
		//loop through the countries to get the min and max values of the data
		for (var country in countryData){
			if(countryData.hasOwnProperty(country)){
				//loop through each date in the desired data set
				countryDataValue = getCountryData(country, dataType, year, useRawData);
			}
			if((countryDataValue)&&(!isNaN(countryDataValue))){
				values.push(Number(countryDataValue));
			}	
		}
		
		//sort the values array, this is required in order to calculate percentile
		values = _.sortBy(values, function(num) {
			return num;
		}); // [1, 2, 3]
	}
	
	var inverse = false;	//the redder colors are always bad; however, for some dataset higher numbers are bad,
	//while in other, higher number are good.  This variable is used to invert the colors based on the
	//dataset
	// invert the color set if higher is better
	if((dataType === "gdpCapita")||(dataType === "gdpCountry")||(dataType === "corruption")||
		(dataType === "percentInternet")||(dataType==="cashSurplus")){
			inverse=true;
	}
	
	
	
	//loop through the countries to get the data
	for (var country in countryData){
		if(countryData.hasOwnProperty(country)){
			//loop through each date in the desired data set

			countryDataValue = getCountryData(country, dataType, year, useRawData);
			
			//some of the countries that we have codes for are not in the map
			// so don't try to update those countries
			try{
				//remove all classes related to the country
				//$("#"+country).removeClass();
				if(countryDataValue){
					if(useRawData==="raw"){
						var percentile = getPercentile(values, Number(countryDataValue));
						var colorClass = getColorClass(percentile, inverse);
						console.log(country + ": value = " + countryDataValue + 
							" | percentile = " + percentile + " | color = " + colorClass);
						$('path[id="' + country + '"]').attr("class", "land " + colorClass);
					}
					else{
						if(countryDataValue.counter){
							$('path[id="' + country + '"]').attr("class", "land " + 
								getTrendColorClass(countryDataValue.counter, countryDataValue.trendType, inverse));
						}
						else{
							$('path[id="' + country + '"]').attr("class", "land noData");
						}
					}
				}
				else{
					$('path[id="' + country + '"]').attr("class", "land noData");
				}
			}
			catch(err){
				console.log("no svg map image for " + country); 
			}
			
		}
	}
	
	return inverse;
}



//builds the correct map key based on data type
function buildMapKey(inverse, percentile, isConflictKey){
	percentile = true;
	
	//correct the block colors
	if(inverse){
		$("#1Block").attr("class", "zeroPercentile");
		$("#2Block").attr("class", "tenPercentile");
		$("#3Block").attr("class", "twentyPercentile");
		$("#4Block").attr("class", "thirtyPercentile");
		$("#5Block").attr("class", "fourtyPercentile");
		$("#6Block").attr("class", "fiftyPercentile");
		$("#7Block").attr("class", "sixtyPercentile");
		$("#8Block").attr("class", "seventyPercentile");
		$("#9Block").attr("class", "eightyPercentile");
		$("#10Block").attr("class", "ninetyPercentile");
	}
	else{
		$("#1Block").attr("class", "ninetyPercentile");
		$("#2Block").attr("class", "eightyPercentile");
		$("#3Block").attr("class", "seventyPercentile");
		$("#4Block").attr("class", "sixtyPercentile");
		$("#5Block").attr("class", "fiftyPercentile");
		$("#6Block").attr("class", "fourtyPercentile");
		$("#7Block").attr("class", "thirtyPercentile");
		$("#8Block").attr("class", "twentyPercentile");
		$("#9Block").attr("class", "tenPercentile");
		$("#10Block").attr("class", "zeroPercentile");
	}

	
	//alter the key text
	if($("#switchRawOrTrend").bootstrapSwitch('state')){
		$("#ninetyText").text("Ninety Percentile");
		$("#eightyText").text("Eighty Percentile");
		$("#seventyText").text("Seventy Percentile");
		$("#sixtyText").text("Sixty Percentile");
		$("#fiftyText").text("Fifty Percentile");
		$("#fourtyText").text("Fourty Percentile");
		$("#thirtyText").text("Thirty Percentile");
		$("#twentyText").text("Twenty Percentile");
		$("#tenText").text("Ten Percentile");
		$("#zeroText").text("Zero Percentile");
		$("#noDataText").text("No Data");
	}
	else{
		$("#ninetyText").text("5 year up");
		$("#eightyText").text("4 year up");
		$("#seventyText").text("3 year up");
		$("#sixtyText").text("2 year up");
		$("#fiftyText").text("1 year up");
		$("#fourtyText").text("1 year down");
		$("#thirtyText").text("2 year down");
		$("#twentyText").text("3 year down");
		$("#tenText").text("4 year down");
		$("#zeroText").text("5 year down");
		$("#noDataText").text("No Trend");
	}
	

}

//return the appropriate color based on the percentile
function getColorClass(percentile, inverse){
	if(inverse){
		if(percentile<.1){return "ninetyPercentile"};
		if(percentile<.2){return "eightyPercentile"};
		if(percentile<.3){return "seventyPercentile"};
		if(percentile<.4){return "sixtyPercentile"};
		if(percentile<.5){return "fiftyPercentile"};
		if(percentile<.6){return "fourtyPercentile"};
		if(percentile<.7){return "thirtyPercentile"};
		if(percentile<.8){return "twentyPercentile"};
		if(percentile<.9){return "tenPercentile"};
		if(percentile<=1){return "zeroPercentile"};	
	}
	else{
		if(percentile<.1){return "zeroPercentile"};
		if(percentile<.2){return "tenPercentile"};
		if(percentile<.3){return "twentyPercentile"};
		if(percentile<.4){return "thirtyPercentile"};
		if(percentile<.5){return "fourtyPercentile"};
		if(percentile<.6){return "fiftyPercentile"};
		if(percentile<.7){return "sixtyPercentile"};
		if(percentile<.8){return "seventyPercentile"};
		if(percentile<.9){return "eightyPercentile"};
		if(percentile<=1){return "ninetyPercentile"};
	}
}

function getTrendColorClass(numYears, trend, inverse){
	var classString = "trend";

	if(numYears===0){
		classString ="noData";
	}
	
	numYears = Math.min(numYears, 5);
	
	//normal trend classes have up trends in positive categories using the green fill colors
	// this needs to be switched when looking at negative values
	if(!inverse){
		if(trend==="up"){
			trend="down";
		}
		else{
			trend="up"
		}
	}
	classString = classString + trend + numYears;
	
	return classString;
}

//event handlers
$(document).ready(function () {
	
	//intialize bootstrap items
    $('.btn-group').button();
	$("#switchRawOrTrend").bootstrapSwitch();
    
    $("#formSelection input:radio").change(function () {
        console.log($("#formSelection input:radio:checked").val());
    });

	$('#yearSelectSlider').slider({
		change: updateMap,
		disabled: true,
		step: 1,
		slide: function(event, ui) {
        	tooltip.text(ui.value);
			$("#yearDisplayed").text(ui.value);
    	}
	}).find(".ui-slider-handle").append(tooltip).hover(function() {
    	tooltip.show()
	}, function() {
		tooltip.hide()
	});

    $('input[type=radio]').click(function(){
        if(this.name === "dataSelection"){
			$('#yearSelectSlider').slider({
				disabled: false
			})
            changeSliderValues(this.value);
        }
		
    });
	
	$('#btnAddYear').click(function(e, ui){
		console.log("add year");
		$('#yearSelectSlider').slider(
	 		'value', $('#yearSelectSlider').slider("option", "value") + 1
	 	);
		//tooltip.text(ui.value);
		$("#yearDisplayed").text($('#yearSelectSlider').slider("option", "value"));
	});
	
	$('#btnSubtractYear').click(function(e, ui){
		console.log("subtract year");
		$('#yearSelectSlider').slider(
	 		'value', $('#yearSelectSlider').slider("option", "value") - 1
	 	);
		 //tooltip.text(ui.value);
		$("#yearDisplayed").text($('#yearSelectSlider').slider("option", "value"));
	});
	
	$('.btn-group .btn').on("click",function(e, ui){
		$("#mapTab").hide();
		$("#chartTab").hide();
		switch(e.currentTarget.innerText){
			case "View Map":
				$("#mapTab").show();
			break;
			case "View Charts":
				$("#chartTab").show();
			break;
		}
	})
	
	//$('#btnPrintRefugeeData').click(printRefugeeData);

	//initially hide the map overlay until something is selected
	$("#mapOverlay").hide(); 
	$("#mapKey").hide();
	$('#mapKey').hide().removeClass('hide');
    loadCountryData();
	
	$("#mapTab").hide();
	$("#chartTab").show();
});

//load the map 
function loadMap(){
	
	queue()
    .defer(d3.json, "./topoJSONData/countriesWithNames.json")
    .await(displayMap);
	
	//fill the country list on the chart
	fillChartCountryList();
}


//show the map
function displayMap(error, world){
	console.log("displaying map");
	if (error){
		console.log(error);
	} 
	else{
		svg.selectAll("path")
			.data(world.features)
			.enter().append("path")
				.attr("d", path)
				.attr("class", "land")
				.attr("id", function (d, i) {	//assign an id to each country
					
					var exclusionNames = [
						"French Southern and Antarctic Lands"
					];
					//console.log(d.properties.name);
					var worldCountryName = normalizeCountryName(d.properties.name);
					if (_.indexOf(exclusionNames, worldCountryName) === -1) {
						//console.log(worldCountryName + " : " + countryData[worldCountryName].code)
					}
					return worldCountryName;
				})
			.append("title")
				.attr("id", function(d){return normalizeCountryName(d.properties.name) + "Title"})
    			.text(function(d) { return normalizeCountryName(d.properties.name)});
			
	}
}
function fillChartCountryList(){
	//loop through the countries to get the data
	for (var country in countryData){
		if(countryData.hasOwnProperty(country)){
			var node = document.createElement("BUTTON");                 // Create a <li> node
			var textnode = document.createTextNode(country);         // Create a text node
			node.appendChild(textnode);                              // Append the text to <li>
			node.id = "chartBtn" + country;
			node.className = "btn btn-default";
			document.getElementById("chartCountryList").appendChild(node);     // Append <li> to <ul> with id="myList"
			node.addEventListener("click", chartCountryClicked);

		}
		
	}
}

//the user clicks a country on the chart page
function chartCountryClicked(e){
	var currentClass = $("[id='" + e.currentTarget.id +"']").attr('class');
	var countryName = e.currentTarget.id.replace("chartBtn", "");
	
	if(currentClass.indexOf("active")>-1){	//button is active
		$("[id='" + e.currentTarget.id +"']").removeClass("active");
		//remove this country from array of active chart countries
		activeChartCountries.splice(activeChartCountries.indexOf(countryName), 1);

	}
	else{
		$("[id='" + e.currentTarget.id +"']").addClass("active");
		//add this country to the array of active chart countries
		activeChartCountries.push(countryName);

	}
	console.log(activeChartCountries);
	updateChart();
}


function updateChart(){
	var dataType =  $("input:radio[name ='chartDataSelection']:checked").val();
	if(dataType){
		console.log(dataType);
		var data = assembleChartData(dataType);
		if((data.dataArray)&&(data.dataArray.length>0)){
			showUpdatedChart(data);
		}
	}
	
}

function assembleChartData(dataType){
	var minMax = getAvailableYears(dataType);
	var dataArray=[];
	var min = Infinity;
	var max = -Infinity;

	for(var i = 0; i< activeChartCountries.length; i++){
		var data = [];
		for(var year = minMax.min; year<minMax.max; year++){
			var dataValue = getCountryData(activeChartCountries, dataType, year, "percentage");
			if(dataValue){
				data.push({
					year : year,
					value: dataValue,
					country: activeChartCountries[i]
				});
				if(dataValue<min){
					min = dataValue;
				}
				if(dataValue>min){
					max = dataValue;
				}
			}
		}
		dataArray.push(data);
	}
	return {
		dataArray:dataArray,
		min: min,
		max: max
	};
}

function showUpdatedChart(data){
	var barWidth = chartWidth / data.dataArray[0].length;
	// var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
	// 						11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
	var dataset = data.dataArray[0];
	

	function scaleY(val){
	};
	
	
	 var bar = chart.selectAll("rect")
      	.data(dataset)
    	.enter()
		.append("rect")
		.attr("x", function(d, i) {
			return i * (barWidth+1);  //Bar width of 20 plus 1 for padding
		})
		.attr("y", function(d) {
			return scaleY(d.value);  
		})
		.attr("width", barWidth)
  		.attr("height", function(d){
			  return chartHeight - scaleY(d.value);
		});
		
	//add the text for each bar
	chart.selectAll("text")
		.data(dataset)
    	.enter()
		.append("text")
		.text(function(d) {
        	return d.year;
   		})
		.attr("text-anchor", "middle")
		.attr("x", function(d, i) {
			return i * (barWidth+1);
		})
		.attr("y", function(d) {
				return chartHeight - d.value - 15;
		})
		.attr("font-family", "sans-serif")
		.attr("font-size", "11px")
		.attr("fill", "black");

}

//function to get the minimum and maximum values
function getAvailableYears(dataType){
	var curMin = Infinity;
	var curMax = -Infinity;

	//find the dataset that matches the requested set
	var dataPath = getDataPath(dataType).path;
	
	//loop through each country
	for (var country in countryData){
		if(countryData.hasOwnProperty(country)){
			//loop through each date in the desired data set
			for (var date in countryData[country][dataPath]){
				if(countryData[country][dataPath].hasOwnProperty(date)){
					//console.log(country + " - " + date);
					if(Number(date)>curMax){
						curMax = Number(date);
					}
					if(Number(date)<curMin){
						curMin = Number(date);
					}
				}
			}
		}
	}
	return {max: curMax, min: curMin};
}

function zoomed() {
	projection
		.translate(zoom.translate())
		.scale(zoom.scale());
	
	g.selectAll("path")
		.attr("d", path);
}