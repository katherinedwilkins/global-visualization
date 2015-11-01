var mapCanvas;
var map = d3.map();

var mapWidth = 960, mapHeight = 600;
var scale0 = (mapWidth - 1) / 2 / Math.PI;
var projection = d3.geo.mercator();
var zoom = d3.behavior.zoom()
    .translate([mapWidth / 2, mapHeight / 2])
    .scale(scale0)
    .scaleExtent([scale0, 8 * scale0])
    .on("zoom", zoomed);

var path = d3.geo.path()
    .projection(projection);
	
var svg = d3.select("#mapContainer").append("svg")
    .attr("width", mapWidth)
    .attr("height", mapHeight)
	.append("g");
var g = svg.append("g");
svg.append("rect")
    .attr("class", "overlay")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

svg
    .call(zoom)
    .call(zoom.event);

//give access to Azure Services
//Currently not needed
var MobileServiceClient = WindowsAzure.MobileServiceClient; 
var client = new WindowsAzure.MobileServiceClient(
    "https://globalvisualizationmobileservice.azure-mobile.net/",
    "nEqHeNeqxcozORPJNVnEGUUWMRrHgW13"
);

//the object that will end up holding all of the data for all of the countries
var countryData = {};




function changeVisibleForm(form) {
    //make all forms invisible
    $(".tabContainer").hide();
    
    //make the desired form visible
    switch (form) {
        case "map":
            $("#mapContainer").show();
            break;
        case "controlPanel":
            $("#controlPanelContainer").show();
            break;
    }
}

// On page init, fetch the data and set up event handlers
$(function () {
    // mapCanvas = d3.select("map").append("svg")
    //     .attr("width", 900)
    //     .attr("height", 600);
        
    // d3.json("world-110m.json", function(error, data){
    //     if (error){
    //         return console.error(error);
    //     }
    //     else{
    //         console.log(data);
    //     }
    // });
    // map = new Datamap({
    //     element: document.getElementById('map'),
    //     fills: {
    //         HIGH: '#afafaf',
    //         LOW: '#123456',
    //         MEDIUM: 'blue',
    //         UNKNOWN: 'rgb(0,0,0)',
    //         defaultFill: 'green'
    //     },
    //     // Zoom in on Africa
    //     setProjection: function(element) {
    //         var projection = d3.geo.equirectangular/*mercator*/()
    //         .scale(150)
    //         .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    //         var path = d3.geo.path()
    //         .projection(projection);
    //         return {path: path, projection: projection};
    //     },
    //     geographyConfig: {
    //         highlightOnHover: true,
    //         popupOnHover: false
    //     },
    //     data: {
    //         IRL: {
    //             fillKey: 'LOW',
    //             numberOfThings: 2002
    //         },
    //         USA: {
    //             fillKey: 'MEDIUM',
    //             numberOfThings: 10381
    //         }
    //     },

    // });
    

    //console.log(map);
});

// function mapZoom(evt){
    



//     switch(evt.currentTarget.id){
//         case "zoomIn":
//             //svgContainer.attr("transform", "scale(400, 400)")
//             console.log("zoom in");
//             //map.setProjection.scale(400);
//         break;
//         case "zoomOut":
//             console.log("zoom out");
//             map.setProjection.scale(20);
//         break;
//     }
    
//     console.log("click");
//     console.log(map.projection);
// }

//adjust the year slider values based on what is available
function changeSliderValues(dataType){
	var curMin = Infinity;
	var curMax = -Infinity;
	//loop through each country
	//find the dataset that matches the requested set
	//loop through the available years
	//if current year is less than current min then make current min = current year
	//if current year is greater than current max then make current max = current year
    for(var i=0; i<data.length; i++){
			countryData[data[i].Name] = {code: data[i].Code};
			
			//create a placeholder for refugee data
			countryData[data[i].Name].refugeeData ={};
		}
}

//event handlers
$(document).ready(function () {
    $('.btn-group').button();
    
    //change to map view
    changeVisibleForm("controlPanel");
    
    $("#formSelection input:radio").change(function () {
        console.log($("#formSelection input:radio:checked").val());
        changeVisibleForm($("#formSelection input:radio:checked").val());
    });
	
	$('#yearSelectSlider').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
		}
	});
    
    $('input[type=radio]').click(function(){
        if(this.name === "dataSelection"){
            changeSliderValues(this.value);
        }
    });

    loadCountryData();
});




//fill in country name and code informaiton on the countryData object
//each country will be a seperate object within the countryData object
function loadCountryData(data){
	d3.csv("./dataSets/countries and two digit codes.csv", function(data){
		for(var i=0; i<data.length; i++){
			countryData[data[i].Name] = {code: data[i].Code};
			
			//create a placeholder for refugee data
			countryData[data[i].Name].refugeeData ={};
		}

		// loadGDP(callBacksInProgress);
		//load all the data
		async.parallel([
			loadCorruptionPerceptionIndex,
			loadGDP,
			loadPopulation,
			loadRefugeeNumbers
		], normalizeData);	
	});
}

//perform any mathmatical operations to the country data
function normalizeData(){
	async.parallel([
			normalizeGDP
		], loadMap);
}

//load the map 
function loadMap(){
	queue()
    .defer(d3.json, "./topoJSONData/countriesWithNames.json")
    .await(displayMap);
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
				console.log(d.properties.name);
				var worldCountryName = normalizeCountryName(d.properties.name);
				if (_.indexOf(exclusionNames, worldCountryName) === -1) {
					console.log(worldCountryName + " : " + countryData[worldCountryName].code)
				}
				return worldCountryName
			})
			.attr("name", function (d, i) { console.log(d.properties.name) });  
	}
}

function zoomed() {
	projection
		.translate(zoom.translate())
		.scale(zoom.scale());
	
	g.selectAll("path")
		.attr("d", path);
}

function loadRefugeeNumbers(callback){
	d3.csv("./dataSets/Refugee_Numbers_UNdata_Export_20151029_232124036.csv", function(data){
				//names to exclude when parsing corruption index
		var exclusionNames = [
			"Stateless",
			"Various",
			"Tibetans"		//Tibet is not listed as a country
		];
		var fugeeCounter = 0;
		for(var recordCounter=0; recordCounter<data.length; recordCounter++){
			//get the name of the origin country this record
			var originCountry = normalizeCountryName(data[recordCounter]["Country or territory of origin"]);
			//get the name of the country of destination
			var destCountry = normalizeCountryName(data[recordCounter]["Country or territory of asylum or residence"]);
			//get the year
			var year = data[recordCounter].Year;
			//get number of refugees
			var numRefugees = Number(data[recordCounter]["Total refugees and people in refugee-like situations<sup>**</sup>"]);
			fugeeCounter += numRefugees;
			
			//check to see if data already exists for this year for each Country
			//in not, then create the object for that year
			//console.log("originCountry = " + originCountry + " |  destCountry = " + destCountry + " | # refugees = " + numRefugees);
			if((_.indexOf(exclusionNames, originCountry)===-1)&&(originCountry)){
				if(!countryData[originCountry].refugeeData[year]){
					countryData[originCountry].refugeeData[year]={
						refugeesIn : 0, 
						refugeesOut: 0
					};
				}
				countryData[originCountry].refugeeData[year].refugeesOut += numRefugees;
			}
			if((_.indexOf(exclusionNames, destCountry)===-1)&&(destCountry)){
				if(!countryData[destCountry].refugeeData[year]){
					countryData[destCountry].refugeeData[year]={
						refugeesIn : 0, 
						refugeesOut: 0
					};
				}
				countryData[destCountry].refugeeData[year].refugeesIn += numRefugees;
			}
		}
		console.log("loadRefugeeNumbers complete. Total refugees = " + fugeeCounter);
		return callback();
	});
}

function loadCorruptionPerceptionIndex(callback){
	d3.csv("./dataSets/corruption perception index.csv", function(data){
		//parse the dataset
		
		//names to exclude when parsing corruption index
		var exclusionNames = [
			"Ivory Coast",	//alredy in as Cote d'Ivore
			"Kuweit",		//misspelling
			"FYR Macedonia",	//already on list as Macedonia
			"Palestinian Authority", //already listed as Palestine
			"Serbia and Montenegro", //just track Montenegro and Serbia as seperate countries
			"Yugoslavia",	//not a country any more
		];
		
		//loop through the countries
		for(var countryCounter=0; countryCounter<data.length; countryCounter++){
			var jurisdiction = data[countryCounter].Jurisdiction;
			//console.log(jurisdiction);
			//exclude certain names
			if(_.indexOf(exclusionNames, jurisdiction)===-1){
				var corruptionPerceptionIndex = data[countryCounter];
				
				
				//take care of country names that don't match official country names
				jurisdiction = normalizeCountryName(jurisdiction);
				
				countryData[jurisdiction].corruptionPerceptionIndex ={raw: corruptionPerceptionIndex};
				//remove the Jurisdiction data object from the corruptionPerceptionIndex information
				countryData[jurisdiction].corruptionPerceptionIndex.Jurisdiction = null;
			}
		}
		//console.table(countryData);
		console.log("loadCorruptionPerceptionIndex complete");
		return callback();
	});
}

function loadGDP(callback){
	d3.csv("./dataSets/country regional and world GDP.csv", function(data){
		var startYear= 1980;	//data goes back to the 60's and I don't need that much
		
		//names to exclude when parsing corruption index
		var exclusionNames = [
			"Channel Islands",	//alredy in as Cote d'Ivore
			"Faeroe Islands",		//not on country list

		];
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country Name"];
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					
					//if no GDP object exists for this country name, create one
					if(!countryData[countryName]["GDP"]){
						countryData[countryName]["GDP"] = {};
					}
					countryData[countryName]["GDP"][data[i].Year] = {raw: data[i].Value};
			}
		}
		console.log("loadGDP complete");
		return callback();
	});
}

function loadPopulation(callback){
	d3.csv("./dataSets/population figures for countries and regions.csv", function(data){
		var startYear= 1980;	//data goes back to the 60's and I don't need that much
		
		//names to exclude when parsing corruption index
		var exclusionNames = [
			"Channel Islands",	//alredy in as Cote d'Ivore
			"Faeroe Islands",		//not on country list
		];
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country Name"];
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					
					//if no GDP object exists for this country name, create one
					if(!countryData[countryName]["Population"]){
						countryData[countryName]["Population"] = {};
					}
					countryData[countryName]["Population"][data[i].Year] = data[i].Value;
			}
		}
		console.log("loadPopulation complete");
		return callback();
	});
}

function normalizeGDP(callback){

	var dataBuffer = [];
	//loop through country in countryData and get the data for this year
	for (var key in countryData) {
		if (countryData.hasOwnProperty(key)) {
			//console.log(key);
			var obj = countryData[key];
			//ensure GDP exists for this object and then loop through each GDP year
			if(obj.GDP){
				for (var year in obj.GDP) {
					if (obj.GDP.hasOwnProperty(year)) {
						var population = obj.Population[year];
						var perCapita = Number(obj.GDP[year].raw)/Number(population);
						//console.log(obj.code + " " + year + " GDP = " + obj.GDP[year].raw + " | Pop = " + obj.Population[year] + " | Per Capita= " + perCapita);
						obj.GDP[year].perCapita = perCapita;
					}
				}
			}	
		}
	}

	console.table(dataBuffer);
	return callback();
}

function normalizeCorruptionPerceptionIndex(){
	//TODO
}

//this function normalizes names across multiple datasets
function normalizeCountryName(countryName){
	switch(countryName){
		case "The Bahamas":
		case "Bahamas, The":
			return  "Bahamas";
		case "Bolivia (Plurinational State of)":
			return "Bolivia";
		case "Brunei Darussalam":
			return "Brunei";
		case "Cabo Verde":
			return "Cape Verde";
		case "Central African Rep.":
			return "Central African Republic";
		case "Czech Rep.":
			return "Czech Republic";
		case "Congo, Rep.":
		case "Congo Brazzaville":
		case "Republic of the Congo":
			return "Republic of Congo";
		case "Congo":
		case "Congo, Dem. Rep.":
		case "Dem. Rep. of the Congo":
			return "Democratic Republic of the Congo";
		case "Northern Cyprus":
			return "Cyprus";
		case "Dominican Rep.":
			return "Dominican Republic";
		case "Côte d'Ivoire":
		case "Ivory Coast":
			return "Cote d'Ivoire";
		case "Egypt, Arab Rep.":
			return "Egypt";
		case "Falkland Islands":
			return "Falkland Islands (Malvinas)";
		case "The Gambia":
		case "Gambia, The":
			return "Gambia";
		case "Guinea Bissau":
			return "Guinea-Bissau";
		case "Hong Kong SAR, China":
			return "Hong Kong";
		case "Iran, Islamic Rep.":
		case "Islamic Rep. of Iran":
			return "Iran";
		case "Holy See (the)":
			return "Holy See (Vatican City State)";
		case "Dem. People's Rep. of Korea":
		case "Korea, Dem. Rep.":
		case "Korea (North)":
			return  "North Korea";
		case "Korea (South)":
		case "Korea, Rep.":
		case "Rep. of Korea":
			return  "South Korea";
		case "Kyrgyz Republic":
			return  "Kyrgyzstan";
		case "Lao PDR":
		case "Lao People's Dem. Rep.":
			return "Laos";
		case "Macao SAR, China":
			return "Macau";
		case "The former Yugoslav Rep. of Macedonia":
		case "Macedonia, FYR":
			return "Macedonia";
		case "Micronesia (Federated States of)":
		case "Micronesia, Fed. Sts.":
			return "Micronesia";
		case "Rep. of Moldova":
			return "Moldova";
		case "Somaliland":
			return "Somalia";
		case "State of Palestine":
			return "Palestine";
		case "Russian Federation":
			return  "Russia";	
		case "Republic of Serbia":
		case "Serbia (and Kosovo: S/RES/1244 (1999))":
			return "Serbia";
		case "Slovak Republic":
			return  "Slovakia";	
		case "St. Kitts and Nevis":
			return "Saint Kitts and Nevis";
		case "St. Lucia":
			return "Saint Lucia";
		case "St. Martin (French part)":
			return "Saint Martin (French part)";
		case "St. Vincent and the Grenadines":
			return "Saint Vincent and the Grenadines";
		case "Syrian Arab Rep.":
		case "Syrian Arab Republic":
			return  "Syria";
		case "East Timor":
			return "Timor-Leste";
		case "Taijikistan":
			return  "Tajikistan"
		case "United Rep. of Tanzania":
		case "United Republic of Tanzania":
			return "Tanzania";
		case "USA":
		case "United States of America":
			return  "United States";
		case "Venezuela (Bolivarian Republic of)":
		case "Venezuela, RB":
			return  "Venezuela";
		case "Viet Nam":
			return "Vietnam";
		case "Virgin Islands (U.S.)":
			return  "U.S. Virgin Islands";
		case "West Bank and Gaza":
		case "West Bank":
			return "Palestine";
		case "Yemen, Rep.":
			return  "Yemen";
		default:
			return countryName;
	}
}





