//get an object value from a "." delimited string
// from:
// http://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
function getObjectFromString(str,obj){
	return pathIndex(obj, str)
}
function multiIndex(obj,is) {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
    return is.length ? multiIndex(obj[is[0]],is.slice(1)) : obj
}
function pathIndex(obj,is) {   // obj,'1.2.3' -> multiIndex(obj,['1','2','3'])
    return multiIndex(obj,is.split('.'))
}

// Returns the percentile of the given value in a sorted numeric array.
function getPercentile(arr, v) {
    if (typeof v !== 'number') throw new TypeError('v must be a number');
    for (var i = 0, l = arr.length; i < l; i++) {
        if (v <= arr[i]) {
            while (i < l && v === arr[i]) i++;
            if (i === 0) return 0;
            if (v !== arr[i-1]) {
                i += (v - arr[i-1]) / (arr[i] - arr[i-1]);
            }
            return i / l;
        }
    }
    return 1;
}
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
// d3.tip
// Copyright (c) 2013 Justin Palmer
//
// Tooltips for d3.js SVG visualizations

// Public - contructs a new tooltip
//
// Returns a tip
d3.tip = function() {
  var direction = d3_tip_direction,
      offset    = d3_tip_offset,
      html      = d3_tip_html,
      node      = initNode(),
      svg       = null,
      point     = null,
      target    = null

  function tip(vis) {
    svg = getSVGNode(vis)
    point = svg.createSVGPoint()
    document.body.appendChild(node)
  }

  // Public - show the tooltip on the screen
  //
  // Returns a tip
  tip.show = function() {
    var args = Array.prototype.slice.call(arguments)
    if(args[args.length - 1] instanceof SVGElement) target = args.pop()

    var content = html.apply(this, args),
        poffset = offset.apply(this, args),
        dir     = direction.apply(this, args),
        nodel   = d3.select(node), i = 0,
        coords

    nodel.html(content)
      .style({ opacity: 1, 'pointer-events': 'all' })

    while(i--) nodel.classed(directions[i], false)
    coords = direction_callbacks.get(dir).apply(this)
    nodel.classed(dir, true).style({
      top: (coords.top +  poffset[0]) + 'px',
      left: (coords.left + poffset[1]) + 'px'
    })

    return tip
  }

  // Public - hide the tooltip
  //
  // Returns a tip
  tip.hide = function() {
    nodel = d3.select(node)
    nodel.style({ opacity: 0, 'pointer-events': 'none' })
    return tip
  }

  // Public: Proxy attr calls to the d3 tip container.  Sets or gets attribute value.
  //
  // n - name of the attribute
  // v - value of the attribute
  //
  // Returns tip or attribute value
  tip.attr = function(n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).attr(n)
    } else {
      var args =  Array.prototype.slice.call(arguments)
      d3.selection.prototype.attr.apply(d3.select(node), args)
    }

    return tip
  }

  // Public: Proxy style calls to the d3 tip container.  Sets or gets a style value.
  //
  // n - name of the property
  // v - value of the property
  //
  // Returns tip or style property value
  tip.style = function(n, v) {
    if (arguments.length < 2 && typeof n === 'string') {
      return d3.select(node).style(n)
    } else {
      var args =  Array.prototype.slice.call(arguments)
      d3.selection.prototype.style.apply(d3.select(node), args)
    }

    return tip
  }

  // Public: Set or get the direction of the tooltip
  //
  // v - One of n(north), s(south), e(east), or w(west), nw(northwest),
  //     sw(southwest), ne(northeast) or se(southeast)
  //
  // Returns tip or direction
  tip.direction = function(v) {
    if (!arguments.length) return direction
    direction = v == null ? v : d3.functor(v)

    return tip
  }

  // Public: Sets or gets the offset of the tip
  //
  // v - Array of [x, y] offset
  //
  // Returns offset or
  tip.offset = function(v) {
    if (!arguments.length) return offset
    offset = v == null ? v : d3.functor(v)

    return tip
  }

  // Public: sets or gets the html value of the tooltip
  //
  // v - String value of the tip
  //
  // Returns html value or tip
  tip.html = function(v) {
    if (!arguments.length) return html
    html = v == null ? v : d3.functor(v)

    return tip
  }

  function d3_tip_direction() { return 'n' }
  function d3_tip_offset() { return [0, 0] }
  function d3_tip_html() { return ' ' }

  var direction_callbacks = d3.map({
    n:  direction_n,
    s:  direction_s,
    e:  direction_e,
    w:  direction_w,
    nw: direction_nw,
    ne: direction_ne,
    sw: direction_sw,
    se: direction_se
  }),

  directions = direction_callbacks.keys()

  function direction_n() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.n.y - node.offsetHeight,
      left: bbox.n.x - node.offsetWidth / 2
    }
  }

  function direction_s() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.s.y,
      left: bbox.s.x - node.offsetWidth / 2
    }
  }

  function direction_e() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.e.y - node.offsetHeight / 2,
      left: bbox.e.x
    }
  }

  function direction_w() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.w.y - node.offsetHeight / 2,
      left: bbox.w.x - node.offsetWidth
    }
  }

  function direction_nw() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.nw.y - node.offsetHeight,
      left: bbox.nw.x - node.offsetWidth
    }
  }

  function direction_ne() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.ne.y - node.offsetHeight,
      left: bbox.ne.x
    }
  }

  function direction_sw() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.sw.y,
      left: bbox.sw.x - node.offsetWidth
    }
  }

  function direction_se() {
    var bbox = getScreenBBox()
    return {
      top:  bbox.se.y,
      left: bbox.e.x
    }
  }

  function initNode() {
    var node = d3.select(document.createElement('div'))
    node.style({
      position: 'absolute',
      opacity: 0,
      pointerEvents: 'none',
      boxSizing: 'border-box'
    })

    return node.node()
  }

  function getSVGNode(el) {
    el = el.node()
    if(el.tagName.toLowerCase() == 'svg')
      return el

    return el.ownerSVGElement
  }

  // Private - gets the screen coordinates of a shape
  //
  // Given a shape on the screen, will return an SVGPoint for the directions
  // n(north), s(south), e(east), w(west), ne(northeast), se(southeast), nw(northwest),
  // sw(southwest).
  //
  //    +-+-+
  //    |   |
  //    +   +
  //    |   |
  //    +-+-+
  //
  // Returns an Object {n, s, e, w, nw, sw, ne, se}
  function getScreenBBox() {
    var targetel   = target || d3.event.target,
        bbox       = {},
        matrix     = targetel.getScreenCTM(),
        tbbox      = targetel.getBBox(),
        width      = tbbox.width,
        height     = tbbox.height,
        x          = tbbox.x,
        y          = tbbox.y,
        scrollTop  = document.documentElement.scrollTop || document.body.scrollTop,
        scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft


    point.x = x + scrollLeft
    point.y = y + scrollTop
    bbox.nw = point.matrixTransform(matrix)
    point.x += width
    bbox.ne = point.matrixTransform(matrix)
    point.y += height
    bbox.se = point.matrixTransform(matrix)
    point.x -= width
    bbox.sw = point.matrixTransform(matrix)
    point.y -= height / 2
    bbox.w  = point.matrixTransform(matrix)
    point.x += width
    bbox.e = point.matrixTransform(matrix)
    point.x -= width / 2
    point.y -= height / 2
    bbox.n = point.matrixTransform(matrix)
    point.y += height
    bbox.s = point.matrixTransform(matrix)

    return bbox
  }

  return tip
};
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

"use strict";

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
        case "HDI":
			path ="HDI"
			fullPath= "HDI.INSERT_YEAR"
		break;
        case "population":
			path ="Population"
			fullPath= "Population.INSERT_YEAR"
		break;
        case "disasters":
			path ="disasters"
			fullPath= "disasters.INSERT_YEAR.totalAffecte"
		break;
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
    var numSets = datasetInfo.getNumberDatasets();
    $( "#progressbar" ).progressbar("option", "max", numSets+1);
    
	d3.csv("./datasets/countries and two digit codes-2.csv", function(data){
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
        $("#shadeMessage").text("Country identifier data loaded.");
        $( "#progressbar" ).progressbar("option", "value", $( "#progressbar" ).progressbar("option","value")+1);

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
		//], callback);		
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
	d3.csv("./datasets/Refugee_Numbers_UNdata_Export_20151029_232124036.csv", function(data){
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
        $("#shadeMessage").text("Refugee numbers loaded.");
		console.log("loadRefugeeNumbers complete.");
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value")+2);
		return callback();
	});
}

function loadCorruptionPerceptionIndex(callback){
	d3.csv("./datasets/corruption perception index.csv", function(data){
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
        $("#shadeMessage").text("CPI data loaded.");
		console.log("loadCorruptionPerceptionIndex complete");
                $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value")+1);
		return callback();
	});
}

function loadPoliticalTerrorScale(callback){
	d3.csv("./datasets/" + datasetInfo["PTS-HRW"].fileName, function(data){
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
        $("#shadeMessage").text("Political Terror Scale loaded.");
		console.log("loadPoliticalTerrorScale complete");
                $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value")+3);
		return callback();
	});
}

function loadSocialViolenceScale(callback){
	d3.csv("./datasets/" + datasetInfo.SVS.fileName, function(data){
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
        $("#shadeMessage").text("Social Violence Scale loaded.");
		console.log("loadSocialViolencScale complete");
                $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value")+1);
		return callback();
	});
}


function loadGDP(callback){
	d3.csv("./datasets/country regional and world GDP.csv", function(data){
		
		
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
        $("#shadeMessage").text("GDP loaded.");
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value")+1);
		console.log("loadGDP complete");
		return callback();
	});
}


function loadGDPPerCapta(callback){
		d3.csv("./datasets/ny.gdp.pcap.cd_Indicator_en_csv_v2.csv", function(data){	
		
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
        $("#shadeMessage").text("Per Capita GDP loaded.");
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
		console.log("loadGDPPerCapta complete");
		return callback();
	});
}

function loadGPI(callback){
		d3.csv("./datasets/global_peace_index.csv", function(data){
		
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
        $("#shadeMessage").text("Global Peace Index loaded.");
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
		console.log("loadGPI complete");
		return callback();
	});
}

function loadHomicides(callback){
	d3.csv("./datasets/un homicide statistics.csv", function(data){
		
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
        $("#shadeMessage").text("Homocide data loaded.");
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 2);
		console.log("loadHomicides complete");
		return callback();
	});
}


function loadCashSurplus(callback){
	d3.csv("./datasets/un cash surplus-deficit as percent of GDP.csv", function(data){
		
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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("Cash Surplus data loaded.");
		console.log("loadCashSurplus complete");
		return callback();
	});
}


function loadPercentInternet(callback){
	d3.csv("./datasets/un percentage of indviduals using the Internet.csv", function(data){

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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("Percent Internet data loaded.");
		console.log("loadPercentInternet complete");
		return callback();
	});
}

function loadPopulation(callback){
	d3.csv("./datasets/population figures for countries and regions.csv", function(data){

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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("Population numbers loaded.");
		console.log("loadPopulation complete");
		return callback();
	});
}

function loadHDI(callback){
	d3.csv("./datasets/un human development index - y8j2-3vi9.csv", function(data){

		for(var i=0; i<data.length; i++){
			var countryName = data[i]["Country"]; 
			for (var year = startYear; year < currentYear; year ++ ){
				if(data[i][year]){
					if(_.indexOf(exclusionNames, countryName)===-1){	//don't execute for any data earlier than the starYear
					
						//normalize the country name
						countryName = normalizeCountryName(countryName);
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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("Human Development Index loaded.");
		console.log("loadHDI complete");
		return callback();
	});
}

function loadConflict(callback){
	d3.csv("./datasets/prio 124920_1ucdpprio-armed-conflict-dataset_v.4-2015.csv", function(data){
		
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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("Conflict data loaded.");
		console.log("loadConflict complete");
		return callback();
	});
}

function loadWorldBankHomicides(callback){
		d3.csv("./datasets/world bank homicides.csv", function(data){
		
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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("World Bank Homocide numbers loaded.");
		console.log("loadWorldBankHomicides complete");
		return callback();
	});
}

function loadDistanceData(callback){
		d3.csv("./datasets/capdist.csv", function(data){


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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("Distance data loaded.");
		console.log("loadDistanceData complete");
		return callback();
	});
}

function loadDisasters(callback){
	d3.csv("./datasets/emdat-Disasters.csv", function(data){
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
        $( "#progressbar" ).progressbar( "option", "value", $( "#progressbar" ).progressbar("option","value") + 1);
        $("#shadeMessage").text("Disaster data loaded.");
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

function printMultipleRegressionData(){
    var data = [];
    //push the headers 
    data.push(["Country", "Destination", "Year", "Refugees", "Population", "GDP Per Capita", "Corruption Perception Index", "Conflict", "Distance"]);
    //loop through each country 
    for (var country in countryData){
        if(countryData.hasOwnProperty(country)){
            //loop through each year in refugeeData object
            for(var year in countryData[country].refugeeData){
                if(countryData[country].refugeeData.hasOwnProperty(year)){
                    //loop through each destination
                    for(var destination in countryData[country].refugeeData[year].refugeesOut.destinations){
                        if(countryData[country].refugeeData[year].refugeesOut.destinations.hasOwnProperty(destination)){
                            //check to see if distance data exists for this country->destintion combo
                            //console.log(country + "->" + destination);
                            if(countryData[country].distances && countryData[country].distances[destination]){ 
                                var distance = countryData[country].distances[destination].kilometers;
                                //console.log("distance: " + country + "->" + destination + " = " + distance);
                                //get data for the origin country
                                var gdpPerCapita = getCountryData(countryData, country, "gdpCapita", year, "value");
                                var CPI;
                                if(countryData[country].corruptionPerceptionIndex && countryData[country].corruptionPerceptionIndex[year]){
                                    CPI = countryData[country].corruptionPerceptionIndex[year].value;
                                }
                                var conflict=0;
                                if(countryData[country].conflict && countryData[country].conflict[year]){
                                    conflict = 1
                                }
                                var refugeesOut = countryData[country].refugeeData[year].refugeesOut.destinations[destination];
                                var population = countryData[country].Population[year];
                                if(distance && CPI && population && refugeesOut && gdpPerCapita && distance){
                                    data.push([country, destination, year,  refugeesOut, population, gdpPerCapita, CPI, conflict, distance]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    for(var i=0; i< data.length; i++){
        console.log(data[i].join(","));
    }
    console.log("*** " + data.length + " records printed ***")
}
function printMultipleRegressionData1(){
    var data = [];
    //push the headers 
    data.push(["Country", "Year", "Refugees", "Population", "GDP Per Capita", "Corruption Perception Index", "Conflict"]);
    //loop through each country 
    for (var country in countryData){
        if(countryData.hasOwnProperty(country)){
            //loop through each year in refugeeData object
            for(var year in countryData[country].refugeeData){
                if(countryData[country].refugeeData.hasOwnProperty(year)){                           
                               
                                //console.log(country + " " + year);
                                //get data for the origin country
                                var gdpPerCapita = getCountryData(countryData, country, "gdpCapita", year, "value");
                                var CPI;
                                if(countryData[country].corruptionPerceptionIndex && countryData[country].corruptionPerceptionIndex[year]){
                                    CPI = countryData[country].corruptionPerceptionIndex[year].value;
                                }
                                var conflict=0;
                                if(countryData[country].conflict && countryData[country].conflict[year]){
                                    conflict = 1
                                }
                                var refugeesOut = countryData[country].refugeeData[year].refugeesOut.value;
                                var population;
                                if(countryData[country].Population && countryData[country].Population[year]){
                                        population = countryData[country].Population[year];
                                }
                                if(CPI && population && refugeesOut && gdpPerCapita){
                                    data.push([country, year, refugeesOut, population, gdpPerCapita, CPI, conflict, ]);
                                }
                            
                        
                    
                }
            }
        }
    }
    for(var i=0; i< data.length; i++){
        console.log(data[i].join(","));
    }
    console.log("*** " + data.length + " records printed ***")
}

function printMultipleRegressionDataAll(){
    var data = [];
    //push the headers 
    data.push(["Country", "Year", "Refugees Out", "Refugees In", "Population", "GDP Country", "GDP Per Capita", 
        "Corruption Perception Index", 
        "Total Homicides", "Homocides per 100k", "Cash Surplus", "Percent Internet", 
        "Conflict", "Disaster (total Affected)", "HDI", "PTS-HRW", "PTS-DoS", "PTS-AI", "SVS"
    ]);
    

                                        
    //loop through each country 
    for (var country in countryData){
        if(countryData.hasOwnProperty(country)){
            //loop through each year in refugeeData object
            for(var year in countryData[country].refugeeData){
                //console.log(country + " : " + year);
                if(countryData[country].refugeeData.hasOwnProperty(year)){                           
                               
                        //console.log(country + " " + year);
                        //get data for the origin country
                        var CPI,  population, refugeesOut, gdpPerCapita, gdpCountry,
                        refugeesIn, homoTot, homoPer, cashSurplus, percentInternet, conflict=0,
                        disasterTot, HDI, PTSHRW, PTSDoS, PTSAI, SVS;
                        gdpPerCapita = getCountryData(countryData, country, "gdpCapita", year, "value");
                        gdpCountry = getCountryData(countryData, country, "gdpCountry", year, "value");
                        
                        if(countryData[country].corruptionPerceptionIndex && countryData[country].corruptionPerceptionIndex[year]){
                            CPI = countryData[country].corruptionPerceptionIndex[year].value;
                        }

                        if(countryData[country].conflict && countryData[country].conflict[year]){
                            conflict = 1
                        }
                        refugeesOut = countryData[country].refugeeData[year].refugeesOut.value;
                        refugeesIn = countryData[country].refugeeData[year].refugeesIn.value;
                        homoTot = getCountryData(countryData, country, "homicidesCount", year, "value");
                        homoPer = getCountryData(countryData, country, "homicidesRate", year, "value");
                        cashSurplus = getCountryData(countryData, country, "cashSurplus", year, "value");
                        percentInternet = getCountryData(countryData, country, "percentInternet", year, "value");
                        disasterTot = getCountryData(countryData, country, "disasters", year, "value");

                        if(countryData[country].Population && countryData[country].Population[year]){
                                population = countryData[country].Population[year];
                        }
                        if(countryData[country].Population && countryData[country].Population[year]){
                                population = countryData[country].Population[year];
                        }
                        
                        HDI = getCountryData(countryData, country, "HDI", year, "value");
                        PTSHRW = getCountryData(countryData, country, "PTS-HRW", year, "value");
                        PTSDoS = getCountryData(countryData, country, "PTS-DoS", year, "value");
                        PTSAI = getCountryData(countryData, country, "PTS-AI", year, "value");
                        SVS = getCountryData(countryData, country, "SVS", year, "value");
                        data.push([
                            country, year, refugeesOut, refugeesIn, population, gdpCountry, gdpPerCapita, 
                            CPI, 
                            homoTot, homoPer, cashSurplus, percentInternet,
                            conflict, disasterTot, HDI, PTSHRW, PTSDoS, PTSAI, SVS
                        ]);
                        // if(CPI && population && refugeesOut && gdpPerCapita &&  gdpCountry &&
                        //     refugeesIn && homoTot && homoPer && cashSurplus && percentInternet &&
                        //     disasterTot && HDI
                        //     // disasterTot&& PTSHRW&& PTSDoS&& PTSAI&& SVS
                        // ){
                            
                        // }
                    
                }
                else{
                    console.log("here");
                }
            }
        }
    }
    for(var i=0; i< data.length; i++){
        console.log(data[i].join(","));
    }
    console.log("*** " + data.length + " records printed ***")
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
            //distance only work for either of the refugee items since an origin and destination countries are required
            alert("Distance data is only available in conjunction with 'Refugees In' or 'Refugees Out'.");
            return "error";
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
					//console.log(event.data.statusMessage)
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