// Load data from CSV file
d3.csv("top_100_youtubers.csv").then(function(data) {
  // Convert followers to numeric values
  data.forEach(function(d) {
      d.followers = +d.followers;
  });

  // Sort the data by followers in descending order
  data.sort(function(a, b) {
      return b.followers - a.followers;
  });

  // Set up the chart dimensions
  const margin = { top: 20, right: 20, bottom: 60, left: 150 };
  const width = 800;
  const height = 400;

  // Create the SVG container with viewBox for responsiveness
  const svg = d3.select("#horizontalBarChart").append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      
  // Set up the x and y scales
  const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.followers)])
      .range([0, width]);

  const yScale = d3.scaleBand()
      .domain(data.map(d => d.Category))
      .range([0, height])
      .padding(0.10); // Adjust the padding for reduced spacing

  // Add horizontal bars
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("width", d => xScale(d.followers))
      .attr("height", yScale.bandwidth())
      .attr("y", d => yScale(d.Category))
      .attr("fill", "#FFBC58")
      .on("mouseover", function(d) {
          tooltip.transition()
              .duration(200)
              .style("opacity", 0.9);
          tooltip.html(formatFollowers(d.followers))
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY - 20) + "px");
      })
      .on("mouseout", function() {
          tooltip.transition()
              .duration(500)
              .style("opacity", 0);
      });

  // Add x-axis with custom tick format
  svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "20px")
      .call(d3.axisBottom(xScale).tickFormat(d => formatTicks(d)));

  // Add y-axis
  svg.append("g")
      .attr("class", "y-axis")
      .style("font-size", "20px")
      .call(d3.axisLeft(yScale));

  // Add x-axis label
  svg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(" + (width / 2) + "," + (height + margin.top + 40) + ")")
      .text("Followers");
   

  // Add y-axis label
  svg.append("text")
      .attr("class", "axis-label")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 10)
      .attr("x", -height / 2)
      .text("Category");

  // Add tooltips
  const tooltip = d3.select("#horizontalBarChart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  // Function to format x-axis ticks
  function formatTicks(value) {
      if (value === 0) return "0";
      else if (value < 5e8) return (value / 1e6) + "M";
      else return (value / 1e9) + "B";
  }

  // Function to format followers in the tooltip
  function formatFollowers(followers) {
      if (followers < 1e9) return (followers / 1e6) + "M";
      else return (followers / 1e9) + "B";
  }
});