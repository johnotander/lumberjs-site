/*
  LUMBER.js

    Crafted with <3 by John Otander(@4lpine).
    MIT Licensed
 */

function hasLumberDependencies() {
  return "d3" in window &&
         "addEventListener" in window &&
         "querySelector" in document &&
         Array.prototype.forEach
}

var lumber = {}

/*
  getGraphs

    Select all the DOM elements with the class '.lumber'.

    Returns:
      Array of all DOM elements with the class '.lumber'.
 */
lumber.getGraphs = lumber_getGraphs;
function lumber_getGraphs() {
  return document.querySelectorAll(".lumber");
}

lumber.graph = lumber_graph;
function lumber_graph(chartDiv) {
  chartDiv = d3.select(chartDiv);

  lumberOpts.data   = chartDiv.attr("data-lumber-values").split(",");
  lumberOpts.width  = chartDiv.attr("data-lumber-width") || 500;
  lumberOpts.height = chartDiv.attr("data-lumber-height") || 250;
  lumberOpts.type   = chartDiv.attr("data-lumber-type") || "bar";
  lumberOpts.yAxis  = chartDiv.attr("data-lumber-y-axis-label") || "Y Axis";
  lumberOpts.xAxis  = chartDiv.attr("data-lumber-x-axis-label") || "X Axis";

  if (lumber.type == "bar")              { lumber.barChart(chartDiv, lumberOpts);    }
  else if (lumber.type == "pie")         { lumber.pieChart(chartDiv, lumberOpts);    }
  else if (lumber.type == "line")        { lumber.lineChart(chartDiv, lumberOpts);   }
  else if (lumber.type == "histogram")   { lumber.histogram(chartDiv, lumberOpts);   }
  else if (lumber.type == "scatterplot") { lumber.scatterplot(chartDiv, lumberOpts); }
}

/*
  barChart

    Create a lovely bar chart that is so beautiful no one will even care what
    the data even means.

    This will use the lumberOpts parameter to create a bar chart within the
    chartDiv. The chartDiv is assumed to be an svg DOM element.

    Params:
      chartDiv   = string for selection, for example "#chart" or ".lumber-chart"
      lumberOpts = options hash of information for creating the chart.

    Requirements (as keys in lumberOpts):
      type   = Specified by the lumber-type data attribute

      data   = The data is expected to be a data attribute with the form:
               'x1:y1,x2:y2,...,xn:yn'

      yAxis  = Utilizes the lumber-y-axis-label data attribute
      xAxis  = Utilizes the lumber-x-axis-label data attribute

      width  = Specified by the lumber-width data attribute
      height = Specified by the lumber-height data attribute

 */
lumber.barChart = lumber_barChart;
function lumber_barChart(chartDiv, lumberOpts) {
  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width  = lumberOpts.width - margin.left - margin.right,
      height = lumberOpts.height - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left").ticks(2, "%");

  x.domain(lumberOpts.data.map(function(d) { return d; }))
  y.domain([0, d3.max(lumberOpts.data, function(d) { return d; })])

  var chart = chartDiv
      .attr("width", lumberOpts.width)
      .attr("height", lumberOpts.height)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("y", 30)
      .attr("x", margin.left - 6)
      .attr("dx", ".71em")
      .style("text-anchor", "end")
      .text(lumberOpts.xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(lumberOpts.yAxis);

  chart.selectAll(".bar")
      .data(lumberOpts.data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d); })
      .attr("y", function(d) { return y(d); })
      .attr("height", function(d) { return height - y(d); })
      .attr("width", x.rangeBand());
}

lumber.pieChart = lumber_pieChart;
function lumber_pieChart(chartDiv, lumberOpts) {
  // ...
}

lumber.lineChart = lumber_lineChart;
function lumber_lineChart(chartDiv, lumberOpts) {
  // ...
}

lumber.histogram = lumber_histogram;
function lumber_histogram(chartDiv, lumberOpts) {
  // ...
}

lumber.scatterplot = lumber_scatterplot;
function lumber_scatterplot(chartDiv, lumberOpts) {
  // ...
}

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

if (!hasLumberDependencies()) {
  console.log("Missing dependencies for lumber.js.");
}
