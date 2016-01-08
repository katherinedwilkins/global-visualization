"use strict";
var svg;
var w = 800, h = 500;
var padding = 30;
var leftPadding = 75;
var bottomPadding = 160;
var yAxisCenter;

var regions = {
	"Africa": d3.svg.symbol().type("square"),
	"Antartica": d3.svg.symbol().type("circle"),
	"Asia": d3.svg.symbol().type("circle"),
	"Caribbean": d3.svg.symbol().type("cross"),
	"Europe": d3.svg.symbol().type("diamond"),
	"North America": d3.svg.symbol().type("triangle-up"),
	"Oceania": d3.svg.symbol().type("circle"),
	"South America": d3.svg.symbol().type("triangle-down")
}
var symbolScale = d3.scale.ordinal()
	.domain(['Africa', 'Asia & Oceania', 'Caribbean', 'Europe', 'North America', 'South America'])
	.range([
		regions["Africa"](),
		regions["Asia"](),
		regions["Caribbean"](),
		regions["Europe"](),
		regions["North America"](),
		regions["South America"]()
	]);

window.onload = function () {
	async.series([
        loadCountryData,

    ],// optional callback
    function(err, results){
         console.log("**** loaded ****");
         $("#shade").hide();
    });
	createChartArea();
	fillAxisDropdowns();
	$(".AxisMenuItem").click(function (e) {
		changeAxisSelection(e);
	});

	if(typeof(Worker)=="undefined"){
		console.log("webworker not supported");
	}
	//instantiate the slider
	updateSlider(startYear, new Date().getFullYear());
}


function fillAxisDropdowns() {
	for (var dataset in datasetInfo) {
		if (datasetInfo.hasOwnProperty(dataset)) {
			if (datasetInfo[dataset].active) {
				var nodeX = document.createElement("LI");
				nodeX.textContent = datasetInfo[dataset].name;
				nodeX.className = "xAxisMenuItem AxisMenuItem";
				nodeX.id = datasetInfo[dataset].shortName;

				var nodeY = document.createElement("LI");
				nodeY.textContent = datasetInfo[dataset].name;
				nodeY.className = "yAxisMenuItem AxisMenuItem";
				nodeY.id = datasetInfo[dataset].shortName;

				document.getElementById("xAxisMenu").appendChild(nodeX);
				document.getElementById("yAxisMenu").appendChild(nodeY);
			}
		}
	}
}

function changeAxisSelection(e) {	
	var selectedName = "xAxisSelected";
	if (e.currentTarget.className.indexOf("yAxisMenuItem") > -1) {
		selectedName = "yAxisSelected"
	}
	document.getElementById(selectedName).innerHTML = datasetInfo[e.currentTarget.id].name;
	document.getElementById(selectedName).setAttribute("shortName", datasetInfo[e.currentTarget.id].shortName);
	
	updatePlot();
}


function updatePlot() {
	var xAxisDatasetInfo = datasetInfo[document.getElementById("xAxisSelected").getAttribute("shortName")];
	var yAxisDatasetInfo = datasetInfo[document.getElementById("yAxisSelected").getAttribute("shortName")];
	if ((xAxisDatasetInfo) && (yAxisDatasetInfo)) {
		document.getElementById("waitingMessage").innerHTML = "Please Wait.";
		$("#shade").show();

		async.waterfall([
			function (callback) {
				getPlotData(callback, xAxisDatasetInfo, yAxisDatasetInfo);//, drawUpdatedPlot, callback);
			},
			function (plotInfo, callback) {
				document.getElementById("waitingMessage").innerHTML = "Please Wait. " + plotInfo.data.length + " data points found";
				drawUpdatedPlot(plotInfo, callback);
			}
		],
			function (err, results) {
				if(results === "done"){
					$("#shade").fadeOut(1000);
				}
		});
	}

}

function drawUpdatedPlot(plotInfo, callback) {
	var dataset = plotInfo.data;
	var xAxisDatasetInfo = datasetInfo[document.getElementById("xAxisSelected").getAttribute("shortName")];
	var yAxisDatasetInfo = datasetInfo[document.getElementById("yAxisSelected").getAttribute("shortName")];
		
	//need to create an array of x values and an array of y values in order to calculate
	// correlation coefficients using jstat
	var xArray = [], yArray = [];
		
	//make the plot type and dataset specific adjustments
	makeAdjustments(plotInfo, xAxisDatasetInfo, yAxisDatasetInfo);
		
		
	//clear the current plot
	$("#scatterPlotSVG").empty();

	console.log(dataset.length + " records found");
	var xScale = createScale(plotInfo.xScaleType, "x", dataset)
	var yScale = createScale(plotInfo.yScaleType, "y", dataset);

	var colorScale = d3.scale.linear()
		.domain([d3.min(dataset, function (d) { return d[3] }), d3.max(dataset, function (d) { return d[3] })])
		.range(["#87CEFF", "#0000FF"]);
		
	//set the slider to the correct min and max years
	updateSlider(
		d3.min(dataset, function (d) { return d[3] }), d3.max(dataset, function (d) { return d[3] })
		)
		
	//create both  axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	if (plotInfo.xScaleType !== "ordinal") {
		xAxis.ticks(5).tickFormat(d3.format("s"))
	}
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
	if (plotInfo.yScaleType !== "ordinal") {
		yAxis.ticks(5).tickFormat(d3.format("s"));
	}
	else {
		leftPadding = 95;
		console.log("leftPadding = " + leftPadding);
	}
		
	//put the axis on the chart	
	svg.append("g")
		.attr("class", "axis")  //Assign "axis" class
		.attr("id", "xAxis")  //Assign "axis" id
		.attr("transform", "translate(0," + (h - bottomPadding) + ")")
		.call(xAxis);
	svg.append("g")
		.attr("class", "axis")
		.attr("id", "yAxis")  //Assign "axis" id
		.attr("transform", "translate(" + leftPadding + ",0)")
		.call(yAxis);
		
	//create the tooltip year	  
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function (d) {
			var htmlTip;
			var xValue, yValue;
			if (!isNaN(d.x)) {
				xValue = d.x.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			if (!isNaN(d.y)) {
				yValue = d.y.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			htmlTip = "<div><span>" + d.country + " " + d.year + "</span></div>" +
			"<div><span>" + xAxisDatasetInfo.name + ": " + xValue + "</span></div>" +
			"<div><span>" + yAxisDatasetInfo.name + ": " + yValue + "</span></div>";
			if (d.destination) {
				htmlTip = htmlTip +
				"<div><span> Destination: " + d.destination + "</span></div>";
			}
			return htmlTip;
		});
	svg.call(tip);
		
	//add the data points
	svg.selectAll("path")
		.data(dataset)
		.enter()
		.append("path")
		.attr("id", function (d) {
			return d[0] + "-" + d[3];
		})
		.attr("class", "dataPoint")
		.attr("transform", function (d) { 
					
			// add the values to the arrays used to calculate correlations
			xArray.push(d[1]);
			yArray.push(d[2]);
			return "translate(" + xScale(d[1]) + "," + yScale(d[2]) + ")";
		})
		.attr("d", function (d) {
			//console.log(d[4]);
			return regions[d[4]]();
		})
		.style("fill", function (d) { return colorScale(d[3]) })
		.style("stroke", "#000000")
		.style("stroke-width", "1")
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
		.datum(function (d) {
			var object = {
				country: d[0],
				x: d[1],
				y: d[2],
				year: d[3],
				region: d[4]
			}
					
			//distance plots include a destination location
			if (d[5]) {
				object.destination = d[5]
			}
			return object;
		});
			
	//add labels to the axes
	//X axis labels	
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (w / 2) + "," + (h - bottomPadding + 35) + ")")  // centre below axis
		.text(xAxisDatasetInfo.name);
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (w / 2) + "," + (h - bottomPadding + 50) + ")")  // centre below axis
		.text("(" + xAxisDatasetInfo.source + ")")
		.attr('class', 'axisAttribution');
	if (xAxisDatasetInfo.note) {
		svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(" + (w / 2) + "," + (h - bottomPadding + 60) + ")")  // centre below axis
            .text("(" + xAxisDatasetInfo.note + ")")
			.attr('class', 'axisAttribution');
	}
		
	//Y axis labels
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (padding / 2) + "," + yAxisCenter + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text(yAxisDatasetInfo.name);
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (padding / 2 + 15) + "," + yAxisCenter + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("(" + yAxisDatasetInfo.source + ")")
		.attr('class', 'axisAttribution');
	if (yAxisDatasetInfo.note) {
		svg.append("text")
			.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
			.attr("transform", "translate(" + (padding / 2 + 25) + "," + yAxisCenter + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
			.text("(" + yAxisDatasetInfo.note + ")")
			.attr('class', 'axisAttribution');
	}
			
	//create the symbol shape legend
	svg.append("g")
		.attr("class", "legendSymbol")
		.attr("transform", "translate(" + (padding) + "," + (h - bottomPadding + 75) + ")");

	var legendPath = d3.legend.symbol()
		.scale(symbolScale)
		.orient("horizontal")
		.shapePadding((w - 2 * padding) / 6)


	svg.select(".legendSymbol")
		.call(legendPath);

	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to center the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (w / 2) + "," + (h - 10) + ")")  // centre below axis
		.text("Darker color indicates most recent data");

	document.getElementById("pearsonCoefficient").innerHTML = (jStat.corrcoeff(xArray, yArray)).toFixed(3);
	document.getElementById("spearmanCoefficient").innerHTML = (jStat.spearmancoeff(xArray, yArray)).toFixed(3);
	
	//execute the callback function and tell it that we're done
	callback(null, "done");
}
	



function createChartArea() {
	//Create SVG element
	svg = d3.select("#scatterPlot")
		.attr("class", "scatterPlotSVG")
		.append("svg")
		.attr("id", "scatterPlotSVG")  
		.attr("width", w)
		.attr("height", h);
}






function createScale(scaleType, axis, data) {
	var scale;
	switch (scaleType) {
		case "linear":
			switch (axis) {
				case ("x"):
					scale = d3.scale.linear();
					scale.domain([0, d3.max(data, function (d) { return d[1] })]);
					scale.range([leftPadding, w - padding]);
					break;
				case ("y"):
					scale = d3.scale.linear();
					scale.domain([0, d3.max(data, function (d) { return d[2] })]);
					scale.range([h - bottomPadding, padding]);
					break;
			}
			break;

		case "ordinal":
			switch (axis) {
				case ("x"):
					scale = d3.scale.ordinal();
					scale.domain(data.map(function (d) {
						return d[1];
					}));
					scale.rangePoints([leftPadding, w - padding]);
					break;
				case ("y"):
					scale = d3.scale.ordinal();
					scale.domain(data.map(function (d) { 
						//console.log(d[2]);
						return d[2];
					}));
					scale.rangePoints([h - bottomPadding, padding]);
					break;
			}
			break;
	}
	return scale;
}


function makeAdjustments(plotInfo, xAxisDatasetInfo, yAxisDatasetInfo) {
	//adjust the padding based on the plot type, ordinal plots need more padding on the left
	if (plotInfo.yScaleType !== "ordinal") {
		leftPadding = 75;
	}
	else {
		leftPadding = 100;
	}

	if (yAxisDatasetInfo.shortName.indexOf("PTS") !== -1) {	//the PTS data has a longer attribution string
		yAxisCenter = (h / 2 - bottomPadding / 2) + 25;
	}
	else {
		yAxisCenter = (h / 2 - bottomPadding / 2);

	}
}

function updateSlider(min, max) {
	$('#yearSelectSlider').slider({
		range: true,
		min: min,
		max: max,
		values: [startYear, new Date().getFullYear()],
		change: function (event, ui) {
			hidePlotPointsByDate(ui.values[0], ui.values[1]);
		},
		slide: function (event, ui) {
			document.getElementById("yearsDisplayed").innerHTML = (ui.values[0] + " - " + ui.values[1]);
		},
		create: function (event, ui) {
			document.getElementById("yearsDisplayed").innerHTML = (min + " - " + max);
		}
	});

	document.getElementById("minYear").innerHTML = $('#yearSelectSlider').slider("option", "min");
	document.getElementById("maxYear").innerHTML = $('#yearSelectSlider').slider("option", "max");
	$('#yearSelectSlider').slider("option", "max", max);
	$('#yearSelectSlider').slider("option", "min", min);
	$('#yearSelectSlider').slider("values", [min, max]);
}

function hidePlotPointsByDate(min, max) {
	var list = d3.selectAll(".dataPoint")[0];
	for (var i = 0; i < list.length; i++) {
		//console.log(list[i].id);
		var elementID = list[i].id;
		var selectedYear = d3.select("[id='" + elementID + "']").datum().year;
		if ((selectedYear < min) || (selectedYear > max)) {
			//console.log("hide: " + elementID);
			d3.select("[id='" + elementID + "']").transition().call(hidePoint);
		}
		else {
			d3.select("[id='" + elementID + "']").transition().call(showPoint);
		}
	}
}

function hidePlotPointsByCountry() {

}

function hidePoint(transition) {
	transition
		.duration(1000)
		.ease("linear")
		.style("opacity", 0)
}

function showPoint(transition) {
	transition
		.duration(1000)
		.ease("linear")
		.style("opacity", 100)
}

// function showPointData(point){
// 	//console.log(point.id);
// 	d3.select('#'+point.id).datum();

// }