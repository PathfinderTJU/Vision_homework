var gaode = L.tileLayer.chinaProvider("GaoDe.Normal.Map", {
    attribution: 'Map data &copy; <a href="https://www.amap.com/">2019 Amap</a> ' +
        'contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});

var map = L.map("gismap", {
    center: [20.03, 110.32],
    zoom: 9,
    layers: [gaode]
});

var starticon = L.icon({
    iconUrl: "./images/start.svg",
    iconSize: [25, 41],
});

var desticon = L.icon({
    iconUrl: "./images/dest.svg",
    iconSize: [25, 41],
});

L.control.scale().addTo(map);


// L.easyButton('fa fa-tint', function (btn, map) {
//     d3.select(".webgl-canvas").style("display", "block");
// }).addTo(map);

var odpath = L.layerGroup();
var startgroup = L.layerGroup();
var destgroup = L.layerGroup();
var heatGroup = L.layerGroup();
var networkgroup = L.layerGroup();

function drawODpath(records) {

    var distanceWeight = d3.scale.linear()
        .domain(d3.extent(records, function (d) {
            return +d.pre_total_fee;
        }))
        .range([1, 10]);

    records.forEach(function (d) {
        var latlng = [L.latLng(+d.starting_lat, +d.starting_lng),
                      L.latLng(+d.dest_lat, +d.dest_lng)];

        var antPolygon = L.polyline.antPath(latlng, {
            "delay": 1000,
            "dashArray": [
                10,
                20
            ],
            // "weight": distanceWeight(+d.pre_total_fee),
            "color": "#0000FF",
            "pulseColor": "#FFFFFF",
            "paused": false,
            "reverse": false,
            "hardwareAccelerated": true
        });
        antPolygon.addTo(odpath);
        // antPolygon.addTo(map);
    });

    // map.addLayer(odpath);
}

function drawMarker(records) {
    records.forEach(function (d) {

        var s = L.marker(new L.LatLng(+d.starting_lat, +d.starting_lng), {icon: starticon}).bindPopup("starting_lng: " + d.starting_lng + "<br/>" +
            "starting_lat: " + d.starting_lat + "<br/>")
            .addTo(startgroup);

        var t = L.marker(new L.LatLng(+d.dest_lat, +d.dest_lng), {icon: desticon}).bindPopup("dest_lng: " + d.dest_lng + "<br/>" +
            "dest_lat: " + d.dest_lat + "<br/>")
            .addTo(destgroup);
    });

    // map.addLayer(start_dest);
}

d3.csv("./data/groupgps.csv", function (error, data) {
    var param = window.location.search;
    var arr = [];
    if(param !== ""){
        // console.log("进来了");
        param = param.slice(1);
        let s = param.split(',');
        // console.log(s);
        for (let i = 0; i < s.length/2; i++){
            let temp = [];
            temp.push(parseInt(s[i*2]));
            temp.push(parseInt(s[i*2+1]));
            arr.push(temp);
        }
        // console.log(arr);
    }

    var polyline = [];
    let selectedgroup = arr;
    data.forEach(function (d) {
        arr.forEach(function (g) {
            if (g[0] === +d.group || g[1] === +d.group) {
                polyline.push(L.latLng(+d.lat, +d.lon));
                L.marker(new L.LatLng(+d.lat, +d.lon)).bindPopup("group: " + d.group)
                    .addTo(networkgroup);
            }
        })
    });

    L.polyline(polyline).addTo(networkgroup);
    map.addLayer(networkgroup);
});

L.easyButton('fa fa-times', function (btn, map) {
    networkgroup.clearLayers();
}).addTo(map);

var baselayer = {
    "Amap": gaode
};

var sublayer = {
    "Route Trace": odpath,
    "start": startgroup,
    "dest": destgroup,
    "Heat": heatGroup,
    "group": networkgroup
};

var control = L.control.layers(baselayer, sublayer, { position: "topright"}).addTo(map);