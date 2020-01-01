var margin = {top: 10, left: 10, right: 10, bottom: 10};
var mainviewloc = 10;
var mainviewWidth = document.documentElement.clientWidth - margin.left - margin.right;
var mainviewHeight = document.documentElement.clientHeight - margin.top - margin.right;
var divwidth = mainviewWidth - margin.left - margin.right;
var divheight = (mainviewHeight - 3 * margin.top) / 4;
var view_id = [{"id": "sub"}, {"id": "t1"}, {"id": "t2"}, {"id": "pc"}];
var chart_id = [{"id": "gismap"}, {"id": "fig1"}, {"id": "t3"}, {"id": "fig2"}];
var border = "2px solid #B3B2B2";

var mainContainer = d3.select("body")
    .append("div")
    .attr("id", "mainContainer")
    .style("position", "absolute")
    .style("border", border)
    .style("width", mainviewWidth + "px")
    .style("height", mainviewHeight + "px")
    .style("transform", "translate(" + margin.left + "," + margin.top + ")");

var rectGrid = d3.layout.grid()
    .bands()
    .rows(4)
    .cols(1)
    .size([mainviewWidth, mainviewHeight])
    .nodeSize([divwidth, divheight])
    .padding([5, 5]);

var subContainer = mainContainer.selectAll("div")
    .data(rectGrid(view_id))
    .enter().append("div")
    .attr("id", function(d) { return d.id;})
    .style("position", "absolute")
    .style("border", border)
    .style("width", rectGrid.nodeSize()[0] + "px")
    .style("height", function (d) {
        if (d.id === 'sub') {
            return rectGrid.nodeSize()[1] * 3 + "px";
        }
        return rectGrid.nodeSize()[1] + "px";
    })
    .style("transform", function (d) {
        return "translate(" + (d.x + 5) + "px," + (d.y + 5) + "px)";
    });

d3.select("#t1").remove();
d3.select("#t2").remove();

var subwidth = rectGrid.nodeSize()[0] - margin.left - margin.right - 10;
var subHeight = rectGrid.nodeSize()[1] * 3 - margin.left - margin.right;

var subGrid = d3.layout.grid()
    .bands()
    .rows(2)
    .cols(2)
    .size([subwidth, subHeight])
    .nodeSize([subwidth / 2, subHeight / 2])
    .padding([10, 10]);


var chartDivs = d3.select("#sub").selectAll("div")
    .data(subGrid(chart_id))
    .enter().append("div")
    .attr("id", function(d) { return d.id;})
    .style("position", "absolute")
    .style("border", border)
    .style("width", subGrid.nodeSize()[0] + "px")
    .style("height", function (d) {
        if (d.id === 'gismap') {
            return subGrid.nodeSize()[1] * 2 + 5 + "px";
        }
        return subGrid.nodeSize()[1] + "px";
    })
    .style("transform", function (d) {
        return "translate(" + d.x + "px," + (d.y + 5) + "px)";
    });

d3.select("#t3").remove();
