// Load data from CSV file
d3.csv("top_100_youtubers.csv").then(function (data) {
    // Convert followers to numeric values
    data.forEach(function (d) {
        d.followers = +d.followers;
    });

    // Aggregate data by category and sum followers
    const aggregatedData = {};
    data.forEach(function (d) {
        if (!aggregatedData[d.Category]) {
            aggregatedData[d.Category] = 0;
        }
        aggregatedData[d.Category] += d.followers;
    });

    // Convert aggregatedData back into an array of objects
    const aggregatedArray = Object.keys(aggregatedData).map(function (category) {
        return { Category: category, followers: aggregatedData[category] };
    });

    // Sort aggregated data by summed followers in descending order
    aggregatedArray.sort((a, b) => b.followers - a.followers);

    // Set up the chart dimensions
    const margin = { top: 50, right: 20, bottom: 150, left: 160 };
    const width = 1000;
    const height = 800;

    // Create the SVG container with viewBox for responsiveness
    const svg = d3.select("#horizontalBarChart").append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the xScale
    const maxFollowers = d3.max(aggregatedArray, d => d.followers);
    const maxFollowersRoundedUp = Math.ceil(maxFollowers / 5e8) * 5e8;
    const xScale = d3.scaleLinear()
        .domain([0, maxFollowersRoundedUp])
        .range([0, width])
        .nice();

    const yScale = d3.scaleBand()
        .domain(aggregatedArray.map(d => d.Category))
        .range([0, height])
        .padding(0.1);

    // Add horizontal bars
    svg.selectAll(".bar")
        .data(aggregatedArray)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("y", d => yScale(d.Category))
        .attr("width", d => xScale(d.followers))
        .attr("height", yScale.bandwidth())
        .attr("fill", "#FFBC58")
        .on("mouseover", function (d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
            tooltip.html(formatValue(d.followers))
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    // Add y-axis
    svg.append("g")
        .attr("class", "y-axis")
        .style("font-size", "20px")
        .call(d3.axisLeft(yScale).tickPadding(-2));

    // Add x-axis with custom tick format
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .style("font-size", "20px")
        .call(d3.axisBottom(xScale).tickValues(generateTicks()).tickFormat(d => formatTicks(d)));


    // Add x-axis label
    svg.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width / 2) + "," + (height + margin.top + 40) + ")")
        .text("Followers");

    // Add tooltips
    const tooltip = d3.select("#horizontalBarChart")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Function to generate ticks
    function generateTicks() {
        const maxFollowers = d3.max(aggregatedArray, d => d.followers);
        const maxFollowersRoundedUp = Math.ceil(maxFollowers / 5e8) * 5e8; // Round up to the nearest 500M
        const numTicks = maxFollowersRoundedUp / 5e8; // Calculate number of ticks
        return d3.range(0, maxFollowersRoundedUp + 1, 5e8); // Generate ticks at 500M increments
    }

    // Function to format x-axis ticks
    function formatTicks(value) {
        if (value === 0) return "0";
        else if (value === 5e8) return "500M"; // Show 500M instead of 0.5B for the first tick
        else return (value / 1e9) + "B";
    }

    // Function to format value in the tooltip
    function formatValue(value) {
        if (Math.abs(value) >= 1.0e9) {
            return (value / 1.0e9).toFixed(1) + "B";
        } else if (Math.abs(value) >= 1.0e6) {
            return (value / 1.0e6).toFixed(1) + "M";
        } else {
            return value.toFixed(0);
        }
    }
});