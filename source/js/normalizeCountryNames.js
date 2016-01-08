//this function normalizes country names across multiple datasets
// it takes a country name, and returns a standardized one
function normalizeCountryName(countryName){
	//remove any leading or traling whitespace from country name
	if(countryName){
		countryName = countryName.trim();
	}
	
	switch(countryName){
		case "The Bahamas":
		case "Bahamas, The":
			return  "Bahamas";
		case "Bolivia (Plurinational State of)":
			return "Bolivia";
		case "Brunei Darussalam":
			return "Brunei";
		case "Bosnia-Herzegovina":
		case "Bosnia-Hercegovenia":
			return "Bosnia and Herzegovina";
		case "Cambodia (Kampuchea)":
			return "Cambodia";
		case "Cabo Verde":
		case "Cape Verde Is":
			return "Cape Verde";
		case "Central African Rep.":
		case "Central African Rep":
			return "Central African Republic";
		case "People's Republic of China":
		case "China P Rep":
		case "China (includes Tibet, Hong Kong, and Macau)":
			return "China";
		case "Czechoslovakia":
		case "Czech Rep.":
		case "Czech Rep":
			return "Czech Republic";
		case "Congo, Rep.":
		case "Congo Brazzaville":
		case "Republic of the Congo":
		case "Congo, Republic of the":
			return "Republic of Congo";
		case "Congo":
		case "Congo, Dem. Rep.":
		case "Dem. Rep. of the Congo":
		case "DR Congo (Zaire)":
		case "Zaire/Congo Dem Rep":
		case "Congo (Democratic Republic of the)":
		case "Congo, Democratic Republic of the":
			return "Democratic Republic of the Congo";
		case "Cook Is":
			return "Cook Islands";
		case "Northern Cyprus":
			return "Cyprus";
		case "Dominican Rep.":
		case "Dominican Rep":
			return "Dominican Republic";
		case "Cote d'Ivoire":
		case "Côte d'Ivoire":
		case "Ivory Coast":
		case "Ivory Coast (Cote d'Ivoire)":
		case "Côte d'Ivoire":
			return "Ivory Coast";
		case "Egypt, Arab Rep.":
			return "Egypt";
		case "Falkland Islands":
			return "Falkland Islands (Malvinas)";
		case "The Gambia":
		case "Gambia, The":
		case "Gambia The":
			return "Gambia";
		case "Germany Dem Rep":
		case "Germany Fed Rep":
			return "Germany";
		case "Guinea Bissau":
			return "Guinea-Bissau";
		case "Hong Kong SAR, China":
		case "Hong Kong SAR":
		case "Hong Kong (China)":
			return "Hong Kong";
		case "Iran, Islamic Rep.":
		case "Iran Islam Rep":
		case "Islamic Rep. of Iran":
		case "Iran (Islamic Republic of)":
		case "Iran (Islamic Rep. of)":
			return "Iran";
		case "Israel and Occupied Territories*":
		case "Israel in occupied territories only":
		case "Israel in pre-1967 borders":
		
			return "Israel";
		case "Holy See (the)":
			return "Holy See (Vatican City State)";
		case "Hong Kong Special Administrative Region of China":
		case "Hong Kong, China (SAR)":
			return "Hong Kong";
		case "Kuweit":
			return "Kuwait";
		
		case "Kyrgyz Republic":
			return  "Kyrgyzstan";
		case "Lao PDR":
		case "Lao People's Dem. Rep.":
		case "Lao People's Democratic Republic":
		case "Lao P.D.R.":
		case "Lao P Dem Rep":
			return "Laos";
		case "Libyan Arab Jamahiriya":
		case "Libyan Arab Jamah":
			return "Libya";
		case "Macao SAR":
		case "Macao SAR, China":
		case "Macao Special Administrative Region of China":
			return "Macau";
		case "Marshall Is":
			return "Marshall Islands";
		case "The former Yugoslav Rep. of Macedonia":
		case "Macedonia, FYR":
		case "Macedonia FRY":
		case "The former Yugoslav Republic of Macedonia":
		case "FYR Macedonia":
		case "T.F.Y.R. Macedonia":
			return "Macedonia";
		case "Madagascar (Malagasy)":
			return "Madagascar";
		case "Micronesia (Federated States of)":
		case "Micronesia, Fed. Sts.":
		case "Micronesia (Fed. States of)":
		case "Micronesia Fed States":
		case "Micronesia, Federated States of":
			return "Micronesia";
		case "Rep. of Moldova":
		case "Moldova Rep":
		case "Republic of Moldova":
		case "Moldova (Republic of)":
			return "Moldova";
		case "Myanmar (Burma)":
		case "Burma":
			return "Myanmar";
			
		case "Dem. People's Rep. of Korea":
		case "Democratic People's Republic of Korea":
		case "Korea, Dem. Rep.":
		case "Korea (North)":
		case "Korea (Democratic People's Rep. of)":
		case "Korea Dem P Rep":
		case "North Korea (Democratc People's Republic of Korea)":
		case "Korea, Democratic People's Republic of":
			return  "North Korea";
		case "Northern Marianas Islands":
		case "Northern Mariana Is":
			return "Northern Mariana Islands";
		case "Korea (South)":
		case "Korea Rep":
		case "Korea (Rep. of)":
		case "Korea, Rep.":
		case "Republic of Korea":
		case "Korea (Republic of)":
		case "Rep. of Korea":
		case "South Korea (Republic of Korea)":
		case "Korea, Republic of":
			return  "South Korea";
		case "State of Palestine":
		case "The Occupied Territories":
		case "Occupied Palestinian Territory":
		case "Palestinian Authority":
		case "Palestine, State of":
		case "Palestine (West Bank)":
			return "Palestine";
		case "Rumania":
			return "Romania";
		case "Soviet Union":
		case "Russian Federation":
		case "Russia (Soviet Union)":
			return  "Russia";	
		case "Sao Tome et Principe":
			return "Sao Tome and Principe";
		case "Republic of Serbia":
		case "Serbia (Yugoslavia)":
		case "Serbia (and Kosovo: S/RES/1244 (1999))":
			return "Serbia";
		case "Slovak Republic":
			return  "Slovakia";	
		case "Solomon Is":
			return "Solomon Islands";
		case "Somaliland":
			return "Somalia";
		case "St Helena":
			return "Saint Helena";
		case "St. Kitts and Nevis":
		case "St Kitts and Nevis":
			return "Saint Kitts and Nevis";
		case "St. Lucia":
		case "St Lucia":
			return "Saint Lucia";
		case "St. Martin (French part)":
			return "Saint Martin (French part)";
		case "St. Vincent and the Grenadines":
		case "St Vincent and the Grenad":
			return "Saint Vincent and the Grenadines";
		case "Syrian Arab Rep.":
		case "Syrian Arab Rep":
		case "Syrian Arab Republic":
			return  "Syria";
		case "East Timor":
		case "East Timor (Timor L'este)":
			return "Timor-Leste";
		case "Taijikistan":
			return  "Tajikistan"
		case "Tanzania (United Republic of)":
		case "Tanzania Uni Rep":
			return "Tanzania";
		case "Turks and Caicos Is":
			return "Turks and Caicos Islands";
		case "United Rep. of Tanzania":
		case "United Republic of Tanzania":
			return "Tanzania";
		case "United Kingdom of Great Britain and Northern Ireland":
			return "United Kingdom";
		case "USA":
		case "United States of America":
			return  "United States";
		case "United States Virgin Islands":
		case "Virgin Islands (U.S.)":
		case "Virgin Is (US)":
			return  "U.S. Virgin Islands";
		case "Virgin Is (UK)":
			return "British Virgin Islands";
			
		case "Venezuela (Bolivarian Republic of)":
		case "Venezuela, RB":
			return  "Venezuela";
		case "Viet Nam":
			return "Vietnam";
		case "Wallis and Futuna Is":
			return "Wallis and Futuna";
		case "West Bank and Gaza":
		case "West Bank":
			return "Palestine";
		case "Yemen, Rep.":
		case "South Yemen":
		case "Yemen Arab Rep":
		case "Yemen (North Yemen)":
		case "Yemen P Dem Rep":
			return  "Yemen";
		case "Zimbabwe (Rhodesia)":
			return "Zimbabwe";
		default:
			return countryName;
	}
}
