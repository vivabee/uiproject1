// Stacked Chart
// set the dimensions and margins of the graph

var margin = { top: 60, right: 10, bottom: 60, left: 50 }, // Increased bottom margin
  width = 600,
  height = 400;

// Read the CSV file and create the stacked bar chart
d3.csv('top_100_youtubers.csv', function (d, i, columns) {
  var q1 = Number(d["Income q1"]);
  var q2 = Number(d["Income q2"]);
  var q3 = Number(d["Income q3"]);
  var q4 = Number(d["Income q4"]);
  return {
    ChannelName: d.ChannelName,
    "Income q1": q1,
    "Income q2": q2,
    "Income q3": q3,
    "Income q4": q4,
    Total: q1 + q2 + q3 + q4
  }
}).then(function (data) {

  // Filter and sort the data to get the top 5 YouTube channels
  var topChannels = d3.nest()
    .key(function (d) { return d.ChannelName; })
    .rollup(function (values) {
      return {
        "Income q1": d3.sum(values, function (d) { return d["Income q1"]; }),
        "Income q2": d3.sum(values, function (d) { return d["Income q2"]; }),
        "Income q3": d3.sum(values, function (d) { return d["Income q3"]; }),
        "Income q4": d3.sum(values, function (d) { return d["Income q4"]; }),
        Total: d3.sum(values, function (d) { return d.Total })
      };
    })
    .entries(data)
    .map(function (d, i) {
      return {
        ChannelName: d.key,
        "Income q1": d.value["Income q1"],
        "Income q2": d.value["Income q2"],
        "Income q3": d.value["Income q3"],
        "Income q4": d.value["Income q4"],
        Total: d.value.Total,
      }
    }).sort(function (a, b) {
      return b.Total - a.Total;
    })
    .slice(0, 5);

  var keys = ["Income q1", "Income q2", "Income q3", "Income q4"];

  // Create scales for x-axis and y-axis
  var xScale = d3.scaleBand()
    .domain(topChannels.map(function (d) { return d.ChannelName; }))
    .range([0, width])
    .padding(0.1);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(topChannels, function (d) {
      return d.Total;
    })])
    .range([height, 0]);

  // Create the color scale
  var colorScale = d3.scaleOrdinal()
    .domain(['q1', 'q2', 'q3', 'q4'])
    .range(["#FFBC58", "#947359", "#CC935E", "#FC9765"]);

  // Create the stacked bar chart
  var svg = d3.select('#stackedchart').append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr('preserveAspectRatio', 'xMinYMin')
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Create a tooltip element
  var tooltip = d3.select("body").append("div")
    .attr("class", "tooltipstacked")
    .style("position", "absolute")
    .style("visibility", "hidden");

  var rects = svg.selectAll('g')
    .data(d3.stack().keys(keys)(topChannels))
    .enter().append('g');

  rects
    //.attr('transform', function (d) { console.log(d); return 'translate(' + xScale(d.key) + ',' + 0 + ')'; })
    .attr('fill', function (d) { return colorScale(d.key); })
    .selectAll('rect')
    .data(function (d) {
      for (var i = 0; i < d.length; i++)
        d[i].index = d.index;
      return d;
    })
    .enter().append('rect')
    .attr('x', function (d) { return xScale(d.data.ChannelName); })
    .attr('y', function (d) { return yScale(d[1]); })
    .attr('width', xScale.bandwidth())
    .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]); })
    .attr('class', function (d, i, node) {
      return 'rect group' + d.index;
    })
    .on("mouseover", function (d, i, node) {
      // Show income value on hover
      var incomeValue = d.data.ChannelName + " " + d3.format("$.2s")(d[1]);
      tooltip.text(incomeValue)
        .style('visibility', 'visible')
        .style('left', (d3.event.pageX + 10) + 'px')
        .style('top', (d3.event.pageY - 15) + 'px');
    })
    .on("mouseout", function () {
      tooltip.style('visibility', 'hidden');
    });

  var texts = svg.selectAll('.rect-text')
    .data(d3.stack().keys(keys)(topChannels));
  rects.selectAll('text')
    .data(function (d) { return d; })
    .enter()
    .append('text')
    .text(function (d) { return d3.format("$.2s")(d[1]); })
    .attr('x', function (d) { return xScale(d.data.ChannelName) + xScale.bandwidth() / 2; })
    .attr('y', function (d) { return yScale(d[1]) + (yScale(d[0]) - yScale(d[1])) / 2; })
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "central")
    .attr("fill", '#fff');

  // Add x-axis with rotated labels
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '.15em')
    .attr('transform', 'rotate(-45)');

  // Add y-axis with more ticks
  svg.append('g')
    .call(d3.axisLeft(yScale).ticks(10).tickFormat(d3.format("$.2s")));

  // Add Legend
  var legend = svg.append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + (width / 2 - 2 * 100) + ', -50)');

  legend.selectAll('rect')
    .data(keys)
    .enter().append('rect')
    .attr('x', function (d, i) { return i * 100; })
    .attr('y', 0)
    .attr('width', 18)
    .attr('height', 18)
    .attr('fill', colorScale)
    .on("mouseover", function (d, i, node) {
      var selector = '.group' + i;
      d3.selectAll(".rect").transition()
        .style("opacity", 0.3);
      d3.selectAll(selector).transition()
        .style("opacity", 1);
    })
    .on("mouseout", function () {
      tooltip.style('visibility', 'hidden');
      d3.selectAll(".rect").transition()
        .style("opacity", 1);
    });

  legend.selectAll('text')
    .data(['Income q1', 'Income q2', 'Income q3', 'Income q4'])
    .enter().append('text')
    .attr('x', function (d, i) { return 20 + i * 100; })
    .attr('y', 9)
    .attr('dy', '.35em')
    .style('text-anchor', 'start')
    .text(function (d) {
      return d;
    });

});
