// PivotTable with Dropdown STARTS HERE//
d3.csv("top_100_youtubers.csv").then(function (data) {

    const initialWidth = 80; // Set to your initial width percentage
    const initialHeight = 80; // Set to your initial height percentage

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

    var table = d3.select("#pivotDropdownChartTable").append("table");

    // Append the header row with column names
    var header = table.append("thead").append("tr");
    Object.keys(countryCounts[0]).forEach(function (key) {
        header.append("th").text(key === "DailyTubers" ? "DailyTubers" : key);
    });

    // Create a linear color scale
    var colorScale = d3.scaleLinear()
        .domain([0, d3.max(countryCounts, function (d) { return d.DailyTubers; })])
        .range(['#FFED75', '#FFBC58']);

    // Populate the dropdown with unique country values for Chart 9
    var countryDropdownpivotDropdownChart = d3.select("#countryDropdownpivotDropdownChart");
    var uniqueCountriespivotDropdownChart = Array.from(countryCountMap.keys());
    countryDropdownpivotDropdownChart.selectAll("option")
        .data(uniqueCountriespivotDropdownChart)
        .enter()
        .append("option")
        .attr("value", function (d) { return d; })
        .text(function (d) { return d; });

    // Handle dropdown change event for Chart 9
    countryDropdownpivotDropdownChart.on("change", function () {
        var selectedCountrypivotDropdownChart = this.value;
        updateHeatmappivotDropdownChart(selectedCountrypivotDropdownChart);
    });

    // Initial heatmap rendering for Chart 9
    updateHeatmappivotDropdownChart(uniqueCountriespivotDropdownChart[0]);

    // Function to update the heatmap based on selected country for Chart 9
    function updateHeatmappivotDropdownChart(selectedCountrypivotDropdownChart) {
        // Remove existing tbody content
        table.select("tbody").remove();

        // Create a new tbody
        var tbody = table.append("tbody");

        var filteredData = countryCounts.filter(function (d) {
            return d.Country === selectedCountrypivotDropdownChart;
        });

        var rows = tbody.selectAll("tr")
            .data(filteredData)
            .enter()
            .append("tr");

        // Populate the rows with data
        rows.selectAll("td")
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
    }
//PivotTable with DROPDOWN ENDS HERE//

});