//颜色深浅。
//距离长短
// 其中速度快：短，速度慢：长。
getColor = (links) => {
    let maxSize = Math.max.apply(Math, links.map((i) => {
        return i.size;
    }))
    let minSize = Math.min.apply(Math, links.map((i) => {
        return i.size;
    }))
    let linear = d3.scale.linear().domain([minSize, maxSize]).range([0, 1])
    return (size) => {
        let compute = d3.interpolate('white', 'black');
        return compute(linear(size));
    }
}

getSpeed = (links) => {
    let arr = links.map((ii) => {
        return ii.speed;
    })
    arr.sort();

    let maxSpeed = arr[0];
    let minSpeed = arr[arr.length - 2];
    let linear = d3.scale.linear().domain([maxSpeed, minSpeed]).range([50, 300])
    return (speed) => {
        return linear(speed);
    }
}

d3.json("./links.json", (data) => {
    var { links, nodes } = data;
    var routers = [];
    var points = [];
    var source;
    var target;
    var width = 600,
        height = 600;
    var colors = ["rgb(31,119,180)",
            "rgb(255, 127, 14)",
            "rgb(44, 160, 44)",
            "rgb(214, 39, 40)",
            "rgb(148, 103, 189)",
            "rgb(140, 86, 75)",
            "rgb(227, 119, 194)",
            "rgb(127, 127, 127)",
            "rgb(188, 189, 34)",
            "rgb(23, 190, 207)"
        ]
        //获取最大值，用于映射颜色。
    let category = getColor(links); //返回一个函数，输入size，获取对应颜色。
    let speedScale = getSpeed(links);
    let ids = []; //生成id数组。作为data

    for (let i = 0; i < 23; i++) {
        ids.push(i);
    }
    let start = d3.select("#start");
    let end = d3.select("#end");
    start.selectAll("button")
        .data(ids)
        .enter()
        .append("button")
        .attr("value", (d) => {
            return d;
        })
        .attr("class", "btn-primary start")
        .attr("id", (d) => {
            return `start_${d}`
        })
        .text((d) => {
            return d;
        })

    end.selectAll("button")
        .data(ids)
        .enter()
        .append("button")
        .attr("class", "btn-primary end")
        .attr("id", (d) => {
            return `end_${d}`
        })
        .text((d) => {
            return d;
        })



    var color = d3.scale.category20();
    nodes = d3.values(nodes);
    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .linkDistance((d) => {
            return speedScale(d.speed);
        })
        .charge(-400)
        .start();

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    //用颜色的深浅代表路线的远近。
    var svg_edges = svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .style("stroke", (d) => {
            return category(d.size);
        })
        .style("strole-width", 2);

    var svg_nodes = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 10)
        .attr("class", "dot")
        .style("fill", (d, i) => {
            return color(i);
        })
        .call(force.drag);

    var svg_nodes_texts = svg.selectAll("text#nodes")
        .data(nodes)
        .enter().append("text")
        .style("fill", "black")
        .attr('text-anchor', "middle")
        .attr('id', 'nodes')
        .attr("dx", 18)
        .attr("dy", 6)
        .text(function(d) {
            return d.name;
        });

    force.on("tick", function() { //对于每一个时间间隔
        // 更新连线坐标
        svg_edges
            .attr("x1", function(d) {
                // console.log(d);
                return d.source.x;
            })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        //更新节点坐标
        svg_nodes
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        //更新文字坐标
        svg_nodes_texts
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
    });
    svg.selectAll("circle")
        .on("click", (e) => {
            showAll();
            //保留与这个节点相连的线段。其他的线段暂时隐去。即添加一个类？
            showRelate(e);
        })

    showAll = () => {
        d3.selectAll("line")
            .style("opacity", "1");
    }
    //记录开始按钮。
    d3.selectAll("button.start")
        .on("click", function(e) {
            clearStart();
            let dom = d3.select(this);
            let str = dom.attr("class");
            dom.attr("class", `${str} checked`)
            source = e;
            d3.select("#source").text(source);

        })
        d3.select("#jump")
        .on("click",()=>{
            let str = routers.toString();
            console.log(str);
            if(routers.length !== 0){
                window.open(`index.html?${str}`)
            }else{
                alert("请先添加节点")
            }
            
        })
        //记录结束按钮。
    d3.selectAll("button.end")
        .on("click", function(e) {
            clearEnd();
            let dom = d3.select(this);
            let str = dom.attr("class");
            dom.attr("class", `${str} checked`)
            target = e;
            d3.select("#target").text(target);
        })
        //点击添加button，检查，并且将source和target添加进二元数组。
    d3.select("#add")
        .on("click", function(e) {
            if (typeof(source) !== "number" || typeof(target) !== "number" || source < 0 || target < 0) {
                $("#add_tip").html("未选择足够的点");
                clearChecked();
                clearSpan();
                return;
            } else if (source === target) {
                $("#add_tip").html("起点和终点不能相同");
                clearChecked();
                clearSpan();
                return;
            } else if (find_route(routers, [source, target])) {
                $("#add_tip").html("路线已存在");
                clearChecked();
                clearSpan();
                return;
            } else {
                $("#add_tip").html("成功");
                routers.push([source, target]);
                $("#routes").append("<div>[" + source + ", " + target + "]</div>");
            }

            //更新已经存在的点的集合points
            let source_index = find_point(points, source);
            let target_index = find_point(points, target);

            if (source_index === -1) {
                let temp = {};
                temp.value = source;
                temp.times = 1;
                points.push(temp);
            } else {
                points[source_index].times++;
            }

            if (target_index === -1) {
                let temp = {};
                temp.value = target;
                temp.times = 1;
                points.push(temp);
            } else {
                points[target_index].times++;
            }
            //清空当前选择
            clearChecked();
            clearSpan();
        })

    clearStart = () => {
        d3.select(`#start_${source}`).attr("class", "btn-primary start");
        source = -1;
    }
    clearEnd = () => {
        d3.select(`#end_${target}`).attr("class", "btn-primary end");
        target = -1;
    }
    clearChecked = () => {
        //清除start
        clearStart();
        clearEnd();
    }

    //每次添加后清除source、target内容
    clearSpan = () => {
        $("#source").html("未选中");
        $("#target").html("未选中");
    }

    //寻找对象所在的数组下标
    function find_point(arr, val) {
        for (let x = 0; x < arr.length; x++) {
            if (arr[x].value === val) {
                return x;
            }
        }
        return -1;
    }

    function find_route(arr, val) {
        for (let x = 0; x < arr.length; x++) {
            if ((arr[x][0] === val[0] && arr[x][1] === val[1]) || (arr[x][0] === val[1]) && (arr[x][1] === val[0])) {
                return true;
            }
        }
        return false;
    }

    var router_width = 250;
    var router_height = 250;
    const center_x = 125;
    const center_y = 125;
    var svg = d3.select("#router-container")
        .append("svg")
        .attr("width", router_width)
        .attr("height", router_height)
        .attr("margin", "0 auto")
        .attr("id", "direct_graph");

    $("#route_generater").click(function() {
        $("#direct_graph circle").remove();
        $("#direct_graph line").remove();
        $("#direct_graph text").remove();

        if (points.length === 0) {
            $("#generate_tip").html("哥，还未添加任何节点")
            return;
        }

        points.sort(function(x, y) {
            if (x.times <= y.times) {
                return 1;
            } else {
                return -1;
            }
        });

        //分布节点位置
        //最中间层1个节点，times最大
        if (points.length >= 1) {
            points[0].x = center_x;
            points[0].y = center_y;
        }

        //第二层3个节点，120度, 半径25
        if (points.length > 1) {
            for (let i = 1; i <= 3; i++) {
                if (points.length < i + 1) {
                    break;
                }
                let sin = Math.sin(120 * i * Math.PI / 180) * 25;
                let cos = Math.cos(120 * i * Math.PI / 180) * 25;
                points[i].x = center_x - sin;
                points[i].y = center_y - cos;
            }
        }

        //第三层6个节点，60度，半径60
        if (points.length > 4) {
            for (let i = 1; i <= 7; i++) {
                if (points.length < i + 4) {
                    break;
                }

                let sin = Math.sin((360 / 7 * i + 15) * Math.PI / 180) * 60;
                let cos = Math.cos((360 / 7 * i + 15) * Math.PI / 180) * 60;

                points[i + 3].x = center_x - sin;
                points[i + 3].y = center_y - cos;
            }
        }

        //第四层12个节点，30度，半径100
        if (points.length > 10) {
            for (let i = 1; i <= 11; i++) {
                if (points.length < i + 11) {
                    break;
                }

                let sin = Math.sin((360 / 11 * i + 25) * Math.PI / 180) * 100;
                let cos = Math.cos((360 / 11 * i + 25) * Math.PI / 180) * 100;

                points[i + 10].x = center_x - sin;
                points[i + 10].y = center_y - cos;
            }
        }

        //创建拖拽行为
        var drag = d3.behavior.drag()
            .origin(function(d) { return { x: d.x, y: d.y } })
            .on("dragstart", function() { d3.select(this).attr("r", "6px") })
            .on("drag", ondrag)
            .on("dragend", function() { d3.select(this).attr("r", "3px") })

        //绘制节点
        svg.selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return d.x })
            .attr("cy", function(d) { return d.y })
            .attr("r", "3px")
            .style("fill", function(d) { return colors[d.value % 10] })
            .call(drag);

        //绘制文字提示
        svg.selectAll("text")
            .data(points)
            .enter()
            .append("text")
            .text(function(d) { return d.value.toString() })
            .attr("x", function(d) { return d.x + 5 })
            .attr("y", function(d) { return d.y + 5 })
            .attr("font-size", "10px")



        //绘制连线
        svg.selectAll("line")
            .data(routers)
            .enter()
            .append("line")
            .attr("x1", function(d) { return find_location(d[0], "x") })
            .attr("y1", function(d) { return find_location(d[0], "y") })
            .attr("x2", function(d) { return find_location(d[1], "x") })
            .attr("y2", function(d) { return find_location(d[1], "y") })
            .style("stroke-width", "0.5px")
            .style("stroke", "grey")

        $("#generate_tip").html("成功！");

        function find_location(point, type) {
            for (let i = 0; i < points.length; i++) {
                if (points[i].value === point) {
                    return points[i][type];
                }
            }
        }

        function ondrag(d) {
            let new_x = d3.event.x;
            let new_y = d3.event.y;
            let value = d.value;

            //边缘检测
            if (new_x > 230) {
                new_x = 230;
            } else if (new_x < 20) {
                new_x = 20;
            }

            if (new_y > 230) {
                new_y = 230;
            } else if (new_y < 20) {
                new_y = 20;
            }

            //更改点属性（不改会导致再次拖动时点回到最初位置）
            points[find_point(points, d.value)].x = new_x;
            points[find_point(points, d.value)].y = new_y;

            //改变点当前位置
            d3.select(this).attr("cx", new_x).attr("cy", new_y);

            //改变点的文字位置
            d3.selectAll("text").filter(function(d, i) {
                return d.value === value;
            }).attr("x", new_x + 5).attr("y", new_y + 5);

            //改变射出连线
            d3.selectAll("line").filter(function(d, i) {
                return d[0] === value;
            }).attr("x1", new_x).attr("y1", new_y);

            //改变射入连线
            d3.selectAll("line").filter(function(d, i) {
                return d[1] === value;
            }).attr("x2", new_x).attr("y2", new_y);

            //更改连线属性（不改会导致再次拖动时连线回到最初位置）


        }
    })

    $("#clear").click(function() {
        clearChecked();
        clearSpan();
        $("#add_tip").html("");
        $("#generate_tip").html("");
        $("#direct_graph circle").remove();
        $("#direct_graph line").remove();
        $("#direct_graph text").remove();
        $("#routes div").remove();
        routers = [];
        points = [];
    })

    function showRelate(dom) {
        console.log(dom);
        let { name } = dom;
        name = parseInt(name);
        d3.selectAll("line").call((sel) => {
            sel.each(function(d) {
                if (parseInt(d.source.name) !== name && parseInt(d.target.name) !== name) {
                    d3.select(this).style("opacity", "0");
                }
            })
        })
    }

    
})