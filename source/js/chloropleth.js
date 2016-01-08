"use strict";
var svg;
var width = 880, height = 500;
var rotate = 0;        // so that [-60, 0] becomes initial center of projection
var maxlat = 83;        // clip northern and southern poles (infinite in mercator)
var selectedDataset = null;
var bottomPadding = 40;
var padding = 20;

window.onload = function () {
    initializeSVG();
    async.series([
        loadCountryData,

    ],// optional callback
    function(err, results){
         console.log("**** loaded ****");
         $("#shade").hide();
    });
    loadTopoJSON();
    fillDropDownMenu();

    if (typeof (Worker) == "undefined") {
        console.log("webworker not supported");
    }
    
    //instantiate the slider
    updateChloroplethSlider(startYear, new Date().getFullYear());

    $(".datasetMenuItem").click(function (e) {
        selectedDataset = e.currentTarget.id;
        updateChloropleth();
        document.getElementById("selectedYear").innerHTML = datasetInfo[e.currentTarget.id].name;
    });
    $(".yearChangeButton").click(function (event) {
        switch (event.currentTarget.id) {
            case "incrementYear":
                if ($("#yearSelectSlider").slider("option", "value") < $("#yearSelectSlider").slider("option", "max")) {
                    $("#yearSelectSlider").slider("option", "value", $("#yearSelectSlider").slider("option", "value") + 1);
                    updateSliderSelectedYearReadout();
                }
                break;
            case "decrementYear":
                if ($("#yearSelectSlider").slider("option", "value") > $("#yearSelectSlider").slider("option", "min")) {
                    $("#yearSelectSlider").slider("option", "value", $("#yearSelectSlider").slider("option", "value") - 1);
                    updateSliderSelectedYearReadout();
                }
                break;
        }

    });
}



function datasetSelected(event) {
    console.log("here");
}

// $('input:radio').on('click', function (e) {
//     console.log(e.currentTarget.name); //e.currenTarget.name points to the property name of the 'clicked' target.
//     var dataPaths = getDataPath(e.currentTarget.value)
//     dataPaths.shortName = e.currentTarget.value;
//     //setSliderMaxAndMinYears(dataPaths);
//     updateChloropleth(dataPaths);
// });

function fillDropDownMenu() {

    for (var dataset in datasetInfo) {
        if (datasetInfo.hasOwnProperty(dataset)) {
            if (datasetInfo[dataset].active) {
                var node = document.createElement("LI");
                node.textContent = datasetInfo[dataset].name;
                node.className = "datasetMenuItem";
                node.id = datasetInfo[dataset].shortName;
                document.getElementById("datasetMenu").appendChild(node);
            }
        }
    }

}

function setSliderMaxAndMinYears(dataPaths) {

    var maxYear = -Infinity, minYear = Infinity;
    for (var country in countryData) {
        if (countryData.hasOwnProperty(country)) {
            //console.log(country);
            if (countryData[country][dataPaths.path]) {
                var years = Object.keys(countryData[country][dataPaths.path]);
                if(_.max(years) > maxYear){
                    maxYear = _.max(years);
                }
                if(_.min(years)  < minYear){
                    minYear = _.min(years);
                }
            }
        }
    }
    console.log(minYear + ", " + maxYear);
    $('#yearSelectSlider').slider("option", "min", Number(minYear));
    $('#yearSelectSlider').slider("option", "max", Number(maxYear));
    updateSliderYearsReadouts();

}

function updateSliderYearsReadouts() {
    document.getElementById("minYear").innerHTML = $('#yearSelectSlider').slider("option", "min");
    document.getElementById("maxYear").innerHTML = $('#yearSelectSlider').slider("option", "max");
}

function updateSliderSelectedYearReadout() {
    document.getElementById("yearsDisplayed").innerHTML = $('#yearSelectSlider').slider("option", "value");
}

function updateChloropleth() {
    if (selectedDataset) {
        var dataPaths = getDataPath(selectedDataset);
        dataPaths.shortName = selectedDataset;
        setSliderMaxAndMinYears(dataPaths);


        var year = $("#yearSelectSlider").slider("option", "value");
        var data = getChloroplethData(dataPaths.shortName, year);
    
    
    
        //for use when the lowsest number is good
        var normalPercentileScale = d3.scale.quantile()
            .domain([
                d3.min(data, function (d) {
                    return d.value;
                }),
                d3.max(data, function (d) {
                    return d.value;
                })
            ])
            .range(d3.range(5).map(function (i) { return "norm" + i; }));   
            
        //for use when the highest number is good
        var inversePercentileScale = d3.scale.quantile()
            .domain([
                d3.min(data, function (d) {
                    return d.value;
                }),
                d3.max(data, function (d) {
                    return d.value;
                })
            ])
            .range(d3.range(5).map(function (i) { return "inv" + i; }));   
            
                    //for use when the highest number is good
        var CPIScale = d3.scale.quantize()
            .domain([0, 10])
            .range(d3.range(10).map(function (i) { return "cpi" + i; }));   
    
    
    
    
        //change all the countries to no data first
        $(".land").attr("class", "land noData");
        for (var i = 0; i < data.length; i++) {
            if (data[i].value) {
                //$("#" + data[i].country).css("fill", "red");
                //console.log(data[i].country);
                console.log(data[i].value);
                if (data[i].value) {
                    var color = "black";
                    switch (datasetInfo[dataPaths.shortName].scale) {
                        case "normal":
                            color = normalPercentileScale(data[i].value);
                            break;
                        case "inverse":
                            color = inversePercentileScale(data[i].value);
                            break;
                        case "cpi":
                            color = CPIScale(data[i].value);
                            break;
                        default:
                            console.log("error determining scale");

                    }

                    //console.log(data[i].country + " " + data[i].value + " " + color);
                    $("[id='" + data[i].country + "']").attr("class", "land " + color);
                }
                else {
                    //console.log(data[i].country);
                    $("[id='" + data[i].country + "']").attr("class", "land noData");
                }
            }

        }
        
        if( d3.min(data, function (d) {return d.value;})){  //only show the legend when legitimate data is present
            //create the symbol shape legend
            svg.append("g")
                .attr("class", "legendQuant")
                .attr("transform", "translate(" + (padding) + "," + (height - (height/2) ) + ")");
        
            var legend;
            
            switch (datasetInfo[dataPaths.shortName].scale) {
                case "normal":
                    legend = d3.legend.color()
                        .scale(normalPercentileScale)
                        .labelFormat(getFormat(dataPaths.shortName))
                        .useClass(true);
                    break;
                case "inverse":
                    legend = d3.legend.color()
                        .scale(inversePercentileScale)
                        .labelFormat(getFormat(dataPaths.shortName))
                        .useClass(true);
                    break;
                case "cpi":
                    legend = d3.legend.color()
                        .scale(CPIScale)
                        .labelFormat(getFormat(dataPaths.shortName))
                        .useClass(true);
                    break;
                break;
                default:
                    console.log("error determining scale");
    
            }
        
            svg.select(".legendQuant")
                .call(legend);
        }
    }
}

function getFormat(datasetName){
    switch (datasetInfo[datasetName].format){
        case "money":
            return d3.format("$.0f");
        case "wholeNumber":
            return d3.format(".0f");
        case "decimal":
            return d3.format(".2f");
        case "percent":
            return d3.format("%");
        case "percentNoMultiply":
            return d3.format("0f") + "%";
        case "billions":
            return d3.format("$.0f");
        default:
            console.log("error determining number format");
            return d3.format(""); 
    }
}

function initializeSVG() {
    svg = d3.select("#map")
        .append("svg")
        .attr("id", "chloroplethSVG")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);
}

var projection = d3.geo.mercator()
    .rotate([rotate, 0])
    .scale(1)           // we'll scale up to match viewport shortly.
    .translate([width / 2, height / 2]);

// find the top left and bottom right of current projection
function mercatorBounds(projection, maxlat) {
    var yaw = projection.rotate()[0],
        xymax = projection([-yaw + 180 - 1e-6, -maxlat]),
        xymin = projection([-yaw - 180 + 1e-6, maxlat]);

    return [xymin, xymax];
}

// set up the scale extent and initial scale for the projection
var b = mercatorBounds(projection, maxlat),
    s = width / (b[1][0] - b[0][0]),
    scaleExtent = [s, 10 * s];
projection
    .scale(scaleExtent[0]);

var zoom = d3.behavior.zoom()
    .scaleExtent(scaleExtent)
    .scale(projection.scale())
    .translate([0, 0])               // not linked directly to projection
    .on("zoom", redraw);

var path = d3.geo.path()
    .projection(projection);

function loadTopoJSON() {

    d3.json("/topoJSONData/countriesWithNames.json", function (error, world) {
        if (error) throw error;
        svg.selectAll('path')
            .data(world.features)
            .enter()
            .append('path')
            .attr("id", function (d) {
                return normalizeCountryName(d.properties.name);
            })
            .attr("class", "land")

        redraw();       // update path data
    });
}

// track last translation and scale event we processed
var tlast = [0, 0],
    slast = null;


function redraw() {
    if (d3.event) {
        var scale = d3.event.scale,
            t = d3.event.translate;                
        
        // if scaling changes, ignore translation (otherwise touch zooms are weird)
        if (scale != slast) {
            projection.scale(scale);
        } else {
            var dx = t[0] - tlast[0],
                dy = t[1] - tlast[1],
                yaw = projection.rotate()[0],
                tp = projection.translate();
        
            // use x translation to rotate based on current scale
            projection.rotate([yaw + 360. * dx / width * scaleExtent[0] / scale, 0, 0]);
            // use y translation to translate projection, clamped by min/max
            var b = mercatorBounds(projection, maxlat);
            if (b[0][1] + dy > 0) dy = -b[0][1];
            else if (b[1][1] + dy < height) dy = height - b[1][1];
            projection.translate([tp[0], tp[1] + dy]);
        }
        // save last values.  resetting zoom.translate() and scale() would
        // seem equivalent but doesn't seem to work reliably?
        slast = scale;
        tlast = t;
    }

    svg.selectAll('path')       // re-project path data
        .attr('d', path);
}

function updateChloroplethSlider(min, max) {
    $('#yearSelectSlider').slider({
        range: false,
        min: min,
        max: max,
        value: max,

        slide: function (event, ui) {
            document.getElementById("yearsDisplayed").innerHTML = (ui.value);
        },
        create: function (event, ui) {
            document.getElementById("yearsDisplayed").innerHTML = ("" + new Date().getFullYear());
        },
        change: function (event, ui) {
            updateChloropleth();
        }
    });

    $('#yearSelectSlider').slider("option", "min", Number(min));
    $('#yearSelectSlider').slider("option", "max", Number(max));

    updateSliderYearsReadouts();
    $('#yearSelectSlider').slider("option", "value", max);
    updateSliderSelectedYearReadout();
}