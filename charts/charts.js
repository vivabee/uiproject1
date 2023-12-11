//TOGGLE FUNCTIONS//
//Radio Button //
document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to radio buttons
    var radioButtons = document.querySelectorAll('input[name="chartType"]');
    radioButtons.forEach(function (radio) {
        radio.addEventListener('change', function () {
            var selectedValue = this.value;
            toggleCharts(selectedValue);
        });
    });

    // Function to toggle between scatter plot and bubble chart
    function toggleCharts(chartType) {
        if (chartType === 'scatter') {
            document.getElementById('pivotTableChart').style.display = 'block';
            document.getElementById('verticalBarChart').style.display = 'none';
        } else if (chartType === 'bubble') {
            document.getElementById('pivotTableChart').style.display = 'none';
            document.getElementById('verticalBarChart').style.display = 'block';
        }
    }
});
//------------------//
// Button Toggle //
function showChart(chartType) {
    // Hide all chart containers
    document.getElementById('pieChartContainer').style.display = 'none';
    document.getElementById('donutChartContainer').style.display = 'none';

    // Show the selected chart container
    document.getElementById(chartType).style.display = 'block';
}


//SCOREBOARD STARTS HERE//

d3.csv("top_100_youtubers.csv").then(function (data) {
    // Function to format a number in a human-readable format
    function flipScorecard(scorecard) {
        scorecard.transition()
            .duration(500)
            .style("transform", "rotateY(360deg)")
            .on("end", function () {
                d3.select(this)
                    .classed("scorecard-flip", true)
                    .on("mouseout", function () {
                        // Flip back to the original state when the mouse is out
                        d3.select(this)
                            .transition()
                            .duration(500)
                            .style("transform", "rotateY(0deg)")
                            .on("end", function () {
                                d3.select(this).classed("scorecard-flip", false);
                            });
                    });
            });
    }

    // Calculate the total views, total likes, total followers, and average engagement rate
    var totalViews = d3.sum(data, function (d) { return parseInt(d.Views); });
    var totalLikes = d3.sum(data, function (d) { return parseInt(d.Likes); });
    var totalFollowers = d3.sum(data, function (d) { return parseInt(d.followers); });

    // Directly calculate the engagement rates without checking for "EngagementRate" column
    var engagementRates = data.map(function (d) { return parseFloat(d.EngagementRate); });

    // Calculate the average engagement rate
    var averageEngagementRate = d3.mean(engagementRates);

    // Format the total views, total likes, total followers, and average engagement rate
    var formattedTotalViews = (totalViews >= 1e12) ? (totalViews / 1e12).toFixed(1) + "T" :
        (totalViews >= 1e9) ? (totalViews / 1e9).toFixed(1) + "B" :
            (totalViews >= 1e6) ? (totalViews / 1e6).toFixed(1) + "M" :
                totalViews.toString();

    var formattedTotalLikes = (totalLikes >= 1e12) ? (totalLikes / 1e12).toFixed(1) + "T" :
        (totalLikes >= 1e9) ? (totalLikes / 1e9).toFixed(1) + "B" :
            (totalLikes >= 1e6) ? (totalLikes / 1e6).toFixed(1) + "M" :
                totalLikes.toString();

    var formattedTotalFollowers = (totalFollowers >= 1e12) ? (totalFollowers / 1e12).toFixed(1) + "T" :
        (totalFollowers >= 1e9) ? (totalFollowers / 1e9).toFixed(1) + "B" :
            (totalFollowers >= 1e6) ? (totalFollowers / 1e6).toFixed(1) + "M" :
                totalFollowers.toString();

    var formattedAverageEngagementRate = averageEngagementRate.toFixed(2) + "%";

    // Append scorecards to the scorecard container
    var scorecardContainer = d3.select(".scorecard-container");

    // Add total views scorecard
    var totalViewsCard = scorecardContainer.append("div").classed("scorecard", true);
    totalViewsCard.append("div").classed("scorecard-label", true).text("Views");
    totalViewsCard.append("div").classed("score", true).text(formattedTotalViews);

    // Add total likes scorecard
    var totalLikesCard = scorecardContainer.append("div").classed("scorecard", true);
    totalLikesCard.append("div").classed("scorecard-label", true).text("Likes");
    totalLikesCard.append("div").classed("score", true).text(formattedTotalLikes);

    // Add total followers scorecard
    var totalFollowersCard = scorecardContainer.append("div").classed("scorecard", true);
    totalFollowersCard.append("div").classed("scorecard-label", true).text("Followers");
    totalFollowersCard.append("div").classed("score", true).text(formattedTotalFollowers);

    // Add average engagement rate scorecard
    var averageEngagementRateCard = scorecardContainer.append("div").classed("scorecard", true);
    averageEngagementRateCard.append("div").classed("scorecard-label", true).text("Engagement Rate");
    averageEngagementRateCard.append("div").classed("score", true).text(formattedAverageEngagementRate);

    // Add flip animation to all scorecards onload
    d3.selectAll(".scorecard").each(function () {
        flipScorecard(d3.select(this));
    });

});

//SCOREBOARD ENDS HERE//

