var MobileServiceClient = WindowsAzure.MobileServiceClient; 
var client = new WindowsAzure.MobileServiceClient(
    "https://globalvisualizationmobileservice.azure-mobile.net/",
    "nEqHeNeqxcozORPJNVnEGUUWMRrHgW13"
);

var countryData = {};



//fill in country name and code informaiton on the countryData Object
function addCountries(data){
	console.log(data);
	
	for(var i=0; i<data.length; i++){
		//countryData.data
	}
	//load next set of data
	//loadCorruptionPerceptionIndex();
	
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

