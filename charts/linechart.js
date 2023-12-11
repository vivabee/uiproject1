// ----- Line Chart -----

const linemargin = { top: 60, right: 30, bottom: 20, left: 30 };
const linewidth = 800
const lineheight = 400

const svgLine = d3.select("#linechart")
    .append("svg")
    .attr("width", "100%") // Make the width 100%
    .attr("height", "100%") // Make the height 100%
    .attr('viewBox', `0 0 ${linewidth + linemargin.left + linemargin.right} ${lineheight + linemargin.top + linemargin.bottom}`) // Set viewBox for preserving aspect ratio
    .attr('preserveAspectRatio', 'xMinYMin') // Preserve aspect ratio
    .append("g")
    .attr("transform", `translate(${linemargin.left},${linemargin.top})`);

d3.csv("avg_view_every_year.csv").then(data => {
    data.forEach(d => {
        d.Year = +d.Year;
        Object.keys(d).slice(1).forEach(channel => {
            d[channel] = +d[channel];
        });
    });

    const x = d3.scaleLinear().domain([d3.min(data, d => d.Year), d3.max(data, d => d.Year)]).range([0, linewidth]);
    const y = d3.scaleLinear().domain([0, 60000000]).range([lineheight, 0]);

    const line = d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.Value));

    const color = d3.scaleOrdinal()
        .domain(Object.keys(data[0]).slice(1))
        .range(["#FFBC58", "#947359", "#CC935E", "#776C5B", "#FC9765"]);

    const brush = d3.brushX()
        .extent([[0, 0], [linewidth, lineheight]])
        .on("end", brushed);

    svgLine.append("g")
        .call(brush);

    // Function brushed
    function brushed(event) {
        if (event && event.selection) {
            const selectedYears = event.selection.map(x.invert);

            // Update the style of the selected data
            Object.keys(data[0]).slice(1).forEach(channel => {
                svgLine.selectAll(`.${channel}-line`)
                    .style("stroke", d => (d.Year >= selectedYears[0] && d.Year <= selectedYears[1]) ? "red" : color(channel));
            });
        }
    }


    Object.keys(data[0]).slice(1).forEach(channel => {
        svgLine.append("path")
            .data([data])
            .attr("class", `${channel}-line`)
            .style("stroke", color(channel))
            .style("fill", "none")
            .style("stroke-width", 2)
            .style("stroke-dasharray", "5,5")
            .attr("d", line.y(d => y(d[channel])).defined(d => !isNaN(d[channel])));

        svgLine.selectAll(`.${channel}-label`)
            .data(data)
            .enter().append("text")
            .attr("class", `${channel}-label`)
            .attr("x", d => x(d.Year))
            .attr("y", d => y(d[channel]))
            .text(d => d3.format(".2s")(d[channel]))
            .attr("dy", -10)
            .attr("text-anchor", "middle")
            .style("fill", color(channel));

        svgLine.selectAll(`.${channel}-circle`)
            .data(data)
            .enter().append("circle")
            .attr("class", `${channel}-circle`)
            .attr("cx", d => x(d.Year))
            .attr("cy", d => y(d[channel]))
            .attr("r", 4)
            .style("fill", color(channel))
            .style("stroke", "#fff")
            .style("stroke-width", 2)
            .on("mouseover", function (event, d) {
                d3.select(this).append("title")
                    .text(`${d.Year}: ${d3.format(".2s")(d[channel])}`);
            })
            .on("mouseout", function () {
                d3.select(this).select("title").remove();
            });
    });

    svgLine.append("g")
        .attr("transform", `translate(0, ${lineheight})`)
        .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format("d")));

    svgLine.append("g")
        .call(d3.axisLeft(y).tickValues([0, 20000000, 40000000, 60000000]).tickFormat(d3.format(".2s")))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Views");

    // Add legend
    const legend = svgLine.append("g")
        .attr("transform", `translate(0, -20)`)
        .selectAll("g")
        .data(Object.keys(data[0]).slice(1).reverse())
        .enter().append("g")
        .attr("transform", (d, i) => `translate(${i * 150}, 0)`);

    // Use a circle and line in the legend
    const legendRadius = 4;  // Set the radius of the circle

    legend.append("circle")
        .attr("cx", legendRadius)
        .attr("cy", legendRadius)
        .attr("r", legendRadius)
        .attr("fill", color);

    legend.append("line")
        .attr("x1", legendRadius * -2) // Move the line to the right of the circle
        .attr("y1", legendRadius)
        .attr("x2", legendRadius * 4) // Adjust the length of the line
        .attr("y2", legendRadius)
        .style("stroke", color)
        .style("stroke-width", 2);

    legend.append("text")
        .attr("x", legendRadius * 3 + 5) // Adjust the position of the text
        .attr("y", legendRadius)
        .attr("dy", ".35em")
        .text(d => d);
});