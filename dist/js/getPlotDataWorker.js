importScripts('getCountryData.js');

self.addEventListener('message', function (event) {
	void 0;
	getPlotDataWorker(
		event.data.countryData,
		event.data.beginYear,
		event.data.xAxisShortName,
		event.data.yAxisShortName,
		event.data.yearsBack
		);
}, false);

function getPlotDataWorker(countryData, beginYear, xAxisShortName, yAxisShortName, yearsBack) {
	var data = [];
	var countryCounter = 0;
	for (var country in countryData) {
		var xValue = null, yValue = null;
		if (countryData.hasOwnProperty(country)) {

			for (var year = beginYear; year > beginYear - yearsBack; year--) {

				xValue = getCountryData(countryData, country, xAxisShortName, year, "value");
				yValue = getCountryData(countryData, country, yAxisShortName, year, "value");

				if ((xValue === null) || (yValue === null)) {
					xValue = "#N/A";
					yValue = "#N/A";
				}

				if ((xValue !== "#N/A") && (yValue !== "#N/A")) {
					data.push([country, xValue, yValue, year, countryData[country].region]);
				}

			}
		}
		countryCounter++;
		postMessage({
			messageType: "update",
			statusMessage: countryCounter / countryData.numCountries + " complete"
		});
	}
	postMessage({
		messageType: "complete",
		plotData: data
	});
}