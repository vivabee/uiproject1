//PIE CHART STARTS HERE//
// Function to create the pie chart
function createPieChart(data) {
    // Fixed width for the chart
    const width = 800;
    const height = 400; // Set a fixed height for the chart
    const radius = Math.min(width, height) / 2;

    // Colors based on the specified scheme
    const colors = [
        "#FFBC58", "#947359", "#CC935E", "#FFED75",
        "#FC9765", "#D1BE9F", "#FFE5BB"
    ];

    // Create an SVG element within the existing pieChartContainer
    var svg = d3.select("#pieChartContainer")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Group data by category
    var categories = d3.nest()
        .key(function(d) { return d.Category; })
        .entries(data);

    // Create a pie chart layout
    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.values.length; });

    // Create an arc generator
    var arc = d3.arc()
        .innerRadius(0) // For pie chart, inner radius is 0
        .outerRadius(radius);

    // Generate the pie chart
    var path = svg.selectAll("path")
        .data(pie(categories))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function(_, i) { return colors[i % colors.length]; });

     // Add ticks and tick labels
     var outerRadius = radius - 25; // Adjust the outer radius for ticks
    var ticks = svg.selectAll("g")
        .data(pie(categories))
        .enter()
        .append("g");

    ticks.append("line")
        .attr("x1", 0)
        .attr("y1", -outerRadius)
        .attr("x2", 0)
        .attr("y2", -outerRadius + 10)
        .attr("stroke", "black");

    ticks.append("text")
        .filter(function(d) {
            // Filter out categories with a percentage less than 3%
            var percentage = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
            return percentage >= 3;
        })
        .attr("transform", function (d) {
            var angle = (d.startAngle + d.endAngle) / 2;
            var x = Math.sin(angle) * outerRadius * 0.9; // Adjust the position of labels
            var y = -Math.cos(angle) * outerRadius * 0.9; // Adjust the position of labels
            return "translate(" + x + "," + y + ")";
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
            var percentage = ((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100;
            return percentage.toFixed(1) + "%";
        });

    // Legends and text styling
    const legend = svg.append("g")
        .attr("transform", `translate(${radius + 20}, -${radius})`)
        .selectAll("g")
        .data(categories.map(d => d.key))
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (_, i) => `translate(0, ${i * 20})`);

    const legendWidth = 18;
    const legendHeight = 18;

    legend.append("rect")
        .attr("x", 0)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("fill", (_, i) => colors[i % colors.length]);

    legend.append("text")
        .attr("x", legendWidth + 5)
        .attr("y", legendHeight / 2)
        .attr("dy", "0.35em")
        .text(d => d)
        .style("font-size", "12px");

    // Add an optional outline to the legend box for better visibility
    legend.append("rect")
        .attr("x", 0)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "none");
}

// Fetch data from CSV and create the pie chart
d3.csv("top_100_youtubers.csv").then(function(data) {
    createPieChart(data);
}).catch(function(error) {
    // Handle error loading data
    console.error("Error loading data:", error);
});

//PIE Chart ENDS HERE //
//--------------------------------------------------------------------------------------------//

