//getDistancePlotData
// get distance data is more involved than the other fetches since many distances exist for each origin country; a distance
// exists for each destination location
// distanceAxis: the axis ("x" or "y"") that the distance data needs to be put in.  The user can request that 
//  the data be placed on either the x or y axis
// otherAxisName: the shortName of the data to be put on the other axis.  Typically, this will be the number of refugees out which is actually given
//  as part of the distance data.  However, the user could ask for something else
// refugeeType: either refugeesIn, refugeesOut, or neither

self.addEventListener('message', function (event) {
	console.log("starting webworker");
	getDistancePlotData(
		event.data.distanceAxis, 
		event.data.otherAxisName,
		event.data.refugeeType, 
		event.data.countryData,
		event.data.beginYear,
		event.data.yearsBack
	);
}, false);


function getDistancePlotData(distanceAxis, otherAxisName, refugeeType, countryData, beginYear,yearsBack) {
	var data = [];
	console.log("running worker");
	
	//if the user picks the somehting other than refugeesOut or refugeesIn for the non-distance axis then still
	// use the refugeesOut for a look up values
	var refugeeLookup1 = "refugeesOut"
	var refugeeLookup2 = "destinations";
	//var refugeeLookup3 = "destination";
	
	if (refugeeType === "refugeesIn") {
		refugeeLookup1 = "refugeesIn";
		refugeeLookup2 = "origins";
		//refugeeLookup3 = "origin";
	}
	var countryCounter = 0;
	//header = ["Origin Country", "Destination Country", "Number of Refugees", "Distance Traveled (km)", "year"];
	for (var country in countryData) {

		if (countryData.hasOwnProperty(country)) {
			for (var year = beginYear; year > beginYear - yearsBack; year--) {
				if ((countryData[country].hasOwnProperty("refugeeData"))&&(
					countryData[country].refugeeData.hasOwnProperty(year))) {	//check to see that data exists for this year
					for (var location in countryData[country].refugeeData[year][refugeeLookup1][refugeeLookup2]) {

						var lineBuffer = [country];
						//console.log(country + " -> " + destination);
						if ((countryData[country].distances) && (countryData[country].distances[location])) {
							var distance = countryData[country].distances[location].kilometers;

							var nonDistanceValue;
							if (refugeeType !== "neither") {	//get the number of refugees in or out
								nonDistanceValue =
								countryData[country].refugeeData[year][refugeeLookup1][refugeeLookup2][location];
							}
							else {
								nonDistanceValue =
								getCountryData(country, otherAxisName, year, "value");
							}
									

							//put the disance in the y axis, and refugees on the x axis
							if (distanceAxis === "x") {
								lineBuffer.push(
									distance,
									nonDistanceValue,
									year,
									countryData[country].region,
									location);
							}
							else {	//put the disance in the x axis, and refugees on the y axis
								lineBuffer.push(
									nonDistanceValue,
									distance,
									year,
									countryData[country].region,
									location);
							}

						}
						if (lineBuffer.length > 1) {
							data.push(lineBuffer);
						}
					}
				}

			}

		}
		countryCounter++;
		postMessage({
			messageType: "update",
			statusMessage : countryCounter / countryData.numCountries + " complete"
		});
	}

	postMessage({
			messageType: "complete",
			distancePlotData : data,
	});
}



