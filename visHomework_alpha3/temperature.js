var tempsvg = d3.select("#fig1")
    .append("svg")
    .style("width", subGrid.nodeSize()[0] + "px")
    .style("height", subGrid.nodeSize()[1] + "px");

// let options = {
//     angle:      80,          // deg
//     width:      2,          // px
//     spacing:    10,      // px
//     length:     5,        // px
//     interval:   10,    // px
//     speed:      1,          // times
//     color:      "#1F85DE"
// };
//
// d3.json("./data/haikou.geojson", function (error, data) {
//     var points = data["features"][0]["geometry"]["coordinates"][0]
//         .map(function (d) {
//             return L.latLng(+d[1], +d[0]);
//         });
//     let rain = L.rain(points, options).addTo(map);
//     d3.select(".webgl-canvas").style("display", "none");
// });

d3.csv("./data/haikouweather.csv", function (error, data) {
    var dataToPlot = d3.keys(data[0]).filter(function (k) {
        return k === "max_temp" || k === "min_temp";
    }).map(function (k) {
        let color = k === "max_temp" ? "#f55066" : "#b8f1ed";
        return {
            "key": k,
            "values": data.map(function (d) {
                return {
                    "x": d3.time.format("%Y-%m-%d").parse(d.date),
                    "y": +d[k]
                };
            }),
            "color": color,
            "area": true
        };
    });

    nv.addGraph(function () {
        var chart = nv.models.lineWithFocusChart()
            .useInteractiveGuideline(true);

        chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)); });
        chart.x2Axis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)); });

        chart.yAxis.tickFormat(d3.format(',.2f'));
        chart.y2Axis.tickFormat(d3.format(',.2f'));

        tempsvg
            .datum(dataToPlot)
            .transition().duration(500)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

    // d3.select("#fig1")
    //     .on("mousedown", function () {
    //         console.log(this);
    //         d3.select(".webgl-canvas").style("display", "none");
    //     })
    //     .on("mouseup", function () {
    //         let cstr = d3.select(".xy-tooltip").select(".x-value")[0][0].innerHTML;
    //         cstr = cstr.split("/");
    //         cstr = cstr[2] + "-" + cstr[0] + "-" +cstr[1];
    //         let isRain = data.filter(function (d) {
    //             return d.date === cstr && +d.rain === 1;
    //         });
    //
    //         if (isRain.length > 0) {
    //             d3.select(".webgl-canvas").style("display", "block");
    //         }
    //     });
});

