//TABLE MOST SUBSCRIBED DAILYTUBE CHANNEL START HERE//
function createTopSubscribedChart(data) {
    // Sort the data based on the "followers" column in descending order
    data.sort((a, b) => parseInt(b.followers) - parseInt(a.followers));

    // Select the top subscribed channel
    var topSubscribedChannel = data[0];

    // Create an SVG container for the chart with viewBox for responsiveness
    var svg = d3.select("#topSubscribedChart").append("svg")
        .attr("viewBox", "0 0 300 100")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .classed("svg-container", true)
        .style("font-size", "25px") ;


    // Calculate font sizes based on the container width
    var containerWidth = 500; // Adjust based on your container size
    var fontSizeChannelName = containerWidth * 0.05; // Example relative font size for channel name
    var fontSizeFollowerInfo = containerWidth * 0.05; // Example relative font size for follower information

    // Format the total followers
    var formattedTotalFollowers = (topSubscribedChannel.followers >= 1e12) ? (topSubscribedChannel.followers / 1e12).toFixed(1) + "T" :
                                 (topSubscribedChannel.followers >= 1e9) ? (topSubscribedChannel.followers / 1e9).toFixed(1) + "B" :
                                 (topSubscribedChannel.followers >= 1e6) ? (topSubscribedChannel.followers / 1e6).toFixed(1) + "M" :
                                 topSubscribedChannel.followers.toString();

    // Display the top subscribed channel and its total followers with responsive styling
    svg.append("text")
        .attr("x", 50)
        .attr("y", 50)
        .style("text-anchor", "center")
        .append("tspan")
            .attr("fill", "#776C5B") // Grey color for channel name
            .attr("font-weight", "bold") // Bold font for channel name
            .style("font-size", fontSizeChannelName + "px") // Responsive font size
            .text(topSubscribedChannel.ChannelName + ":" )
        .append("tspan")
            .attr("fill", "#CC935E") // Custom color for follower information
            .style("font-size", fontSizeFollowerInfo + "px") // Responsive font size
            .text(" " + formattedTotalFollowers);
}

// Load data and create chart
d3.csv("top_100_youtubers.csv").then(createTopSubscribedChart);
//TABLE MOST SUBSCRIBED DAILYTUBE CHANNEL ENDS HERE//

//--------------------------------------------------------------------------------------------//



