var MobileServiceClient = WindowsAzure.MobileServiceClient; 
var client = new WindowsAzure.MobileServiceClient(
    "https://globalvisualizationmobileservice.azure-mobile.net/",
    "nEqHeNeqxcozORPJNVnEGUUWMRrHgW13"
);

var countryData = {};



//fill in country name and code informaiton on the countryData object
//each country will be a seperate object within the countryData object
function addCountries(data){
	console.log(data);
	
	for(var i=0; i<data.length; i++){
		countryData[data[0].Name].code = data[0].Code;
	}
	//load next set of data
	//loadCorruptionPerceptionIndex();
	console.log(countryData);
}

function loadCorruptionPerceptionIndex(){
	d3.csv("./dataSets/corruption perception index.csv", function(csv){
		console.table(csv);
	});
}

function uploadFile(){
	d3.csv("./dataSets/countries and two digit codes.csv", addCountries);
}

document.getElementById('uploadFile').addEventListener('click', uploadFile, false);

