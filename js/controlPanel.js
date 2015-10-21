var MobileServiceClient = WindowsAzure.MobileServiceClient; 
var client = new WindowsAzure.MobileServiceClient(
    "https://globalvisualizationmobileservice.azure-mobile.net/",
    "nEqHeNeqxcozORPJNVnEGUUWMRrHgW13"
);

function uploadFile(){
	d3.csv("./dataSets/curruption perception index.csv", function(csv){
		console.log(csv);
	});

}

document.getElementById('uploadFile').addEventListener('click', uploadFile, false);

