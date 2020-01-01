var coords = [];

function drawHeat(records) {
    records.forEach(function (d) {
        coords.push([d.dest_lat, d.dest_lng]);
        coords.push([d.starting_lat, d.starting_lng]);

    });

    // L.heatLayer(coords).addTo(map);
    heatGroup.addLayer(L.heatLayer(coords));
    map.addLayer(heatGroup);
}