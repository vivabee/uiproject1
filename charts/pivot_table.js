//Pivot Table Chart START HERE //
const initialWidth = 50; // Set to your initial width percentage
const initialHeight = 50; // Set to your initial height percentage

function createpivotTableChartTable(data) {
    // Create a map to store the count of YouTubers per country
    var countryCountMap = new Map();

    // Count the number of YouTubers per country
    data.forEach(function (d) {
        var country = d.Country;
        if (countryCountMap.has(country)) {
            countryCountMap.set(country, countryCountMap.get(country) + 1);
        } else {
            countryCountMap.set(country, 1);
        }
    });

    // Convert the map to an array for easier table creation
    var countryCounts = Array.from(countryCountMap, ([country, count]) => ({ Country: country, DailyTubers: count }));

    // Sort the array based on the DailyTubers column in descending order
    countryCounts.sort((a, b) => b.DailyTubers - a.DailyTubers);

    // Display only the top 10 rows
    var top10CountryCounts = countryCounts.slice(0, 10);

    // Append an SVG container to the "pivotTableChart" div with a responsive viewbox
    var svgContainer = d3.select("#pivotTableChart").append("svg")
        .attr("viewBox", "0 0 " + initialWidth + " " + initialHeight)
        .attr("preserveAspectRatio", "xMinYMin meet")
        .classed("svg-container", true);

    var tableContainer = svgContainer.append("foreignObject")
        .attr("width", "100%")
        .attr("height", "100%")
        .append("xhtml:div")
        .classed("table-container", true);

    // Append a table to the table container
    var tablepivotTableChart = tableContainer.append("table");

    // Append the header row with column names
    var headerpivotTableChart = tablepivotTableChart.append("thead").append("tr");
    Object.keys(top10CountryCounts[0]).forEach(function (key) {
        headerpivotTableChart.append("th").text(key === "DailyTubers" ? "DailyTubers" : key);
    });

    // Create a linear color scale
    var colorScale = d3.scaleLinear()
        .domain([0, d3.max(top10CountryCounts, function (d) { return d.DailyTubers; })])
        .range(['#FFED75', '#FFBC58']);

    // Populate the rows with data
    var rowspivotTableChart = tablepivotTableChart.append("tbody")
    .selectAll("tr")
    .data(top10CountryCounts)
    .enter()
    .append("tr")
    .on("mouseover", function () {
        d3.select(this).style("background-color", "#CCA770"); // Change the background color on hover
    })
    .on("mouseout", function () {
        d3.select(this).style("background-color", null); // Restore the original background color
    });

// Populate the rows with data
rowspivotTableChart.selectAll("td")
    .data(function (d) { return Object.values(d); })
    .enter()
    .append("td")
    .text(function (d) { return d; })
    .classed("heatmap-cell", function (d, i) {
        // Apply heatmap class to the DailyTubers column
        return i === 1;
    })
    // Set background color for the DailyTubers column based on the color scale
    .style("background-color", function (d, i) {
        if (i === 1) {
            // Apply the linear color scale to the DailyTubers value
            return colorScale(d);
        }
        return null;
    });

    // Add a scrollbar to the table
    tablepivotTableChart.style("max-height", "400px");
    tablepivotTableChart.style("overflow-y", "auto");

    // Make the chart responsive
    function resize() {
        // Get the current dimensions of the container
        var containerWidth = window.innerWidth * (initialWidth / 100);
        var containerHeight = window.innerHeight * (initialHeight / 100);

        // Update the SVG container's viewBox
        svgContainer.attr("viewBox", "0 0 " + containerWidth + " " + containerHeight);
    }

    // Initial call to set dimensions
    resize();

    // Call resize function on window resize
    window.addEventListener("resize", resize);
}

d3.csv("top_100_youtubers.csv").then(createpivotTableChartTable);
