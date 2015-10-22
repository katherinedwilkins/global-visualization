var MobileServiceClient = WindowsAzure.MobileServiceClient; 
var client = new WindowsAzure.MobileServiceClient(
    "https://globalvisualizationmobileservice.azure-mobile.net/",
    "nEqHeNeqxcozORPJNVnEGUUWMRrHgW13"
);

var countryData = {};

//fill in country name and code informaiton on the countryData object
//each country will be a seperate object within the countryData object
function loadCountryData(data){
	d3.csv("./dataSets/countries and two digit codes.csv", function(data){
		for(var i=0; i<data.length; i++){
			countryData[data[i].Name] = {code: data[i].Code};
		}

		// loadGDP(callBacksInProgress);
		async.parallel([
			loadCorruptionPerceptionIndex,
			loadGDP,
			loadPopulation
		], normalizeData);	
	});
}

function normalizeData(){
	async.parallel([
			normalizeGDP
		], printCountryData);
}

function printCountryData(){
	console.table(countryData);
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
	//start with most recent year data.  We'll decrement from here
	var year = 2014;
	var numberYearsToGoBack = 1;
	var dataBuffer = [];
	
	//loop backwards through the years
	for(var i=0; i<numberYearsToGoBack; i++, year--){
	
		//loop through country in countryData and get the data for this year
		for (var key in countryData) {
			if (countryData.hasOwnProperty(key)) {
				console.log(key);
				var obj = countryData[key];
				if((obj.GDP)&&(obj.GDP[year])&&(obj.GDP[year].raw)){	//data exists for this year
					//push that data onto the data buffer array
					dataBuffer.push({[key]: obj.GDP[year].raw})
				}
			}
		}
	}
	console.table(dataBuffer);
	return callback();
}

function normalizeCorruptionPerceptionIndex(){

}

//this function normalizes names across multiple datasets
function normalizeCountryName(countryName){
	switch(countryName){
		case "Bahamas, The":
			return  "Bahamas";
		case "Brunei Darussalam":
			return "Brunei";
		case "Cabo Verde":
			return "Cape Verde";
		case "Congo Brazzaville":
		case "Congo, Dem. Rep.":
		case "Congo, Rep.":
			return "Congo";
		case "Egypt, Arab Rep.":
			return "Egypt";
		case "Hong Kong SAR, China":
			return "Hong Kong";
		case "Iran, Islamic Rep.":
			return "Iran";
		case "The Gambia":
		case "Gambia, The":
			return "Gambia";
		case "Korea, Dem. Rep.":
		case "Korea (North)":
			return  "North Korea";
		case "Korea (South)":
		case "Korea, Rep.":
			return  "South Korea";
		case "Kyrgyz Republic":
			return  "Kyrgyzstan";
		case "Lao PDR":
			return "Laos";
		case "Macao SAR, China":
			return "Macau";
		case "Macedonia, FYR":
			return "Macedonia";
		case "Micronesia, Fed. Sts.":
			return "Micronesia";
		case "Russian Federation":
			return  "Russia";	
		case "Syrian Arab Republic":
			return  "Syria";
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
		case "Taijikistan":
			return  "Tajikistan"	
		case "USA":
			return  "United States";
		case "Venezuela, RB":
			return  "Venezuela";
		case "Virgin Islands (U.S.)":
			return  "U.S. Virgin Islands";
		case "West Bank and Gaza":
			return "Palestine";
		case "Yemen, Rep.":
			return  "Yemen";
		default:
			return countryName;
	}
}

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );
	loadCountryData();
});

document.getElementById('uploadFile').addEventListener('click', uploadFile, false);
document.getElementById('normalizeCPI').addEventListener('click', normalizeCorruptionPerceptionIndex, false);
document.getElementById('normalizeGDP').addEventListener('click', normalizeGDP, false);

