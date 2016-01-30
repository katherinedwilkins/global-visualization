function getCountryData(countryData, country, dataType, year, dataSuffix){
	var returnValue;

	try{
			switch(dataType){
			case "gdpCountry":				
					returnValue = countryData[country].GDP[year].raw[dataSuffix] ? countryData[country].GDP[year].raw[dataSuffix] : null;				
			break;
			case "gdpCapita":
					returnValue =  countryData[country].GDP[year].perCapita[dataSuffix] ? countryData[country].GDP[year].perCapita[dataSuffix] : null;			
			break;
			case "corruption":
					returnValue =  countryData[country].corruptionPerceptionIndex[year][dataSuffix] ? countryData[country].corruptionPerceptionIndex[year][dataSuffix] : null;
			break;
			case "refugeesIn":
					returnValue =  countryData[country].refugeeData[year].refugeesIn[dataSuffix] ? countryData[country].refugeeData[year].refugeesIn[dataSuffix] : null;
			break;
			case "refugeesOut":
					returnValue =  countryData[country].refugeeData[year].refugeesOut[dataSuffix] ? countryData[country].refugeeData[year].refugeesOut[dataSuffix] : null;
			break;
            case "population":
					returnValue =  countryData[country].Population[year] ? countryData[country].Population[year]  : null;
			break;
			// case "refugeesPercentPopulation":
			// 	returnValue =  countryData[country].refugeeData[year].refugeesOut[dataSuffix] ? countryData[country].refugeeData[year].refugeesOut[dataSuffix] : null;
			// break;
			case "homicidesRate":
					returnValue =  countryData[country].homicides[year].rate[dataSuffix] ? countryData[country].homicides[year].rate[dataSuffix] : null;
			break;
			case "homicidesCount":
					returnValue =  countryData[country].homicides[year].count[dataSuffix] ? countryData[country].homicides[year].count[dataSuffix] : null;
			break;
			case "cashSurplus":
					returnValue =  countryData[country].cashSurplus[year][dataSuffix] ? countryData[country].cashSurplus[year][dataSuffix] : null;
			break;
			case "percentInternet":
					returnValue =  countryData[country].percentInternet[year][dataSuffix] ? countryData[country].percentInternet[year][dataSuffix] : null;
			break;
			case "conflict":
				try{
						returnValue =  countryData[country].conflict[year][dataSuffix] ? countryData[country].conflict[year][dataSuffix] : "no conflict";
				}
				catch(e){
					return "no conflict";
				}
			break;
			case "worldBankHomicides":
				returnValue = countryData[country].homicidesWorldBank[year] ? countryData[country].homicidesWorldBank[year].value : null;
			break;
			case "HDI":
				returnValue =  countryData[country].HDI[year][dataSuffix] ? countryData[country].HDI[year][dataSuffix] : null;
			break;
			case "distance":	//year in this case is the other country
				var otherCountry=year;
				returnValue =  countryData[country].distances[otherCountry][dataSuffix] ? countryData[country].distances[otherCountry][dataSuffix] : null;
			break;
			case "GPI":
				returnValue = countryData[country].GPI[year][dataSuffix] ? countryData[country].GPI[year][dataSuffix] : null;
			break;
			case "disasters":
				returnValue = countryData[country].disasters[year].totalAffected? countryData[country].disasters[year].totalAffected: null;
			break;
			case "population":
				returnValue = countryData[country].Population[year] ? countryData[country].Population[year]: null;
			break;
			case "PTS-HRW":
				returnValue = countryData[country].PTS[year].humanRightsWatch ? countryData[country].PTS[year].humanRightsWatch: null;
			break;
			case "PTS-DoS":
				returnValue = countryData[country].PTS[year].usStateDepartment ? countryData[country].PTS[year].usStateDepartment: null;
			break;
			case "PTS-AI":
				returnValue = countryData[country].PTS[year].amnestyInternational ? countryData[country].PTS[year].amnestyInternational: null;
			break;
			case "SVS":
				returnValue = countryData[country].SVS[year].value ?countryData[country].SVS[year].value: null;
			break;
		}
		return returnValue;
	}
	catch(err){
		return null;
	}
	
}