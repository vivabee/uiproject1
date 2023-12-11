d3.csv("top_100_youtubers.csv").then(function (data) {
    // Create an object to store counts for each country
    const countryCounts = {};

    // Count occurrences of each country
    data.forEach(function (d) {
        const country = d.Country;
        if (countryCounts[country]) {
            countryCounts[country]++;
        } else {
            countryCounts[country] = 1;
        }
    });

    // Convert counts to an array of objects
    const countsArray = Object.keys(countryCounts).map(country => ({
        country: country,
        count: countryCounts[country]
    }));

    // Sort the countsArray in descending order based on count
    countsArray.sort((a, b) => b.count - a.count);

    // Take only the first 10 elements
    const top10Countries = countsArray.slice(0, 10);

    // Create the chart using top10Countries instead of countsArray
    const svg = d3.select("#verticalBarChart")
        .append("svg")
        .attr("width", 800)
        .attr("height", 600);
        
    const margin = { top: 20, right: 20, bottom: 30, left: 80 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Define graph title
    svg.append("text")
        .attr("x", width / 2 + margin.left)
        .attr("y", margin.top * 0.6)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")

    // Define left axis title
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left * 0.4)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Number of DailyTubers");

    // Define x axis title
    svg.append("text")
        .attr("x", width / 2 + margin.left)
        .attr("y", height + margin.top)
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .text("Country");

    // Define the handleBarClick function
    function handleBarClick(d) {
        const clickedBar = d3.select(this);
        const clickedCountry = d.country;

        // Set opacity for clicked bar to full visibility
        clickedBar.attr("opacity", 1);

        // Reduce opacity for all other bars except the clicked one
        svg.selectAll(".bar")
            .filter(barData => barData.country !== clickedCountry)
            .attr("opacity", 0.5);
    }

    svg.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const x = d3.scaleBand()
        .range([margin.left, width - margin.right])
        .domain(top10Countries.map(d => d.country))
        .padding(0.2);

    const y = d3.scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0, d3.max(countsArray, d => d.count) + 10]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(0)")
        .style("text-anchor", "middle");

    // Create the y-axis with custom ticks and hide the axis line
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5))
        .select(".domain").remove(); // Remove the y-axis line

    // Create the bar chart using top10Countries
    svg.selectAll(".bar")
        .data(top10Countries)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.country))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.bottom - y(d.count))
        .attr("fill", "#FFBC58")
        .on("mouseover", function (d) {
            d3.select(this)
                .attr("stroke", "lightgray")
                .attr("stroke-width", "2px");
            tooltip.style("opacity", 1)
                .html(`Count: ${d.count}`)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("stroke", "none");
            tooltip.style("opacity", 0);
        })
        .on("click", handleBarClick);

    // Reset opacity when clicking off bars
    svg.on("click", function () {
        const isBarClicked = d3.event.target.classList.contains("bar");

        if (!isBarClicked) {
            svg.selectAll(".bar").attr("opacity", 1);
        }
    });

    // Add tooltip
    const tooltip = d3.select("#verticalBarChart")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
}).catch(function (error) {
    console.log(error); // Log any potential errors in loading the data
});