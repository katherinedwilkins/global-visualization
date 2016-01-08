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

function drawUpdatedPlotInfoWorker(plotInfo, datasetInfo) {
	var dataset = plotInfo.data;
	var xAxisDatasetInfo = datasetInfo[document.getElementById("xAxisSelected").getAttribute("shortName")];
	var yAxisDatasetInfo = datasetInfo[document.getElementById("yAxisSelected").getAttribute("shortName")];
		
	//need to create an array of x values and an array of y values in order to calculate
	// correlation coefficients using jstat
	var xArray = [], yArray = [];
		
	//make the plot type and dataset specific adjustments
	makeAdjustments(plotInfo, xAxisDatasetInfo, yAxisDatasetInfo);
		
		
	//clear the current plot
	$("#scatterPlotSVG").empty();

	console.log(dataset.length + " records found");
	var xScale = createScale(plotInfo.xScaleType, "x", dataset)
	var yScale = createScale(plotInfo.yScaleType, "y", dataset);

	var colorScale = d3.scale.linear()
		.domain([d3.min(dataset, function (d) { return d[3] }), d3.max(dataset, function (d) { return d[3] })])
		.range(["#87CEFF", "#0000FF"]);
		
	//set the slider to the correct min and max years
	updateSlider(
		d3.min(dataset, function (d) { return d[3] }), d3.max(dataset, function (d) { return d[3] })
		)
		
	//create both  axis
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
	if (plotInfo.xScaleType !== "ordinal") {
		xAxis.ticks(5).tickFormat(d3.format("s"))
	}
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
	if (plotInfo.yScaleType !== "ordinal") {
		yAxis.ticks(5).tickFormat(d3.format("s"));
	}
	else {
		leftPadding = 95;
		console.log("leftPadding = " + leftPadding);
	}
		
	//put the axis on the chart	
	svg.append("g")
		.attr("class", "axis")  //Assign "axis" class
		.attr("id", "xAxis")  //Assign "axis" id
		.attr("transform", "translate(0," + (h - bottomPadding) + ")")
		.call(xAxis);
	svg.append("g")
		.attr("class", "axis")
		.attr("id", "yAxis")  //Assign "axis" id
		.attr("transform", "translate(" + leftPadding + ",0)")
		.call(yAxis);
		
	//create the tooltip year	  
	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function (d) {
			var htmlTip;
			var xValue, yValue;
			if (!isNaN(d.x)) {
				xValue = d.x.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			if (!isNaN(d.y)) {
				yValue = d.y.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}

			htmlTip = "<div><span>" + d.country + " " + d.year + "</span></div>" +
			"<div><span>" + xAxisDatasetInfo.name + ": " + xValue + "</span></div>" +
			"<div><span>" + yAxisDatasetInfo.name + ": " + yValue + "</span></div>";
			if (d.destination) {
				htmlTip = htmlTip +
				"<div><span> Destination: " + d.destination + "</span></div>";
			}
			return htmlTip;
		});
	svg.call(tip);
		
	//add the data points
	svg.selectAll("path")
		.data(dataset)
		.enter()
		.append("path")
		.attr("id", function (d) {
			return d[0] + "-" + d[3];
		})
		.attr("class", "dataPoint")
		.attr("transform", function (d) { 
					
			// add the values to the arrays used to calculate correlations
			xArray.push(d[1]);
			yArray.push(d[2]);
			return "translate(" + xScale(d[1]) + "," + yScale(d[2]) + ")";
		})
		.attr("d", function (d) {
			//console.log(d[4]);
			return regions[d[4]]();
		})
		.style("fill", function (d) { return colorScale(d[3]) })
		.style("stroke", "#000000")
		.style("stroke-width", "1")
		.on('mouseover', tip.show)
		.on('mouseout', tip.hide)
		.datum(function (d) {
			var object = {
				country: d[0],
				x: d[1],
				y: d[2],
				year: d[3],
				region: d[4]
			}
					
			//distance plots include a destination location
			if (d[5]) {
				object.destination = d[5]
			}
			return object;
		});
			
	//add labels to the axes
	//X axis labels	
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (w / 2) + "," + (h - bottomPadding + 35) + ")")  // centre below axis
		.text(xAxisDatasetInfo.name);
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (w / 2) + "," + (h - bottomPadding + 50) + ")")  // centre below axis
		.text("(" + xAxisDatasetInfo.source + ")")
		.attr('class', 'axisAttribution');
	if (xAxisDatasetInfo.note) {
		svg.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate(" + (w / 2) + "," + (h - bottomPadding + 60) + ")")  // centre below axis
            .text("(" + xAxisDatasetInfo.note + ")")
			.attr('class', 'axisAttribution');
	}
		
	//Y axis labels
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (padding / 2) + "," + yAxisCenter + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text(yAxisDatasetInfo.name);
	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (padding / 2 + 15) + "," + yAxisCenter + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
		.text("(" + yAxisDatasetInfo.source + ")")
		.attr('class', 'axisAttribution');
	if (yAxisDatasetInfo.note) {
		svg.append("text")
			.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
			.attr("transform", "translate(" + (padding / 2 + 25) + "," + yAxisCenter + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
			.text("(" + yAxisDatasetInfo.note + ")")
			.attr('class', 'axisAttribution');
	}
			
	//create the symbol shape legend
	svg.append("g")
		.attr("class", "legendSymbol")
		.attr("transform", "translate(" + (padding) + "," + (h - bottomPadding + 75) + ")");

	var legendPath = d3.legend.symbol()
		.scale(symbolScale)
		.orient("horizontal")
		.shapePadding((w - 2 * padding) / 6)
	// .title("Shape Legend")
	// .on("cellclick", function (d) { alert("clicked " + d); });

	svg.select(".legendSymbol")
		.call(legendPath);

	svg.append("text")
		.attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
		.attr("transform", "translate(" + (w / 2) + "," + (h - 10) + ")")  // centre below axis
		.text("Darker color indicates most recent data");

	document.getElementById("pearsonCoefficient").innerHTML = (jStat.corrcoeff(xArray, yArray)).toFixed(3);
	document.getElementById("spearmanCoefficient").innerHTML = (jStat.spearmancoeff(xArray, yArray)).toFixed(3);
	p
}

postMessage({
	messageType: "complete",
	distancePlotData: data,
});
}