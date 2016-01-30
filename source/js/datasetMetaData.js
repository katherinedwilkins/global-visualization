//datasets 
var datasetInfo ={
	gdpCountry: {
		name:	"Country GDP",
		shortName: "gdpCountry",
		source: "World Bank",
		fileName :"country regional and world GDP.csv",
		active: true,
		scale: "normal", //normal scale is used when a high data value is desirable
		format: "money"
	},
	gdpCapita: {
		name:	"Per Capita GDP",
		shortName: "gdpCapita",
		source: "World Bank",
		fileName :"ny.gdp.pcap.cd_Indicator_en_csv_v2.csv",
		active: true,
		scale: "normal",
		format: "money"	
	},
	corruption: {
		name:	"Corruption Perception Index",
		note: "Higher value indicates less corruption",
		shortName: "corruption",
		source: "Transparency International",
		fileName: "corruption perception index.csv",
		active: true,
		scale: "cpi",
		format: "wholeNumber"
	},
	refugeesIn: {
		name:	"Refugees In",
		shortName: "refugeesIn",
		source: "United Nations High Commission for Refugees",
		fileName: "Refugee_Numbers_UNdata_Export_20151029_232124036.csv",
		active: true,
		scale: "inverse", //inverse scale is used when a lower data value is desirable
		format: "longNumber"
	},
	refugeesOut: {
		name:	"Refugees Out",
		shortName: "refugeesOut",
		source: "United Nations High Commission for Refugees",
		filename: "Refugee_Numbers_UNdata_Export_20151029_232124036.csv",
		active: true,
		scale: "inverse",
		format: "longNumber"
	},
	refugeesPercentPopulation: {
		name:	"Refugees as Percent of Population",
		shortName: "refugeesPercentPopulation",
		source: "United Nations High Commission for Refugees and data.okfn.org",
		active: false,
		scale: "inverse",
		format: "percent"
	},
	homicidesCount: {
		name:	"Homicide Count",
		shortName: "homicidesCount",
		source: "United Nations",
		fileName: "un homicide statistics.csv",
		active: true,
		scale: "inverse",
		format: "wholeNumber"
	},
	homicidesRate: {
		name:	"Homicides per 100,000",
		shortName: "homicidesRate",
		source: "United Nations",
		fileName: "un homicide statistics.csv",
		active: true,
		scale: "inverse",
		format: "wholeNumber"
	},
	cashSurplus: {
		name:	"Cash Surplus",
		shortName: "cashSurplus",
		source: "United Nations",
		active: true,
		scale: "normal",
		format: "decimal"	
	},
	percentInternet: {
		name:	"Percent Access to Internet",
		shortName: "percentInternet",
		source: "United Nations",
		fileName: "un percentage of indviduals using the Internet.csv",
		active: true,
		scale: "normal",
		format: "decimal"
	},
	conflict: {
		name:	"Conflict",
		shortName: "conflict",
		source: "Uppsala Conflict Data Program and Peace Research Institute Oslo",
		link: "https://www.prio.org/Data/Armed-Conflict/UCDP-PRIO/",
		filename: "prio 124920_1ucdpprio-armed-conflict-dataset_v.4-2015.csv",
		active: true,
		scale: "UPIconflict",
		format: "wholeNumber"
	},
	disasters: {
		name:	"Disasters (total affected)",
		shortName: "disasters",
		source: "EM-DAT: The International Disaster Database",
		link: "http://www.emdat.be/",
		filename: "emdat-Disasters.csv",
		active: true,
		scale: "inverse",
		format: "wholeNumber"
	},
	distance: {
		name:	"Distance",
		shortName: "distance",
		source: "Kristian Skrede Gleditsch",
		link: "http://privatewww.essex.ac.uk/~ksg/data-5.html",
		fileName: "capDist.csv",
		active: true,
		scale: "inverse",
		format: "wholeNumber"
	},
	population: {
		name:	"Population",
		shortName: "population",
		source: "data.okfn.org",
		link: "http://data.okfn.org/data/core/population",
		fileName: "population figures for countries and regions.csv",
		active: true,
		scale: "normal",
		format: "wholeNumber"
	},
	GPI:{
		name:	"Global Peace Index",
		shortName: "GPI",
		note: "Higher value indicates less peaceful",
		source: "Institute for Economics and Peace",
		link: "http://wikiprogress.org/data/dataset/global-peace-index",
		fileName: "global_peace_index.csv",
		active: false,
		scale: "normal",
		format: "decimal"
	},
	HDI:{
		name:	"Human Development Index",
		shortName: "HDI",
		source: "United Nations",
		link: "un human development index - y8j2-3vi9.csv",
		fileName: "global_peace_index.csv",
		active: true,
		scale: "normal",
		format: "decimal"
	},
	"PTS-HRW":{
		name:	"Political Terror Scale: Human Rights Watch Index",
		shortName: "PTS-HRW",
		source: "Gib­ney, Mark, Linda Cor­nett, Reed Wood, Peter Hasch­ke, and Daniel Arnon",
		fileName: "political terror scale - PTS2015.csv",
		link: "ht­tp://www.polit­ic­al­ter­rorscale.org",
		active: false,
		scale: "inverse",
		format: "wholeNumber"
	},
	"PTS-DoS":{
		name:	"Political Terror Scale: U.S State Department Index",
		shortName: "PTS-DoS",
		source: "Gib­ney, Mark, Linda Cor­nett, Reed Wood, Peter Hasch­ke, and Daniel Arnon",
		fileName: "political terror scale - PTS2015.csv",
		link: "ht­tp://www.polit­ic­al­ter­rorscale.org",
		active: false,
		scale: "inverse",
		format: "wholeNumber"
	},
	"PTS-AI":{
		name:	"Political Terror Scale: Amnesty International Score",
		shortName: "PTS-AI",
		source: "Gib­ney, Mark, Linda Cor­nett, Reed Wood, Peter Hasch­ke, and Daniel Arnon",
		fileName: "political terror scale - PTS2015.csv",
		link: "ht­tp://www.polit­ic­al­ter­rorscale.org",
		active: false,
		scale: "inverse",
		format: "wholeNumber"
	},
	"SVS":{
		name:	"Social Violence Scale",
		shortName: "SVS",
		source: "Gib­ney, Mark, Linda Cor­nett, Reed Wood, Peter Hasch­ke, and Daniel Arnon",
		link: "ht­tp://www.polit­ic­al­ter­rorscale.org",
		fileName: "political terror scale - SVS2014.csv",
		active: false,
		scale: "inverse",
		format: "wholeNumber"
	},
	getNumberDatasets : function(){
        var numSets = 0;
        for (var dataset in datasetInfo){
            if(datasetInfo.hasOwnProperty(dataset)){
                if(datasetInfo[dataset].active){
                    numSets ++;
                }
            }
        }
        console.log("loading " + numSets + " files");
        return numSets;
        
    }
}