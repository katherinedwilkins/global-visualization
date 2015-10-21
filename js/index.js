var mapCanvas;
var map;


function changeVisibleForm(form) {
    //make all forms invisible
    $(".tabContainer").hide();
    
    //make the desired form visible
    switch (form) {
        case "map":
            $("#mapContainer").show();
            break;
        case "controlPanel":
            $("#controlPanelContainer").show();
            break;
    }
}

// On page init, fetch the data and set up event handlers
$(function () {
    // mapCanvas = d3.select("map").append("svg")
    //     .attr("width", 900)
    //     .attr("height", 600);
        
    // d3.json("world-110m.json", function(error, data){
    //     if (error){
    //         return console.error(error);
    //     }
    //     else{
    //         console.log(data);
    //     }
    // });
    map = new Datamap({
        element: document.getElementById('map'),
        fills: {
            HIGH: '#afafaf',
            LOW: '#123456',
            MEDIUM: 'blue',
            UNKNOWN: 'rgb(0,0,0)',
            defaultFill: 'green'
        },
        // Zoom in on Africa
        setProjection: function(element) {
            var projection = d3.geo.equirectangular/*mercator*/()
            .scale(150)
            .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
            var path = d3.geo.path()
            .projection(projection);
            return {path: path, projection: projection};
        },
        geographyConfig: {
            highlightOnHover: true,
            popupOnHover: false
        },
        data: {
            IRL: {
                fillKey: 'LOW',
                numberOfThings: 2002
            },
            USA: {
                fillKey: 'MEDIUM',
                numberOfThings: 10381
            }
        },

    });
    //console.log(map);
});

function mapZoom(evt){
    
    var svgContainer = d3.select("g").attr("transform", "scale(10,10)");



    switch(evt.currentTarget.id){
        case "zoomIn":
            //svgContainer.attr("transform", "scale(400, 400)")
            console.log("zoom in");
            //map.setProjection.scale(400);
        break;
        case "zoomOut":
            console.log("zoom out");
            map.setProjection.scale(20);
        break;
    }
    
    console.log("click");
    console.log(map.projection);
}

//event handlers
$(document).ready(function () {
    $('.btn-group').button();
    
    //change to map view
    changeVisibleForm("controlPanel");
    
    $("#formSelection input:radio").change(function () {
        console.log($("#formSelection input:radio:checked").val());
        changeVisibleForm($("#formSelection input:radio:checked").val());
    });

});

document.getElementById('zoomIn').addEventListener('click', mapZoom, false);
document.getElementById('zoomOut').addEventListener('click', mapZoom, false);
