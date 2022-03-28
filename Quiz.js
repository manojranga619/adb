let baseAddress = 'https://adb6331.azurewebsites.net/';

async function getData() {
    return fetch(`${baseAddress}getData`)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
async function getByMagnitude() {
    let data = await this.getData();

    const pieChartData = [];
    pieChartData.push({ name :'<1', count: data.filter((x) => x.mag < 1).length });
    pieChartData.push({ name :'1-2', count: data.filter((x) => x.mag >= 1 && x.mag < 2).length });
    pieChartData.push({ name :'2-3', count: data.filter((x) => x.mag >= 2 && x.mag <= 3).length });
    pieChartData.push({ name :'<5', count: data.filter((x) => x.mag >= 3 && x.mag <= 5).length });
    const total = pieChartData.map(x => x.count).reduce((partialSum, a) => partialSum + a, 0);
    pieChartData[0].share = pieChartData[0].count/total;
    pieChartData[1].share = pieChartData[1].count/total;
    pieChartData[2].share = pieChartData[2].count/total;
    pieChartData[3].share = pieChartData[3].count/total;
    generatePieChart(pieChartData);
    // getHistogram(data.map(x => x.mag));
    // getHist();
}
function generatePieChart(data) {
    let svg = d3.select("svg"),
        width = svg.attr("width"),
        height = svg.attr("height"),
        radius = 200;

    // let data = [{ name: "Alex", share: 20.70 },
    // { name: "Shelly", share: 30.92 },
    // { name: "Clark", share: 15.42 },
    // { name: "Matt", share: 13.65 },
    // { name: "Jolene", share: 19.31 }];

    let g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let ordScale = d3.scaleOrdinal()
        .domain(data)
        .range(['#ffd384', '#94ebcd', '#fbaccc', '#d3e0ea', '#fa7f72']);

    let pie = d3.pie().value(function (d) {
        return d.share;
    });

    let arc = g.selectAll("arc")
        .data(pie(data))
        .enter();

    let path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("path")
        .attr("d", path)
        .attr("fill", function (d) { return ordScale(d.data.name); });

    let label = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    arc.append("text")
        .attr("transform", function (d) {
            return "translate(" + label.centroid(d) + ")";
        })
        .text(function (d) { return d.data.name; })
        .style("font-family", "arial")
        .style("font-size", 15);
}
getByMagnitude();