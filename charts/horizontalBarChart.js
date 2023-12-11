
let previouslyClickedBar = null;
    d3.csv("top_100_youtubers.csv").then(function (data) {
      // Data processing
      data.forEach(function(d) {
        d.followers = +d.followers; // Convert Followers to a numeric value
      });

      // Object to store follower counts for each category
      const categoryfollowers = {};

      // Calculating follower counts for each category
      data.forEach(function(d) {
        if(categoryfollowers[d.Category]) {
          categoryfollowers[d.Category] += d.followers;
        } else {
          categoryfollowers[d.Category] = d.followers;
        }
      });

    // Sort categories based on total follower count in descending order
const sortedCategories = Object.keys(categoryfollowers).sort((a, b) => categoryfollowers[b] - categoryfollowers[a]);

function handleBarClick(d) {
  const clickedBar = d3.select(this);
  const isClicked = clickedBar.attr("opacity") === "1";

  // If the clicked bar is not already selected
  if (!isClicked) {
    // Reset opacity of the previously clicked bar to 1 (if exists)
    if (previouslyClickedBar && previouslyClickedBar !== clickedBar) {
      previouslyClickedBar.attr("opacity", 1);
    }

    // Reset opacity of all bars to 0.3
    bars.attr("opacity", 0.3);

    // Highlight the clicked bar
    clickedBar.attr("opacity", 1);

    // Update the reference to the previously clicked bar
    previouslyClickedBar = clickedBar;
  } else {
    // If the clicked bar is already selected, deselect it
    clickedBar.attr("opacity", 0.3);
    previouslyClickedBar = null; // Reset the previously clicked bar reference
  }
}


      // Logging the follower counts per category
      console.log(categoryfollowers);

      const legendWidth = 100; // Width reserved for the legend

      const width = 800;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 50, left: 120 };

      // Create the SVG for the graph area
      const svg = d3.select("#bar-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Define a separate SVG for the legend
      const legendSvg = d3.select("#bar-chart")
  .append("svg")
  .attr("width", legendWidth + margin.left + margin.right) // Adjust width as needed
  .attr("height", height);

      // Append the graph to its SVG group
      const graph = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // Append the legend to its SVG group
      const legend = legendSvg.append("g")
        .attr("transform", `translate(0, -500)`); // Adjust as needed

        const xScale = d3.scaleLinear()
  .domain([0, d3.max(Object.values(categoryfollowers))])
  .range([margin.left, width - margin.right]);
  // Calculate the maximum value for the x-axis scale (rounded up to the nearest 500 million)
const maxXValue = Math.ceil(d3.max(Object.values(categoryfollowers)) / 500e6) * 500e6;

// Adjust the x-axis scale domain to start from 0 and increment by 500 million
xScale.domain([0, maxXValue]);

const yScale = d3.scaleBand()
  .domain(sortedCategories) // Set domain using sorted category names
  .range([margin.top, height - margin.bottom])
  .padding(0.1);

      const tooltip = d3.select("#bar-chart")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "1px solid black")
        .style("padding", "5px");

        // Define a custom formatter function for the axis ticks
const customFormat = (value) => {
  const format = d3.format(".2s");
  const formatted = format(value);
  
  // Replace "G" with "B" if the formatted value contains "G"
  return formatted.includes("G") ? formatted.replace("G", "B") : formatted;
};

// Apply the custom formatter to the x-axis ticks
const xAxis = d3.axisBottom(xScale)
  .tickFormat(customFormat);



  const legendPadding = 5; // Padding around the legend text

const bars = svg.selectAll("rect")
  .data(sortedCategories)
  .enter()
  .append("rect")
  .attr("x", xScale(0))
  .attr("y", d => yScale(d))
  .attr("width", d => xScale(categoryfollowers[d]) - xScale(0))
  .attr("height", yScale.bandwidth())
  .attr("fill", "#FFBC58")
  .on("mouseover", function (event, d) {
    d3.select(this).attr("stroke", "lightgray").attr("stroke-width", 2);
    tooltip.style("visibility", "visible")
      .html(`<strong>${d}</strong><br/>followers: ${categoryfollowers[d]}`);
  })
  .on("mousemove", function (event) {
    tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
  })
  .on("mouseout", function () {
    d3.select(this).attr("stroke-width", 0);
    tooltip.style("visibility", "hidden");
  })
  .classed("bar", true) // Add a class to identify bars
  .on("click", handleBarClick);

// Reset opacity when clicking off bars
d3.select("body").on("click", function (event) {
  const isBarClicked = (event && event.target && event.target.classList.contains("bar"));

  if (!isBarClicked) {
    bars.attr("opacity", 1);
  }
});

// Create a rectangle as a symbol for the bars
legend.append("rect")
  .attr("x", 0)
  .attr("y", legendPadding - 8) // Adjust the positioning to align with text
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", "#FFBC58") // Assuming this is the color of your bars

legend.append("text")
  .attr("x", 15) // Position the text after the rectangle symbol
  .attr("y", legendPadding)
  .text("Followers")
  .style("font-size", "12px")
  .style("fill", "black");


      svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(xScale).tickFormat(d3.format(".2s")).ticks(5))
  .call(xAxis);

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

      svg.append("text")
        .attr("transform", `translate(${width / 2},${height - 10})`)
        .style("text-anchor", "middle")
        .text("Followers");

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Category");
    }).catch(function(error) {
      console.log(error); // Log any potential errors in loading the data
    });