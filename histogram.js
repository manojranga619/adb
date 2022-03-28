function getHistogram(values) {
    // Generate a Bates distribution of 10 random letiables.
    // let values = d3.range(1000).map(d3.random.bates(10));

    // A formatter for counts.
    let formatCount = d3.format(",.0f");

    let margin = { top: 10, right: 30, bottom: 30, left: 30 },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    let x = d3.scale.linear()
        .domain([0, 5])
        .range([0, width]);

    // Generate a histogram using twenty uniformly-spaced bins.
    let data = d3.layout.histogram()
        .bins(x.ticks(20))
        (values);

    let y = d3.scale.linear()
        .domain([0, d3.max(data, function (d) { return d.y; })])
        .range([height, 0]);

    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    let svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let bar = svg.selectAll(".bar")
        .data(data)
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(data[0].dx) - 1)
        .attr("height", function (d) { return height - y(d.y); });

    bar.append("text")
        .attr("dy", ".75em")
        .attr("y", 6)
        .attr("x", x(data[0].dx) / 2)
        .attr("text-anchor", "middle")
        .text(function (d) { return formatCount(d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
}

function getHist() {
    let data = [
        
        { Country: 'United States', Value: 12394 },
        { Country: 'Russia', Value: 6148 },
        { Country: 'Germany', Value: 1653 },
        { Country: 'United Kingdom', Value: 1214 },
        { Country: 'China', Value: 1131 },
        { Country: 'Spain', Value: 1131 },
        { Country: 'Netherlands', Value: 1167 },
        { Country: 'Italy', Value: 660 },
        { Country: 'Israel', Value: 1263 },
    ];
    data.columns  = [ "Country", "Value" ];
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

            var x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(function (d) { return d.name; }))
            .padding(0.2);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, 13000])
            .range([height, 0]);
        svg.append("g")
            .call(d3.axisLeft(y));

        // Bars
        svg.selectAll("mybar")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.name); })
            .attr("y", function (d) { return y(d.share); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.share); })
            .attr("fill", "#69b3a2")
    
}
