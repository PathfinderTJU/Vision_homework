function deepCopy(obj) {
    var newObj = obj.constructor === Array ? [] : {};
    newObj.constructor = obj.constructor;
    if (typeof obj !== "object") {
        return;
    } else if (window.JSON) {
        newObj = JSON.parse(JSON.stringify(obj))
    } else {
        for (var prop in obj) {
            if (obj[prop].constructor === RegExp || obj[prop].constructor === Date) {
                newObj[prop] = obj[prop];
            } else if (typeof obj[prop] === 'object') {
                newObj[prop] = deepCopy(obj[prop]);
            } else {
                newObj[prop] = obj[prop];
            }
        }
    }
    return newObj;
}

function str_of_object_toarray(data) {
    data.forEach(function (d) {
        var newjson = d.times.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
        newjson = newjson.replace(/'/g, '"');
        var t = JSON.parse(newjson);
        d.times = t;
        d.times.forEach(function (o) {
            o.date = d3.time.format("%Y-%m-%d").parse(o.date);
        });
    });

    return data
}

function copyArr(arr) {
    let res = [];
    for (var i = 0; i < arr.length; i++) {
        res.push(arr[i]);
    }
    return res;
}

function unique(arr) {
    var r = [];
    for (var i = 0, l = arr.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        r.push(arr[i]);
    }
    return r;
}

function unique_property(arr, p) {
    var r = [];
    for (var i = 0, l = arr.length; i < l; i++) {
        for (var j = i + 1; j < l; j++) {
            if (arr[i][p] === arr[j][p]) {
                j = ++i;
            }
        }
        r.push(arr[i]);
    }
    return r;
}

function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

function loctooltip(selectedlist) {
    d3.queue()
        .defer(d3.csv, "./data/usergrid1.csv")
        .await(drawtooltip);

    function drawtooltip (error, data) {
        if (error) throw error;

        var users = data.filter(function (d) {
            if (selectedlist.indexOf(d.cons_no) + 1) {
                return true;
            } else {
                return false;
            }
        }).map(function (u) {
            return {
                no: +u.cons_no,
                peak: +u.pap_r,
                latlng: L.latLng(+u.y, +u.x)
            };
        });

        var m = {};
        users.forEach(function (d) {
            var content = "No: " + d.no + "<br/>" +
                "Annual average peak: " + d.peak + "<br/>";

            var options = {
                'maxWidth': "500",
                'className': "custom"
            };

            m = L.marker(d.latlng, {icon: changeicon}).bindPopup(content, options)
                .addTo(pointsGroup);
        });

        map.addLayer(pointsGroup);

    }
}

function deleted() {
    mdssvg
        .select(".brush")
        .selectAll("rect")
        .style("opacity", 1);

    tsnesvg
        .select(".brush")
        .selectAll("rect")
        .style("opacity", 1);

    path_g.selectAll("path").remove();

    timesvg.selectAll(".brush").remove();

    // timesvg.selectAll("#yAxis").remove();

    pointsGroup.clearLayers();

    map.removeLayer(pointsGroup);

    selectedlist.splice(0, selectedlist.length);

    mapcoor.splice(0, mapcoor.length);
}