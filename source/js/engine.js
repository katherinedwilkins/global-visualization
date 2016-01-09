

//the object that will end up holding all of the data for all of the countries
var countryData = {};
var threeAlphaLookup = {};
var startYear= 1960;
var currentYear = new Date().getFullYear();


//list of non-normal reagional names kept in various databases
var exclusionNames =[
			"Stateless", "Very high human development", "Arab States", "East Asia and the Pacific",
			"Europe and Central Asia", "High human development",
			"Latin America and the Caribbean", "Sub-Saharan Africa",
			"Various", "Least developed countries", "Small island developing states",
			"World", "Arab World", "American Samoa",
			"Tibetans",		//Tibet is not listed as a country
			"Serbia Montenegro",
			"Serbia and Montenegro",	//needs to be broken up into the two current countries
			"Yugoslavia",	"Germany, East", "Germany, West", "USSR", "South Vietnam", //no longer exists
			"Channel Islands",	"Curacao", "Guam", "Not Classified", "Not classified",
			"Faeroe Islands", "North Yemen", "SouthYemen",	//not on country list
			"Caribbean small states",
			"East Asia & Pacific (all income levels)",
			"Euro area", "Sint Maarten (Dutch part)", 
			"Europe & Central Asia (all income levels)",
			"Europe & Central Asia (developing only)","Netherlands Antilles",
			"Saint Martin (French part)", "Middle East & North Africa (all income levels)",
			"Caribbean small states", 
			"East Asia & Pacific (all income levels)",
			"Euro area","Europe & Central Asia (all income levels)",
			"Europe & Central Asia (developing only)",
			"World","European Union","High income", "High income: OECD", "High income: nonOECD",
			"Latin America & Caribbean (all income levels)","Latin America & Caribbean (developing only)",
			"Least developed countries: UN classification", "Low income", "Lower middle income",
			"Middle East & North Africa (developing only)", "North America", "OECD members", 
			"Small states", "South Asia", "Sub-Saharan Africa (all income levels)",
			"Sub-Saharan Africa (developing only)",
			"Central Europe and the Baltics",
			"Caribbean small states", "Other small states",
			"East Asia & Pacific (developing only)",
			"East Asia & Pacific (all income levels)",
			"Euro area", "Middle Income", "Middle income",
			"Europe & Central Asia (all income levels)",
			"Europe & Central Asia (developing only)","Netherlands Antilles",
			"European Union", "Fragile and conflict affected situations",
			"High Income", "Heavily indebted poor countries (HIPC)", "Korea", "Low & middle income",
			"Pacific island small states", "Upper middle income", "High human development",
			"Medium human development", "Low human development", "Canary Is", "Azores"
];


//return the correct path to the data in the country object based on the 
// value of the radio button selected.  The value of the radio button selected
// is held in the dataType variable
// this fuction only returs the base path, not the full path
function getDataPath(dataType){
	var path ="";
	var fullPath = "";
	switch(dataType){
		case "gdpCountry":
			path ="GDP"
			fullPath= "GDP.INSERT_YEAR.raw"
		break;
		case "gdpCapita":
			path = "GDP";
			fullPath = "GDP.INSERT_YEAR.perCapita";
		break;
		case "corruption":
			path ="corruptionPerceptionIndex";
			fullPath = "corruptionPerceptionIndex.INSERT_YEAR";
		break;
		case "refugeesIn":
			path = "refugeeData";
			 fullPath = "refugeeData.INSERT_YEAR.refugeesIn";
		break;
		case "refugeesOut":
			path = "refugeeData";
			 fullPath = "refugeeData.INSERT_YEAR.refugeesOut";
		break;
		case "refugeesPercentPopulation":
			path = "refugeeData";
			 fullPath = "refugeeData.INSERT_YEAR.refugeesOut";
		break;
		case "homicidesCount":
			path = "homicides";
			fullPath =  "homicides.INSERT_YEAR.count";
		break;
		case "homicidesRate":
			path = "homicides";
			fullPath = "homicides.INSERT_YEAR.rate";
		break;
		case "cashSurplus":
			path = "cashSurplus";
			fullPath = "cashSurplus.INSERT_YEAR";
		break;
		case "percentInternet":
			path = "percentInternet";
			fullPath = "percentInternet.INSERT_YEAR";
		break;
		case "conflict":
			path = "conflict";
			fullPath = "conflct.INSERT_YEAR";
		break;
	}
	return {
		path: path,
		fullPath: fullPath
	}
}

// function getCountryData(country, dataType, year, dataSuffix){
// 	var returnValue;

// 	try{
// 			switch(dataType){
// 			case "gdpCountry":				
// 					returnValue = countryData[country].GDP[year].raw[dataSuffix] ? countryData[country].GDP[year].raw[dataSuffix] : null;				
// 			break;
// 			case "gdpCapita":
// 					returnValue =  countryData[country].GDP[year].perCapita[dataSuffix] ? countryData[country].GDP[year].perCapita[dataSuffix] : null;			
// 			break;
// 			case "corruption":
// 					returnValue =  countryData[country].corruptionPerceptionIndex[year][dataSuffix] ? countryData[country].corruptionPerceptionIndex[year][dataSuffix] : null;
// 			break;
// 			case "refugeesIn":
// 					returnValue =  countryData[country].refugeeData[year].refugeesIn[dataSuffix] ? countryData[country].refugeeData[year].refugeesIn[dataSuffix] : null;
// 			break;
// 			case "refugeesOut":
// 					returnValue =  countryData[country].refugeeData[year].refugeesOut[dataSuffix] ? countryData[country].refugeeData[year].refugeesOut[dataSuffix] : null;
// 			break;
// 			case "refugeesPercentPopulation":
// 				returnValue =  countryData[country].refugeeData[year].refugeesOut[dataSuffix] ? countryData[country].refugeeData[year].refugeesOut[dataSuffix] : null;
// 			break;
// 			case "homicidesRate":
// 					returnValue =  countryData[country].homicides[year].rate[dataSuffix] ? countryData[country].homicides[year].rate[dataSuffix] : null;
// 			break;
// 			case "homicidesCount":
// 					returnValue =  countryData[country].homicides[year].count[dataSuffix] ? countryData[country].homicides[year].count[dataSuffix] : null;
// 			break;
// 			case "cashSurplus":
// 					returnValue =  countryData[country].cashSurplus[year][dataSuffix] ? countryData[country].cashSurplus[year][dataSuffix] : null;
// 			break;
// 			case "percentInternet":
// 					returnValue =  countryData[country].percentInternet[year][dataSuffix] ? countryData[country].percentInternet[year][dataSuffix] : null;
// 			break;
// 			case "conflict":
// 				try{
// 						returnValue =  countryData[country].conflict[year][dataSuffix] ? countryData[country].conflict[year][dataSuffix] : "no conflict";
// 				}
// 				catch(e){
// 					return "no conflict";
// 				}
// 			break;
// 			case "worldBankHomicides":
// 				returnValue = countryData[country].homicidesWorldBank[year] ? countryData[country].homicidesWorldBank[year].value : null;
// 			break;
// 			case "HDI":
// 				returnValue =  countryData[country].HDI[year][dataSuffix] ? countryData[country].HDI[year][dataSuffix] : null;
// 			break;
// 			case "distance":	//year in this case is the other country
// 				var otherCountry=year;
// 				returnValue =  countryData[country].distances[otherCountry][dataSuffix] ? countryData[country].distances[otherCountry][dataSuffix] : null;
// 			break;
// 			case "GPI":
// 				returnValue = countryData[country].GPI[year][dataSuffix] ? countryData[country].GPI[year][dataSuffix] : null;
// 			break;
// 			case "disaster":
// 				returnValue = countryData[country].disasters[year][dataSuffix] ? countryData[country].disasters[year][dataSuffix] : null;
// 			break;
// 			case "population":
// 				returnValue = countryData[country].Population[year] ? countryData[country].Population[year]: null;
// 			break;
// 			case "PTS-HRW":
// 				returnValue = countryData[country].PTS[year].humanRightsWatch ? countryData[country].PTS[year].humanRightsWatch: null;
// 			break;
// 			case "PTS-DoS":
// 				returnValue = countryData[country].PTS[year].usStateDepartment ? countryData[country].PTS[year].usStateDepartment: null;
// 			break;
// 			case "PTS-AI":
// 				returnValue = countryData[country].PTS[year].amnestyInternational ? countryData[country].PTS[year].amnestyInternational: null;
// 			break;
// 			case "SVS":
// 				returnValue = countryData[country].SVS[year].value ?countryData[country].SVS[year].value: null;
// 			break;
// 		}
// 		return returnValue;
// 	}
// 	catch(err){
// 		return null;
// 	}
	
// }



//fill in country name and code informaiton on the countryData object
//each country will be a seperate object within the countryData object
function loadCountryData(callback){
	d3.csv("./dataSets/countries and two digit codes-2.csv", function(data){
		for(var i=0; i<data.length; i++){
			countryData[data[i].Name] = {
				region: data[i].Region,
				code: data[i].Code,
				threeCode: data[i]["Alpha-3 code"],
				distThreCode: data[i]["Three-Alpha for Distance Table"],
				PTS: {},
				SVS: {}};
			
			//create a placeholder for refugee data
			countryData[data[i].Name].refugeeData = {};
			countryData[data[i].Name].GPI = {};
			countryData[data[i].Name].GDP = {};
			countryData[data[i].Name].disasters = {};
			threeAlphaLookup[data[i]["Alpha-3 code"]] = data[i].Name;
		}
		countryData.numCountries = data.length;

		// loadGDP(callBacksInProgress);
		//load all the data
		async.parallel([
			loadRefugeeNumbers,
			loadCorruptionPerceptionIndex,
			loadGDP,
			loadGPI,
			loadDisasters,
			loadPopulation,
			loadHomicides,
			loadCashSurplus,
			loadPercentInternet,
			loadConflict,
			loadWorldBankHomicides, 
			loadHDI,
			loadPoliticalTerrorScale,
			loadSocialViolenceScale,
			loadGDPPerCapta,
			loadDistanceData	//distances between capitals
		], callback);	
			
	});

}

//perform any mathmatical operations to the country data
function normalizeData(){
	async.series([
			//normalizeGDP,
			loadGDPPerCapta,
			calculateTrends,
			performRefugeeCalculations
		]);
}




function loadRefugeeNumbers(callback){
	d3.csv("./dataSets/Refugee_Numbers_UNdata_Export_20151029_232124036.csv", function(data){
				//names to exclude when parsing corruption index

		var fugeeCounter = 0;
		for(var recordCounter=0; recordCounter<data.length; recordCounter++){
			//get the name of the origin country this record
			var originCountry = normalizeCountryName(data[recordCounter]["Country or territory of origin"]);
			//get the name of the country of destination
			var destCountry = normalizeCountryName(data[recordCounter]["Country or territory of asylum or residence"]);
			//get the year
			var year = Number(data[recordCounter].Year);
			//get number of refugees
			var numRefugees = Number(data[recordCounter]["Total refugees and people in refugee-like situations<sup>**</sup>"]);
			fugeeCounter += numRefugees;
			
			//check to see if data already exists for this year for each Country
			//in not, then create the object for that year
			//console.log("originCountry = " + originCountry + " |  destCountry = " + destCountry + " | # refugees = " + numRefugees);
			if((_.indexOf(exclusionNames, originCountry)===-1)&&(originCountry)){
				if(!countryData[originCountry].refugeeData[year]){
					countryData[originCountry].refugeeData[year]={
						refugeesIn :{
							value: 0,
							trend: {
									trendType: null, 
									counter: null
								},
							origins:{}
						} ,
						refugeesOut :{
							value: 0,
							trend: {
									trendType: null, 
									counter: null
								},
							destinations:{}
						} 
					};
				}
				countryData[originCountry].refugeeData[year].refugeesOut.destinations[destCountry] = numRefugees;
				countryData[originCountry].refugeeData[year].refugeesOut.value += numRefugees;
			}
			if((_.indexOf(exclusionNames, destCountry)===-1)&&(destCountry)){
				if(!countryData[destCountry].refugeeData[year]){
					countryData[destCountry].refugeeData[year]={
						refugeesIn :{
							value: 0,
							trend: {
									trendType: null, 
									counter: null
								},
							origins:{}
						} ,
						refugeesOut :{
							value: 0,
							trend: {
									trendType: null, 
									counter: null
								},
							destinations:{}
						} 
					}
		
				}
				countryData[destCountry].refugeeData[year].refugeesIn.origins[originCountry] = numRefugees;
				countryData[destCountry].refugeeData[year].refugeesIn.value += numRefugees;
			}
		}
		console.log("loadRefugeeNumbers complete. Total refugees = " + fugeeCounter);
		return callback();
	});
}

function loadCorruptionPerceptionIndex(callback){
	d3.csv("./dataSets/corruption perception index.csv", function(data){
		//parse the dataset
		
		//loop through the countries
		for(var countryCounter=0; countryCounter<data.length; countryCounter++){
			var countryName = normalizeCountryName(data[countryCounter].Jurisdiction);
			//console.log(jurisdiction);
			//exclude certain names
			if(_.indexOf(exclusionNames, countryName)===-1){
				
				var corruptionPerceptionIndex = data[countryCounter];
				
				//if no corruption object exists for this country name, create one
					if(!countryData[countryName].corruptionPerceptionIndex){
						countryData[countryName].corruptionPerceptionIndex = {};
					}
				
				for (var year in corruptionPerceptionIndex) {
					if(corruptionPerceptionIndex[year] !== "NA"){
						var value = Number(corruptionPerceptionIndex[year]);
						if(year>=2012){	//CPI format was change from 0-10 scale to 0-100 scale starting in 2012
							value = value /10;
						}
						countryData[countryName].corruptionPerceptionIndex[year] = 
							{
								value: Number(value), 
								trend: {
									trendType: null, 
									counter: null
								}
							};
					}
				}

				//remove the Jurisdiction data object from the corruptionPerceptionIndex information
				delete countryData[countryName].corruptionPerceptionIndex.Jurisdiction;
			}
		}
		//console.table(countryData);
		console.log("loadCorruptionPerceptionIndex complete");
		return callback();
	});
}

function loadPoliticalTerrorScale(callback){
	d3.csv("./dataSets/" + datasetInfo["PTS-HRW"].fileName, function(data){
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country"];
			//console.log(countryName);
			if((_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					countryName = normalizeCountryName(countryName)
					var year = Number(data[i].Year);
					var amnestyInternational = Number(data[i]["Amnesty"]);
					var usStateDepartment = Number(data[i]["State Dept"]);
					var humanRightsWatch = Number(data[i]["HRW"]);
					
					var numValidValues = _.compact([amnestyInternational, usStateDepartment, humanRightsWatch]).length;
					if (numValidValues !== 0){
						var average = Number((amnestyInternational + usStateDepartment + humanRightsWatch)/numValidValues)
						countryData[countryName]["PTS"][year] = {
								amnestyInternational : amnestyInternational,
								usStateDepartment : usStateDepartment,
								humanRightsWatch : humanRightsWatch,
								value: average
						}
					}
					
					//console.log(amnestyInternational + ", " + usStateDepartment + ", " + humanRightsWatch + " : avg = " + average);
				}
		}
		console.log("loadPoliticalTerrorScale complete");
		return callback();
	});
}

function loadSocialViolenceScale(callback){
	d3.csv("./dataSets/" + datasetInfo.SVS.fileName, function(data){
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country"];
			//console.log(countryName);
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					countryName = normalizeCountryName(countryName)
					countryData[countryName]["SVS"][data[i].Year] = {
						value: data[i]["SVS"]
					}
				}
		}
		console.log("loadSocialViolencScale complete");
		return callback();
	});
}


function loadGDP(callback){
	d3.csv("./dataSets/country regional and world GDP.csv", function(data){
		
		
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
					countryData[countryName]["GDP"][data[i].Year] = {
						raw: {
							value: Number(data[i].Value), 
							trend: { 
								trendType: null, 
								counter: null
							}
						},
						perCapita: {
							value: null,
							trend:{ 
								trendType: null, 
								counter: null
							}
						}
					};
			}
		}
		console.log("loadGDP complete");
		return callback();
	});
}


function loadGDPPerCapta(callback){
		d3.csv("./dataSets/ny.gdp.pcap.cd_Indicator_en_csv_v2.csv", function(data){	
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country Name"];
			for (var j=startYear; j < currentYear; j++){
				if(_.indexOf(exclusionNames, countryName)===-1){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					if(countryData[countryName].GDP[j]){
						countryData[countryName].GDP[j].perCapita.value = Number(data[i][j]);
					}
				}
			}
		}
		console.log("loadGDPPerCapta complete");
		return callback();
	});
}

function loadGPI(callback){
		d3.csv("./dataSets/global_peace_index.csv", function(data){
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country"];
			for (var year=startYear; year < currentYear; year++){
				if(_.indexOf(exclusionNames, countryName)===-1){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					if(!countryData[countryName].GPI[year]){
						countryData[countryName].GPI[year] = {};
					}
					countryData[countryName].GPI[year].value = Number(data[i][year]);
				}
			}
		}
		console.log("loadGPI complete");
		return callback();
	});
}

function loadHomicides(callback){
	d3.csv("./dataSets/un homicide statistics.csv", function(data){
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country or Area"];
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					
					//if no GDP object exists for this country name, create one
					if(!countryData[countryName]["homicides"]){
						countryData[countryName]["homicides"] = {};
					}
					countryData[countryName]["homicides"][data[i].Year] = {
						count: {
							value: Number(data[i].Count),
							trend: {
									trendType: null, 
									counter: null
								}
						},		
						rate: {
							value: Number(data[i].Rate),
							trend: {
									trendType: null, 
									counter: null
								}
						},
					};
					
			}
		}
		console.log("loadHomicides complete");
		return callback();
	});
}


function loadCashSurplus(callback){
	d3.csv("./dataSets/un cash surplus-deficit as percent of GDP.csv", function(data){
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country or Area"];
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					
					//if no GDP object exists for this country name, create one
					if(!countryData[countryName]["cashSurplus"]){
						countryData[countryName]["cashSurplus"]={};
					}
					countryData[countryName]["cashSurplus"][data[i].Year] = {
						value : Number(data[i].Value),
						trend : {trendType: null, counter: null}};
			}
		}
		console.log("loadCashSurplus complete");
		return callback();
	});
}


function loadPercentInternet(callback){
	d3.csv("./dataSets/un percentage of indviduals using the Internet.csv", function(data){

		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country or Area"];
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					
					//if no GDP object exists for this country name, create one
					if(!countryData[countryName]["percentInternet"]){
						countryData[countryName]["percentInternet"]={};
					}
					countryData[countryName]["percentInternet"][data[i].Year]= {
						value : Number(data[i].Value),
						trend : {trendType: null, counter: null}};

			}
		}
		console.log("loadPercentInternet complete");
		return callback();
	});
}

function loadPopulation(callback){
	d3.csv("./dataSets/population figures for countries and regions.csv", function(data){

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
					countryData[countryName]["Population"][data[i].Year] = Number(data[i].Value);
			}
		}
		console.log("loadPopulation complete");
		return callback();
	});
}

function loadHDI(callback){
	d3.csv("./dataSets/un human development index - y8j2-3vi9.csv", function(data){

		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country"]; 
			for (var year = startYear; year < currentYear; year ++ ){
				if(data[i][year]){
					if(_.indexOf(exclusionNames, countryName)===-1){	//don't execute for any data earlier than the starYear
					
						//normalize the country name
						countryName = normalizeCountryName(countryName)
						//console.log(countryName);
						
						//if no object exists for this country name, create one
						if(!countryData[countryName]["HDI"]){
							countryData[countryName]["HDI"] = {};
						}
						countryData[countryName]["HDI"][year] ={
							value : Number(data[i][year])
						};
					}
				}
				
			}
		}
		console.log("loadHDI complete");
		return callback();
	});
}

function loadConflict(callback){
	d3.csv("./dataSets/prio 124920_1ucdpprio-armed-conflict-dataset_v.4-2015.csv", function(data){
		
		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Location"];
			if((data[i].Year>=startYear)&&
				(_.indexOf(exclusionNames, countryName)===-1)){	//don't execute for any data earlier than the starYear
					//normalize the country name
					countryName = normalizeCountryName(countryName)
					//console.log(countryName);
					
					// //if no Conflcit object exists for this country name, create one
					if(!countryData[countryName].conflict){
					 	countryData[countryName].conflict = {};
					}
					countryData[countryName].conflict[data[i].Year] = {
						value : "conflict",	//1 just flags that a conflict existed
						enemy: data[i].SideB,
						startDate :data[i].StartDate,
						trend : {trendType: null, counter: null}};
			}
		}
		console.log("loadConflict complete");
		return callback();
	});
}

function loadWorldBankHomicides(callback){
		d3.csv("./dataSets/world bank homicides.csv", function(data){
		
		for(var i=0; i<data.length; i++){
			var countryName = normalizeCountryName(data[i]["Country Name"]);
			//console.log(countryName);
			if(_.indexOf(exclusionNames, countryName)===-1){	
				for(var year = startYear; year < 2015; year ++){
					if(data[i][year]){	//check to see if year exists
						// //if no Conflcit object exists for this country name, create one
						if(!countryData[countryName].homicidesWorldBank){
							countryData[countryName].homicidesWorldBank = {};
						}
						countryData[countryName].homicidesWorldBank[year] = {
							value : Number(data[i][year])
						}
					}
				}
			}
		}
		console.log("loadWorldBankHomicides complete");
		return callback();
	});
}

function loadDistanceData(callback){
		d3.csv("./dataSets/capDist.csv", function(data){


		for(var i=0; i<data.length; i++){
			//console.log(data[i]["ida"]);
			var origin = normalizeThreeLetterCode(data[i]["ida"]);
			//console.log(origin);
			
			if(origin){
				var countryName = threeAlphaLookup[origin];
				//console.log(countryName);
				var destination = normalizeThreeLetterCode(data[i]["idb"]);

					if(!countryData[countryName].distances){
						countryData[countryName].distances = {};
					}
					var destCountry = threeAlphaLookup[destination];
					//console.log("orgin = " + data[i]["ida"] + " : " + countryName +
					//	" -> dest = " + data[i]["idb"]);
					countryData[countryName].distances[destCountry] = {
							kilometers: Number(data[i]["kmdist"]),
							miles: Number(data[i]["midist"])
					}
			}
			else{
				//console.log (origin + " not found");
			}
		}
		console.log("loadDistanceData complete");
		return callback();
	});
}

function loadDisasters(callback){
	d3.csv("./dataSets/emdat-Disasters.csv", function(data){
		for(var i=0; i<data.length; i++){
			var countryName = normalizeCountryName(data[i]["Country name"]);
			//console.log(countryName);
			
			if(_.indexOf(exclusionNames, countryName)===-1){		
				countryData[countryName].disasters[data[i].year] = {

						deaths : Number(data[i]["Total deaths"]),
						affected: Number(data[i]["Affected"]),
						injured: Number(data[i]["Injured"]),
						homeless: Number(data[i]["Homeless"]),
						totalAffected: Number(data[i]["Total affected"])

				}
			}
		}
		console.log("loadDisasters complete");
		return callback();
	});
}

//change the three letter country alpha codes from the "capdist" file to their ISO values
function normalizeThreeLetterCode(threeLetterCode){
	
	switch(threeLetterCode){
		case "BHM":			return "BHS";
		case "POR":			return "PRT";
		case"HAI": 			return "HTI";
		case "GMY": case "GFR": case "GDR":
			return "DEU";
		case "TRI":			return "TTO"; 
		case "BAR": 			return "BRB";
		case "GRN": 			return "GRD";
		case "ICE":			return "ISL"; 
		case "SLU":			return "LCA"; 
		 case "DEN":		 	return "DNK";
		case "SVG": 			return "VCT";
		case "SWD":			return "SWE";
		case "SKN":
			return "KNA";
		case "LIT":			return "LTU";
		case "GRG":			return "GEO";
		case "GUA":			return "GTM";
		case "RUM":			return "ROU";
		case "HON":			return "HND";
		case "LAT":			return "LVA";
		case "SAL":			return "SLV";
		case "SLV":			return "SVN";
		case "BUL":			return "BGR"; 
		case "COS":			return "CRI";
		case "MLD":			return "MDA";
		case "PAR":			return "PRY";
		case "URU":			return "URY";
		case "UK": case "UKG":	return "GBR";
		case "IRE":			return "IRL";
		case "NTH":			return "NLD";
		case "FRN":			return "FRA";
		case "SPN":			return "ESP";
		case "AAB": case "AUH":	case "MNC": case "YUG": case "BOS": case "ZAN": case "TRA":
		case "OFS": case "SEY": case "YPR": case "YAR": case "TBT": case "MSI": case "PAL":
			return null;
		case "CZR":		return "CZE";
		case "SLO":			return "SVK";
		case "SNM":			return "SMR";
		case "SER":			return "SRB";
		case "CRO":			return "HRV";
		case "CAP":			return "CPV";
		case "EQG":			return "GNQ";
		case "GAM":			return "GMB";
		case "MAA":			return "MRT";
		case "NIR":			return "NER";
		case "CDI":			return "CIV";
		case "GUI":			return "GIN";
		case "BFO": return "BFA";
		case "SIE": return "SLE";
		case "TOG": return "TGO";
		case "CAO": return "CMR";
		case "NIG": return "NGA";
		case "CEN": return "CAF";
		case "CHA": return "TCD";
		case "CON": return "COG";
		case "DRC": return "COD";
		case "TAZ": return "TZA";
		case "BUI": return "BDI";
		case "ANG": return "AGO";
		case "MZM": return "MOZ";
		case "ZAM": return "ZMB";
		case "ZIM": return "ZWE";
		case "MAW": return "MWI";
		case "SAF": return "ZAF";
		case "LES": return "LSO";
		case "BOT": return "BWA";
		case "SWZ": return "CHE";
		case "SWA": return "SWZ";
		case "MAG": return "MDG";
		case "MAS": return "MUS";
		case "MOR": return "MAR";
		case "ALG": return "DZA";
		case "LIB": return "LBY";
		case "SUD": return "SDN";
		case "LEB": return "LBN";
		case "KUW": return "KWT";
		case "BAH": return "BHR";
		case "UAE": return "ARE";
		case "OMA": return "OMN";
		case "TAJ": return "TJK";
		case "KYR": return "KGZ";
		case "KZK": return "KAZ";
		case "MON": return "MNG";
		case "MNG": return "MNE";
		case "TAW": return "TWN";
		case "ROK": return "KOR";
		case "BHU": return "BTN";
		case "BNG": return "BGD";
		case "MYA": return "MMR";
		case "SRI": return "LKA";
		case "NEP": return "NPL";
		case "MAD": return "MDV";
		case "THI": return "THA";
		case "CAM": return "KHM";
		case "DRV": case "RVN": return "VNM";
		case "MAL": return "MYS";
		case "SIN": return "SGP";
		case "PHI": return "PHL";
		case "INS": return "IDN";
		case "BRU": return "BRN";
		case "ETM": return "TLS";
		case "AUL": return "AUS";
		case "NEW": return "NZL";
		case "SOL": return "SLB";
		case "VAN": return "VUT";
		case "AUS": return "AUT";
		case "SLO": return "SVK";
		case "MAC": return "MKD";
		
	}
	
	return threeLetterCode;
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
						var perCapita = Number(obj.GDP[year].raw.value)/Number(population);
						//console.log(obj.code + " " + year + " GDP = " + obj.GDP[year].raw + " | Pop = " + obj.Population[year] + " | Per Capita= " + perCapita);
						obj.GDP[year].perCapita.value = perCapita;
					}
				}
			}	
		}
	}

	console.table(dataBuffer);
	return callback();
}

function performRefugeeCalculations(callback){
	
	//loop through country in countryData and get the data for this year
	for (var key in countryData) {
		if (countryData.hasOwnProperty(key)) {
			//console.log(key);
			var obj = countryData[key];
			//ensure GDP exists for this object and then loop through each GDP year
			if(obj.refugeeData){
				for (var year in obj.refugeeData) {
					if (obj.refugeeData.hasOwnProperty(year)) {
						
						if((obj.Population)&&(obj.Population[year])){
							var population = obj.Population[year];
							
							if(obj.refugeeData[year].refugeesOut.value){
								var refOutNumber = Number(obj.refugeeData[year].refugeesOut.value);
								var refOutPercentage = refOutNumber/Number(population);
								obj.refugeeData[year].refugeesOut.percentage = refOutPercentage;
							}
							
							if(obj.refugeeData[year].refugeesIn.value){
								var refInNumber = Number(obj.refugeeData[year].refugeesIn.value);
								var refInPercentage = refInNumber/Number(population);
								obj.refugeeData[year].refugeesIn.percentage = refInPercentage;
							}
						}
					}
				}
			}		
		}
	}	
	return callback();
}


function calculateTrends(callback){
	var dataTypes = ["gdpCountry","gdpCapita","corruption", "refugeesIn", "refugeesOut",
		"homicidesCount","homicidesRate","homicides","cashSurplus","percentInternet"];
	
	//loop through each country
	for (var country in countryData) {
		if (countryData.hasOwnProperty(country)) {
			//loop through each dataset
			for (var i=0; i < dataTypes.length; i++){
				//get the correct dataset based on the data type
				var dataPath = getDataPath(dataTypes[i]);
				var datasetFullPath = dataPath.fullPath;
				var datasetShortPath = countryData[country][dataPath.path];

				var iCounter = 0;
				var iTrendCounter = 0;
				var prevVal, prevTrend, prevYear;
				
				//console.log("trending: " + dataTypes[i] + " | " + country);
					
				//loop thorugh each year
				for (var year in datasetShortPath) {
					//console.log("year: " + year);
					var dataset = getObjectFromString(
							datasetFullPath.replace("INSERT_YEAR", year), countryData[country]
						);

					//set the trend to 0 if there is a break in data
					if(Number(year) !== (Number(prevYear)+1)){
						iTrendCounter = 0;
						prevVal = null;
						prevTrend = null;
					}
					if(prevVal){
						if(getCountryData(country, dataTypes[i], year, "value") >= prevVal){
							if(!dataset.trend){
								console.log("error");
							}
							dataset.trend.trendType = "up";	
						}
						else if(getCountryData(country, dataTypes[i], year, "value") < prevVal){
							dataset.trend.trendType = "down";	
						}
						if(prevTrend === dataset.trend.trendType){
							iTrendCounter ++;
						}
						else{
							iTrendCounter = 0;
						}
						dataset.trend.counter = iTrendCounter;
						prevTrend = dataset.trend.trendType;
					}
					prevYear = year;
					prevVal = getCountryData(country, dataTypes[i], year, "value");
					iCounter ++;	
				}
			}
		}
	}
	console.log("Trends calculated");
	return callback();
}

function normalizeCorruptionPerceptionIndex(){
	//TODO
}





/*
The following functions are meant to be used from the console
*/
function consoleTest(){
	console.log("test successful");
}

var refugeeTypeToPrint = "in";
//var threshold = (25177 / 11) * 12 ;	//yearly amount equal to Operation Able Manner
var threshold = 0;
var comprehensive = true;
var beginYear = 2015;
var yearsBack = 5;	
if(comprehensive){
	yearsBack = 30;
}

function printDisasterDeathsToConsole(){
	var data = [];

	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("Total Deaths: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("Total Deaths");
		header.push("year");
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, deaths = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){
				
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				deaths = getCountryData(country, "disaster", year, "deaths");
			
				if((!refugees)||(!deaths)){
				 	refugees = "#N/A";
				 	deaths = "#N/A";
				}
				if(comprehensive){
					if((refugees !== "#N/A")&&(deaths !== "#N/A")){
						data.push([country, refugees, deaths, year]);
					}
				}
				else{
					lineBuffer.push(refugees, deaths);
				}	
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&(lineBuffer.length - count >1)){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}	
	}
	printArrayAsCSV(data);
}
function printDisasterAffectedToConsole(){
	var data = [];

	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("Total Affected: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("Total Affected");
		header.push("year");
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, affected = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){
				
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				affected = getCountryData(country, "disaster", year, "affected");
			
				if((!refugees)||(!affected)){
				 	refugees = "#N/A";
				 	affected = "#N/A";
				}
				if(comprehensive){
					if((refugees !== "#N/A")&&(affected !== "#N/A")){
						data.push([country, refugees, affected, year]);
					}
				}
				else{
					lineBuffer.push(refugees, affected);
				}	
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&(lineBuffer.length - count >1)){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}	
	}
	printArrayAsCSV(data);
}

function printPerCapitaGDPDataToConsole(){
	var data = [];

	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("GDP Per Capita: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("GDP");
		header.push("year");
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, GDP = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){
				
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				GDP = getCountryData(country, "gdpCapita", year, "value");
			
				if((!refugees)||(!GDP)){
				 	refugees = "#N/A";
				 	GDP = "#N/A";
				}
				if(comprehensive){
					if((refugees !== "#N/A")&&(GDP !== "#N/A")){
						data.push([country, refugees, GDP, year]);
					}
				}
				else{
					lineBuffer.push(refugees, GDP);
				}	
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			
		}	
	}
	printArrayAsCSV(data);
	
}
function printCPIDataToConsole(){
	var data = [];
	
	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("CPI: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("CPI");
		header.push("year");
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, CPI = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				CPI = getCountryData(country, "corruption", year, "value");
				if(CPI<5){
					//CPI format was altered by Transparency International starting in 2011
					//new format appears to be the same as the old one time 10
					CPI = CPI*10;	
				}
			
				if((!refugees)||(!CPI)){
				 	refugees = "#N/A";
				 	CPI = "#N/A";
				}
				
				if(comprehensive){
					if((refugees !== "#N/A")&&(CPI !== "#N/A")){
						data.push([country, refugees, CPI, year]);
					}
				}
				else{
					lineBuffer.push(refugees, CPI);
				}	
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&(lineBuffer.length - count >1)){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}
		
	}
	printArrayAsCSV(data);
	
}

function printHomicideDataToConsole(){
	var data = [];

	var yearsBack = 5;
	
	var header = ["Country Name"];
	for(var year=beginYear; year > beginYear-yearsBack; year --){
		header.push("Refugess: " + year);
		header.push("Homocides: " + year);
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, homicidesCount = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){				
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				homicidesCount = getCountryData(country, "homicidesCount", year);
			
				if((!refugees)||(!homicidesCount)){
				 	refugees = "#N/A";
				 	homicidesCount = "#N/A";
				}
				
				lineBuffer.push(refugees, homicidesCount);
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if(lineBuffer.length - count >1){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}
		
	}
	printArrayAsCSV(data);	
}

function printGPI(){
		var data = [];

	
	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("GPI: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("GPI");
		header.push("year");
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, GPI = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){				
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				GPI = getCountryData(country, "GPI", year, "value");
			
				if((!refugees)||(!GPI)){
				 	refugees = "#N/A";
				 	GPI = "#N/A";
				}
				if(comprehensive){
					if((refugees !== "#N/A")&&(GPI !== "#N/A")){
						data.push([country, refugees, GPI, year]);
					}
				}
				else{
					lineBuffer.push(refugees, GPI);
				}
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&lineBuffer.length - count >1){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}
		
	}
	printArrayAsCSV(data);	
}

function printConflictDataToConsole(){
	var data = [];
	
	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("Conflict: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("Conflict");
		header.push("year");
	}
	
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, conflict = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				conflict = getCountryData(country, "conflict", year, "value");
				if(!conflict){
					conflict = "no conflict";
				}
				if((!refugees)){
				 	refugees = "#N/A";
				 	conflict ="#N/A";
				}
				
				if(comprehensive){
					if((refugees !== "#N/A")&&(conflict !== "#N/A")){
						data.push([country, refugees, conflict, year]);
					}
				}
				else{
					lineBuffer.push(refugees, conflict);
				}
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&lineBuffer.length - count >1){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}
		
	}
	printArrayAsCSV(data);
}

function printWorldBankHomicideToConsole(){
	var data = [];
	
	var header = ["Country Name"];

	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("Homicides: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("Homicides");
		header.push("year");
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, homicidesWorldBank = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){
				
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				homicidesWorldBank = getCountryData(country, "worldBankHomicides", year);
			
				if((!refugees)||(!homicidesWorldBank)){
				 	refugees = "#N/A";
				 	homicidesWorldBank = "#N/A";
				}
				if(comprehensive){
					if((refugees !== "#N/A")&&(homicidesWorldBank !== "#N/A")){
						data.push([country, refugees, homicidesWorldBank, year]);
					}
				}
				else{
					lineBuffer.push(refugees, homicidesWorldBank);
				}	
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&(lineBuffer.length - count >1)){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}
	}
	printArrayAsCSV(data);
}

function printHDIToConsole(){
	var data = [];
	
	var years = [1980,1990,2000,2005,2010,2011,2012,2013];

	
	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("HDI: " + year);
		}
	}
	else{
		header.push("Refugess");
		header.push("HDI");
		header.push("year");
	}
	
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, HDI = null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){

				refugees = getRefugees(refugeeTypeToPrint, country, year);
				HDI = getCountryData(country, "HDI", year, "value");
			
				if((!refugees)||(!HDI)){
				 	refugees = "#N/A";
				 	HDI = "#N/A";
				}
				
				if(comprehensive){
					if((refugees !== "#N/A")&&(HDI !== "#N/A")){
						data.push([country, refugees, HDI, year]);
					}
				}
				else{
					lineBuffer.push(refugees, HDI);
				}	
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&(lineBuffer.length - count >1)){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}
	}
	printArrayAsCSV(data);
}

function printRefugeeDistanceData(year){
	if(!comprehensive){
		if(!year){
			year = 2013;
		}
	}
	
	var data = [];
	
	var header = ["Origin Country", "Destination Country", "Number of Refugees", "Distance Traveled (km)"];
	data.push(header);
	
	//loop through the countries to get the data
	for (var country in countryData){
		if(!comprehensive){
			if(countryData.hasOwnProperty(country)){
				if(getRefugees(refugeeTypeToPrint, country, year) > threshold){
					for (var destination in countryData[country].refugeeData[year].refugeesOut.destinations){
						
						var lineBuffer = [country];
						//console.log(country + " -> " + destination);
						if((countryData[country].distances)&&(countryData[country].distances[destination])){
							var distance = countryData[country].distances[destination].kilometers;
							
							lineBuffer.push(destination, 
								countryData[country].refugeeData[year].refugeesOut.destinations[destination],
								distance);	
						}
						if(lineBuffer.length >1){
							data.push(lineBuffer);
						}
					}
					
				}
			}
		}
		else{
				 header = ["Origin Country", "Destination Country", "Number of Refugees", "Distance Traveled (km)", "year"];
			if(countryData.hasOwnProperty(country)){
				for(var year=beginYear; year > beginYear-yearsBack; year --){
					if(getRefugees(refugeeTypeToPrint, country, year) > threshold){
						for (var destination in countryData[country].refugeeData[year].refugeesOut.destinations){
							
							var lineBuffer = [country];
							//console.log(country + " -> " + destination);
							if((countryData[country].distances)&&(countryData[country].distances[destination])){
								var distance = countryData[country].distances[destination].kilometers;
								
								lineBuffer.push(destination, 
									countryData[country].refugeeData[year].refugeesOut.destinations[destination],
									distance, year);	
							}
							if(lineBuffer.length >1){
								data.push(lineBuffer);
							}
						}
						
					}
				}
			}
		}
	}
	printArrayAsCSV(data);
}

function printStats(){
		var data = [];

	
	var header = ["Country Name"];
	if(!comprehensive){
		for(var year=beginYear; year > beginYear-yearsBack; year --){
			header.push("Refugess: " + year);
			header.push("GPI: " + year);
		}
	}
	else{
		header.push("Population");
		header.push("Refugess");
		header.push("GDP Per Capita");
		header.push("GPI");
		header.push("CPI");
		header.push("year");
	}
	
	data.push(header);
	//loop through the countries to get the data
	for (var country in countryData){
		var refugees = null, GPI = null, pop = null, CPI = null, GDP =null;
		if(countryData.hasOwnProperty(country)){
			var lineBuffer =[country];
			for(var year=beginYear; year > beginYear-yearsBack; year --){				
				refugees = getRefugees(refugeeTypeToPrint, country, year);
				pop = getCountryData(country, "population", year, "value")
				GPI = getCountryData(country, "GPI", year, "value");
				CPI = getCountryData(country, "corruption", year, "value");
				GDP = getCountryData(country, "gdpCapita", year, "value");
			
				if((!refugees)||(!GPI)||(!pop)||(!GDP)||(!CPI)){
				 	refugees = "#N/A";
				 	GPI = "#N/A";
					 CPI = "#N/A";
				 	pop = "#N/A";
				 	GDP = "#N/A";
				}
				if(comprehensive){
					if((refugees !== "#N/A")&&(GPI !== "#N/A")
						&&(GDP !== "#N/A")&&(CPI !== "#N/A")
						&&(pop !== "#N/A")){
						data.push([country, pop, refugees, GDP, GPI, CPI, year]);
					}
				}
				else{
					lineBuffer.push(refugees, GPI);
				}
			}
			
			//count the number of dashes in the array
			var count = 0;
			for(var i = 0; i < lineBuffer.length; ++i){
				if(lineBuffer[i] === "#N/A"){
					count++;
				}
			}
			if((!comprehensive)&&lineBuffer.length - count >1){	//don't add any countries that don't have data that meets criteria
				data.push(lineBuffer);
			}
		}
		
	}
	printArrayAsCSV(data);	
}

function getRefugees(type, country, year){
	
	var refugees, refugeeType;
	refugeeType = (refugeeTypeToPrint === "out") ? "refugeesOut" : "refugeesIn";
	
	refugees = getCountryData(country, refugeeType, year, "value");
	
	return refugees;
}

function printArrayAsCSV(array){
	var counter = 0;
	
	//loop through lines in array
	for(var i=0; i<array.length; i++){
		var lineBuffer ="";
		//loop through items in each line
		for(var j=0; j<array[i].length; j++){
			lineBuffer = lineBuffer + array[i][j] + ","
		}
		//remove the trailing comma
		var trim = lineBuffer.replace(/(^,)|(,$)/g, "");
		console.log(trim);
		
		counter ++;
	}
	
	console.log ("*** " + (counter-1) + " records printed ***");
}

function getChloroplethData(dataset, year){
	var data =[];
	for (var country in countryData){
		var value = null, trend = null;
		if(countryData.hasOwnProperty(country)){
			value = getCountryData(countryData, country, dataset, year, "value");
			trend = getCountryData(countryData, country, dataset, year, "trend");
		}
		data.push({
			"country": country,
			"value": value,
			"trend": trend
		})
	}
	return data;
}


function getPlotData(callback, xAxisDatasetInfo, yAxisDatasetInfo){

	var xAxisShortName = xAxisDatasetInfo.shortName;
	var yAxisShortName = yAxisDatasetInfo.shortName;
	
	//some datasets don't use a linear scale so change the appropriate axis to the appropriate scale
	var xScaleType = "linear";	//default both scales to linear
	var yScaleType = "linear";
	var ordinalScaleDataSets =["conflict"];	//these sets use ordinal scales
	
	//change the scale if needed
	if(_.indexOf(ordinalScaleDataSets, xAxisShortName) !== -1){
		xScaleType = "ordinal"
	}
	if(_.indexOf(ordinalScaleDataSets, yAxisShortName, ordinalScaleDataSets) !== -1){
		yScaleType = "ordinal"
	}
	
	
	
	var axisNames = [xAxisShortName, yAxisShortName];
	
	//check to see if distances is one of the requested data sets
	// it needs to be handled differently than the other data sets
	var indexOfDistance = _.indexOf(axisNames, "distance");
	if(indexOfDistance != -1){	//distance is one of the items we're looking for
		//find out the name of the other axis
		var otherAxisName = _.without(axisNames, "distance")[0];
		
		//see if we're looking for refugees out (departing) or refugees in (entering)
		var refugeeType = "refugeesOut";
		if(_.indexOf(axisNames, "refugeesIn") !== -1){
			refugeeType = "refugeesIn"
		}
		else if(_.indexOf(axisNames, "refugeesOut") !== -1){
			refugeeType = "refugeesOut"
		}
		else{
			refugeeType = "neither";
		}
		
		///determine if distance is on the x or y axis
		var distAxis = "x";	//default to x
		if (indexOfDistance === 1){	//change it to y if needed
			distAxis = "y";
		}
		
		var distanceDataWorker = new Worker('js/getDistancePlotWorker.js');
		distanceDataWorker.addEventListener('message',function(event){

			switch(event.data.messageType){
				case "update":
					console.log(event.data.statusMessage)
				break;
				case "complete":
					var plotInfo ={
						xScaleType : xScaleType,
						yScaleType : yScaleType,
						data: event.data.distancePlotData
					}
					//return plotInfo;
					callback(null, plotInfo);
					//drawUpdatedPlot(plotInfo);
				break;
			}
		}, false);
		distanceDataWorker.addEventListener("error", function(event){
			console.log('ERROR: Line ' + event.lineno + ' in ' + event.filename + ': ' + event.message);
		}, false);
		distanceDataWorker.postMessage({
			distAxis: distAxis,
			otherAxisName: otherAxisName, 
			refugeeType: refugeeType,
			countryData: countryData,
			beginYear: beginYear,
			yearsBack: yearsBack
		});
		

	}
	else{	//distance was not requested
		var plotDataWorker = new Worker('js/getPlotDataWorker.js');
		plotDataWorker.addEventListener('message',function(event){

			switch(event.data.messageType){
				case "update":
					console.log(event.data.statusMessage)
				break;
				case "complete":
					var plotInfo ={
						xScaleType : xScaleType,
						yScaleType : yScaleType,
						data: event.data.plotData
					}
					//return plotInfo;
					callback(null, plotInfo);
					//drawUpdatedPlot(plotInfo);
				break;
			}
		}, false);
		plotDataWorker.addEventListener("error", function(event){
			console.log('ERROR: Line ' + event.lineno + ' in ' + event.filename + ': ' + event.message);
		}, false);
		
		plotDataWorker.postMessage({
			countryData: countryData,
			beginYear: beginYear, 
			xAxisShortName: xAxisShortName,
			yAxisShortName: yAxisShortName,
			yearsBack: yearsBack
		});
	}

}
	
	


