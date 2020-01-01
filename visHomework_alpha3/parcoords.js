/**
 * 平行坐标轴说明: https://github.com/syntagmatic/parallel-coordinates#parcoords_detectDimensions
 */
var pc = d3.parcoords()("#pc");

var dimensions = {
    "city_id": { type: "string"},
    "county": { type: "string" },
    "product_id": { type: "string"},
    "type": { type: "string"},
    // "product_1level": { type: "string"},
    "departure_time": { type: "date" },
    "arrive_time": { type: "date" },
    "pre_total_fee": { type: "number" },
    "normal_time": { type: "number" },
    "start_dest_distance": { type: "number" },
};

d3.queue()
    .defer(d3.csv, "./data/sampling_haikou.csv")
    .await(renderingPC);

function renderingPC (error, data) {
    pc
        .data(data.map(function (d) {
            return {
                "city_id": d.city_id,
                "county": d.county,
                "product_id": d.product_id,
                "type": d.type,
                // "product_1level": d.product_1level,
                "arrive_time": new Date(d.arrive_time),
                "departure_time": new Date(d.departure_time),
                "pre_total_fee": +d.pre_total_fee,
                "normal_time": +d.normal_time,
                "start_dest_distance": +d.start_dest_distance,
                "starting_lng": +d.starting_lng,
                "starting_lat": +d.starting_lat,
                "dest_lng": +d.dest_lng,
                "dest_lat": +d.dest_lat,
            }
        }))
        .dimensions(dimensions)
        .animationTime(2000)
        // .margin({ top: 50, right: 50, bottom: 12, left: 50 })
        // .bundlingStrength(.5) // set bundling strength
        // .smoothness(0.3)
        // .bundleDimension("starting_lng")
        // .showControlPoints(false)
        .alphaOnBrushed(1.0)
        .mode("queue")
        .render()
        .brushMode("1D-axes")
        .reorderable()
        .interactive();

    d3.selectAll("canvas").style("position", "absolute");

    // 平行坐标交互 "highlight", "brush", "brushend", "brushstart" 这是主控制
    pc.on("brushstart", function (records) {
        coords.splice(0, coords.length);
        odpath.clearLayers();
        map.removeLayer(odpath);

        if (map.hasLayer(startgroup)) {
            startgroup.clearLayers();
            map.removeLayer(startgroup);
        }

        if (map.hasLayer(destgroup)) {
            destgroup.clearLayers();
            map.removeLayer(destgroup);
        }

        if (map.hasLayer(heatGroup)) {
            coords.splice(0, coords.length);
            heatGroup.clearLayers();
            map.removeLayer(heatGroup);
        }

        d3.select(".foreground").style("display", "none");
        myCoords.splice(0, myCoords.length);
        datasetDate.splice(0, datasetDate.length);
        d3.select("#fig2").selectAll("svg")
            .transition().style("opacity", 0).remove();
    });

    pc.on("brushend", function (records) {
        if (records.length !== data.length) {
            let date = records.map((function(d) {return d.departure_time;}));
            date = date.map(function (d) {
                return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            });
            date = unique(date);
            if (records.length > 200) {
                drawODpath(records.slice(0, records.length * 0.1));
            } else {
                drawODpath(records);
            }
            drawMarker(records);
            drawHeat(records);
            drawStack(records);
        } else {
            d3.select(".foreground").style("display", "block");
        }
    })
}