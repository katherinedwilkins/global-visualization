var MobileServiceClient = WindowsAzure.MobileServiceClient; 
var client = new WindowsAzure.MobileServiceClient(
    "https://globalvisualizationmobileservice.azure-mobile.net/",
    "nEqHeNeqxcozORPJNVnEGUUWMRrHgW13"
);

var countryData = {};

//fill in country name and code informaiton on the countryData object
//each country will be a seperate object within the countryData object
function addCountries(data){
	//console.log(data);
	var callBacksInProgress=0;
	
	for(var i=0; i<data.length; i++){
		countryData[data[i].Name] = {code: data[i].Code};
	}

	
	// loadGDP(callBacksInProgress);
	async.parallel([
		loadCorruptionPerceptionIndex,
		loadGDP
	], printCountryData);	
}

function printCountryData(){
	console.table(countryData);
}
function loadCorruptionPerceptionIndex(){
	d3.csv("./dataSets/corruption perception index.csv", function(data){
		//parse the dataset
		
		//names to exclude when parsing corruption index
		var exclusionNames = [
			"Ivory Coast",	//alredy in as Cote d'Ivore
			"Kosovo",		//not on country list
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
				
				countryData[jurisdiction].corruptionPerceptionIndex = corruptionPerceptionIndex;
				//remove the Jurisdiction data object from the corruptionPerceptionIndex information
				countryData[jurisdiction].corruptionPerceptionIndex.Jurisdiction = null;
			}
		}
		//console.table(countryData);
		console.log("loadCorruptionPerceptionIndex complete");
	});
}

function loadGDP(){
	d3.csv("./dataSets/country regional and world GDP.csv", function(data){
		var startYear= 1980;	//data goes back to the 60's and I don't need that much
		
		//names to exclude when parsing corruption index
		var exclusionNames = [
			"Channel Islands",	//alredy in as Cote d'Ivore
			"Kosovo",		//not on country list
			"Kuweit",		//misspelling
			"FYR Macedonia",	//already on list as Macedonia
			"Palestinian Authority", //already listed as Palestine
			"Serbia and Montenegro", //just track Montenegro and Serbia as seperate countries
			"Yugoslavia",	//not a country any more
		];
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country Name"];
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					console.log(countryName);
			}
		}
		console.log("loadGDP complete");
	});
}

//this function normalizes names across multiple datasets
function normalizeCountryName(countryName){
	switch(countryName){
		case "Bahamas, The":
			return  "Bahamas";
		case "Congo Brazzaville":
		case "Congo, Dem. Rep.":
		case "Congo, Rep.":
			return "Congo";
		case "Egypt, Arab Rep.":
			return "Egypt";
		case "Hong Kong SAR, China":
			return "Hong Kong";
		case "The Gambia":
			return "Gambia";
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
		case "Micronesia, Fed. Sts.":
			return "Micronesia";
		case "Russian Federation":
			return  "Russia";	
		case "Syrian Arab Republic":
			return  "Syria";
		case "Slovak Republic":
			return  "Slovakia";	
		case "Taijikistan":
			return  "Tajikistan"	
		case "USA":
			return  "United States";
		case "Venuzuela, RB":
			return  "Venezuela";
		case "Virgin Islands (U.S.)":
			return  "U.S. Virgin Islands";
		case "Yemen, Rep.":
			return  "Yemen";
		default:
			return countryName;
	}
}
function uploadFile(){
	d3.csv("./dataSets/countries and two digit codes.csv", addCountries);
}

document.getElementById('uploadFile').addEventListener('click', uploadFile, false);

