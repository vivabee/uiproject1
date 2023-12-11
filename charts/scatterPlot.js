var data = [
    { Country: 'IN', ChannelName: 'T-Series', Followers: 220000000, Likes: 1602680172 },
    { Country: 'US', ChannelName: 'ABCkidTV - Nursery Rhymes', Followers: 138000000, Likes: 220990134.6 },
    { Country: 'IN', ChannelName: 'SET India', Followers: 137000000, Likes: 174875242.6 },
    { Country: 'US', ChannelName: 'PewDiePie', Followers: 111000000, Likes: 2191405542 },
    { Country: 'US', ChannelName: 'MrBeast', Followers: 98100000, Likes: 1731833461 },
    { Country: 'US', ChannelName: 'Like Nastya', Followers: 97300000, Likes: 280877652.4 },
    { Country: 'US', ChannelName: '✿ Kids Diana Show', Followers: 97200000, Likes: 235190437.5 },
    { Country: 'US', ChannelName: 'WWE', Followers: 89400000, Likes: 543800874.3 },
    { Country: 'IN', ChannelName: 'Zee Music Company', Followers: 85500000, Likes: 210395355.3 },
    { Country: 'US', ChannelName: 'Vlad and Niki', Followers: 83500000, Likes: 146245435.4 },
    { Country: 'US', ChannelName: '5-Minute Crafts', Followers: 77000000, Likes: 158230212.5 },
    { Country: 'KR', ChannelName: 'BLACKPINK', Followers: 75100000, Likes: 617573972 },
    { Country: 'IN', ChannelName: 'Goldmines Telefilms', Followers: 72000000, Likes: 63642295.56 },
    { Country: 'CA', ChannelName: 'Justin Bieber', Followers: 69400000, Likes: 39350061.94 },
    { Country: 'IN', ChannelName: 'SAB TV', Followers: 69300000, Likes: 109283010.7 },
    { Country: 'US', ChannelName: 'BANGTANTV', Followers: 69100000, Likes: 1640737553 },
    { Country: 'KR', ChannelName: 'ibighit', Followers: 67300000, Likes: 636497162.1 },
    { Country: 'BR', ChannelName: 'Canal KondZilla', Followers: 65800000, Likes: 116511691.1 },
    { Country: 'IN', ChannelName: 'zeetv', Followers: 62100000, Likes: 37475050.79 },
    { Country: 'IN', ChannelName: 'Shemaroo Filmi Gaane', Followers: 60700000, Likes: 12480195.26 },
    { Country: 'US', ChannelName: 'Pinkfong Baby Shark - Kids\' Songs & Stories', Followers: 58700000, Likes: 17219955 },
    { Country: 'US', ChannelName: 'Dude Perfect', Followers: 57800000, Likes: 244293352.9 },
    { Country: 'US', ChannelName: 'Movieclips', Followers: 57300000, Likes: 39953044.15 },
    { Country: 'IN', ChannelName: 'ChuChu TV Nursery Rhymes & Kids Songs', Followers: 57100000, Likes: 31942735 },
    { Country: 'US', ChannelName: 'Marshmello', Followers: 55500000, Likes: 51156331.51 },
    { Country: 'IN', ChannelName: 'Colors TV', Followers: 53400000, Likes: 182929448 },
    { Country: 'IN', ChannelName: 'Wave Music', Followers: 52800000, Likes: 135816576.6 },
    { Country: 'US', ChannelName: 'EminemMusic', Followers: 52600000, Likes: 45500762.85 },
    { Country: 'IN', ChannelName: 'Aaj Tak', Followers: 52300000, Likes: 204913414.4 },
    { Country: 'US', ChannelName: 'Ed Sheeran', Followers: 52100000, Likes: 97976609.8 },
    { Country: 'IN', ChannelName: 'Tips Official', Followers: 52000000, Likes: 35849829.85 },
    { Country: 'IN', ChannelName: 'Sony Music India', Followers: 51600000, Likes: 406235612.4 },
    { Country: 'US', ChannelName: 'Ariana Grande', Followers: 51500000, Likes: 44484407.8 },
    { Country: 'IN', ChannelName: 'T-Series Bhakti Sagar', Followers: 51300000, Likes: 27470145.64 },
    { Country: 'US', ChannelName: 'El Reino Infantil', Followers: 50900000, Likes: 11453139.1 },
    { Country: 'US', ChannelName: 'LooLoo Kids - Nursery Rhymes and Children\'s Songs', Followers: 49400000, Likes: 25323367.15 },
    { Country: 'IN', ChannelName: 'YRF', Followers: 46900000, Likes: 230841570.4 },
    { Country: 'US', ChannelName: 'Taylor Swift', Followers: 46800000, Likes: 22039543.26 },
    { Country: 'US', ChannelName: 'JuegaGerman', Followers: 45900000, Likes: 641782272.8 },
    { Country: 'US', ChannelName: 'Billie Eilish', Followers: 45900000, Likes: 37371320.82 },
    { Country: 'MX', ChannelName: 'Badabun', Followers: 45600000, Likes: 288740569.4 },
    { Country: 'SV', ChannelName: 'Fernanfloo', Followers: 45100000, Likes: 937427149.9 },
    { Country: 'IN', ChannelName: 'Infobells - Hindi', Followers: 44700000, Likes: 24257065.2 },
    { Country: 'BR', ChannelName: 'Felipe Neto', Followers: 44200000, Likes: 763318297 },
    { Country: 'US', ChannelName: 'whinderssonnunes', Followers: 43800000, Likes: 196137065.7 },
    { Country: 'US', ChannelName: 'BRIGHT SIDE', Followers: 43700000, Likes: 36932146.78 },
    { Country: 'CL', ChannelName: 'HolaSoyGerman.', Followers: 43300000, Likes: 222616795.2 },
    { Country: 'BR', ChannelName: 'Você Sabia?', Followers: 43100000, Likes: 449621753.4 },
    { Country: 'US', ChannelName: 'Katy Perry', Followers: 43000000, Likes: 5322828.259 },
    { Country: 'US', ChannelName: 'SonyMusicIndiaVEVO', Followers: 42300000, Likes: 117320899.9 },
    { Country: 'NO', ChannelName: 'Alan Walker', Followers: 42000000, Likes: 55641776.54 },
    { Country: 'PR', ChannelName: 'Bad Bunny', Followers: 41600000, Likes: 138038669.5 },
    { Country: 'US', ChannelName: 'Like Nastya Show', Followers: 41300000, Likes: 39269151.6 },
    { Country: 'BY', ChannelName: 'A4', Followers: 40600000, Likes: 766852538 },
    { Country: 'RU', ChannelName: 'Get Movies', Followers: 40500000, Likes: 16319224.4 },
    { Country: 'IN', ChannelName: 'Speed Records', Followers: 40500000, Likes: 155670991.2 },
    { Country: 'US', ChannelName: 'elrubiusOMG', Followers: 40400000, Likes: 814895443 },
    { Country: 'PH', ChannelName: 'ABS-CBN Entertainment', Followers: 39800000, Likes: 240442177.4 },
    { Country: 'US', ChannelName: 'Rihanna', Followers: 39400000, Likes: 1205009.12 },
    { Country: 'US', ChannelName: 'Little Baby Bum - Nursery Rhymes & Kids Songs', Followers: 39200000, Likes: 5749294.194 },
    { Country: 'MX', ChannelName: 'Luisito Comunica', Followers: 39000000, Likes: 247337977.2 },
    { Country: 'RU', ChannelName: 'Маша и Медведь', Followers: 38300000, Likes: 23751378.74 },
    { Country: 'US', ChannelName: 'TheEllenShow', Followers: 38300000, Likes: 167231088.8 },
    { Country: 'IN', ChannelName: 'Shemaroo', Followers: 38200000, Likes: 19334895.6 },
    { Country: 'IN', ChannelName: 'Voot Kids', Followers: 38100000, Likes: 46360335.99 },
    { Country: 'BR', ChannelName: 'Luccas Neto', Followers: 37500000, Likes: 156622828.8 },
    { Country: 'BR', ChannelName: 'GR6 EXPLODE', Followers: 37500000, Likes: 245579644.7 },
    { Country: 'US', ChannelName: 'xxxtentacion', Followers: 37400000, Likes: 33550305.4 },
    { Country: 'IN', ChannelName: 'Ishtar Music', Followers: 37400000, Likes: 18094604 },
    { Country: 'US', ChannelName: 'One Direction', Followers: 37200000, Likes: 18852717 },
    { Country: 'US', ChannelName: 'Kimberly Loaiza', Followers: 36900000, Likes: 240742149.4 },
    { Country: 'TH', ChannelName: 'WorkpointOfficial', Followers: 36800000, Likes: 80346776.67 },
    { Country: 'US', ChannelName: 'Shakira', Followers: 36700000, Likes: 16923109.41 },
    { Country: 'US', ChannelName: 'Daddy Yankee', Followers: 36600000, Likes: 188506752.5 },
    { Country: 'US', ChannelName: 'Toys and Colors', Followers: 36300000, Likes: 50988592.12 },
    { Country: 'US', ChannelName: 'WWE', Followers: 89400000, Likes: 543800874.3 },
    { Country: 'IN', ChannelName: 'Zee Music Company', Followers: 85500000, Likes: 210395355.3 },
    { Country: 'US', ChannelName: 'Vlad and Niki', Followers: 83500000, Likes: 146245435.4 },
    { Country: 'US', ChannelName: '5-Minute Crafts', Followers: 77000000, Likes: 158230212.5 },
    { Country: 'KR', ChannelName: 'BLACKPINK', Followers: 75100000, Likes: 617573972 },
    { Country: 'IN', ChannelName: 'Goldmines Telefilms', Followers: 72000000, Likes: 63642295.56 },
    { Country: 'CA', ChannelName: 'Justin Bieber', Followers: 69400000, Likes: 39350061.94 },
    { Country: 'IN', ChannelName: 'SAB TV', Followers: 69300000, Likes: 109283010.7 },
    { Country: 'US', ChannelName: 'BANGTANTV', Followers: 69100000, Likes: 1640737553 },
    { Country: 'KR', ChannelName: 'ibighit', Followers: 67300000, Likes: 636497162.1 }
  ];
  
  var colorScale = d3.scaleOrdinal()
    .domain(["IN", "US", "KR", "CA", "BR", "SV", "MX", "RU", "TH", "NO","CL","PR","BY","PH"])
    .range(["#000000", "#fc9647", "#CC935E", "#FFED75", "#FFBE5C", "#CCA770", "#776c5b", "#FFBC58", "#6a6257",'#e46808']);
  
  // Create SVG element
  var svg = d3.select('#scatterPlotContainer')
    .append('svg')
    .attr("width", "100%") // Make the width 100%
    .attr("height", "100%") // Make the height 100%
    .attr('preserveAspectRatio', 'xMinYMin')
    .attr('viewBox', '0 0 600 400')
    .classed('svg-content', true);
  
  // Define scales with swapped domains
  const xScale = d3.scaleLinear()
    .domain([0, 4e9])  
    .range([0, 500]);
  
  const yScale = d3.scaleLinear()
    .domain([0, 300000000])  
    .range([300, 0]);
  
  // Create y-axis with custom ticks
  svg.append("g")
    .attr("transform", "translate(50, 50)")
    .call(d3.axisLeft(yScale).tickFormat(d3.format(".2s")).tickValues([0, 100000000, 200000000, 300000000]))
    .selectAll("text")
    .attr("dy", "1em");
  
  // Create x-axis with custom ticks and format
  svg.append("g")
    .attr("transform", "translate(50, 350)")
    .call(d3.axisBottom(xScale).tickFormat(d3.format(".1s")).tickValues([0, 1e9, 2e9, 3e9, 4e9]))
    .selectAll("text")
    .attr("dy", "1em");
  
  // Add y-axis label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -200) 
    .attr("y", 20)   
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text("Followers");
  
  // Add x-axis label
  svg.append("text")
    .attr("x", 250) 
    .attr("y", 400) 
    .attr("text-anchor", "middle")
    .attr("font-size", "12px")
    .text("Likes");
  
  // Create scatter plot points with country-specific colors
  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", d => xScale(d.Likes) + 50)  
    .attr("cy", d => yScale(d.Followers) + 50) 
    .attr("r", 6) 
    .attr("class", d => d.Country) 
    .style("fill", d => colorScale(d.Country)); 
  
  // Add legend
  var legend = svg.selectAll(".legend")
    .data(colorScale.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => "translate(500," + (i * 20 + 50) + ")");
  
  legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", colorScale);
  
  legend.append("text")
    .attr("x", 25)
    .attr("y", 9)
    .attr("dy", ".3em")
    .style("text-anchor", "start")
    .text(d => d);
  
  // Add labels
  svg.selectAll(".label")
    .data(data)
    .enter().append("text")
    .attr("class", "label")
    .attr("x", d => xScale(d.Likes) + 50) 
    .attr("y", d => yScale(d.Followers) + 50 - 10)  
    .attr("text-anchor", "middle")
    .attr("font-size", "10px");