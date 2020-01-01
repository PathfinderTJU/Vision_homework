var width = 750;
var height = 260;

var myCoords = [];
var datasetDate=[];

function drawStack(records){

	let sevenMorning=[0,0,0,0,0,0,0];
	let sevenMorningLength=[0,0,0,0,0,0,0];
	let sevenMidday=[0,0,0,0,0,0,0];
	let sevenMiddayLength=[0,0,0,0,0,0,0];
	let sevenAfternoon=[0,0,0,0,0,0,0];
	let sevenAfternoonLength=[0,0,0,0,0,0,0];
	let sevenEvening=[0,0,0,0,0,0,0];
	let sevenEveningLength=[0,0,0,0,0,0,0];

	let sevenMorning1=[0,0,0,0,0,0,0];
	let sevenMorningLength1=[0,0,0,0,0,0,0];
	let sevenMidday1=[0,0,0,0,0,0,0];
	let sevenMiddayLength1=[0,0,0,0,0,0,0];
	let sevenAfternoon1=[0,0,0,0,0,0,0];
	let sevenAfternoonLength1=[0,0,0,0,0,0,0];
	let sevenEvening1=[0,0,0,0,0,0,0];
	let sevenEveningLength1=[0,0,0,0,0,0,0];


    records.forEach(function (d) {
        myCoords.push([d.arrive_time.toString().substring(4,10),parseInt(d.arrive_time.toString().substring(16,19)),d.normal_time,d.pre_total_fee])
    });

    d3.select("#fig2").selectAll("svg").remove();


    myCoords.forEach(function (d) {
		if(datasetDate.indexOf(d[0])<0){
			datasetDate.push(d[0]);
		}
    });


	myCoords.forEach(function (d) {
		if(d[0]===datasetDate[0]){
			if(d[1]<12){
				sevenMorning[0]+=d[2];
				sevenMorningLength[0]+=1;
				sevenMorning1[0]+=d[3];
				sevenMorningLength1[0]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[0]+=d[2];
				sevenMiddayLength[0]+=1;
				sevenMidday1[0]+=d[3];
				sevenMiddayLength1[0]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[0]+=d[2];
				sevenAfternoonLength[0]+=1;
				sevenAfternoon1[0]+=d[3];
				sevenAfternoonLength1[0]+=1;
			}else{
				sevenEvening[0]+=d[2];
				sevenEveningLength[0]+=1;
				sevenEvening1[0]+=d[3];
				sevenEveningLength1[0]+=1;
			}
		}else if(d[0]===datasetDate[1]){
			if(d[1]<12){
				sevenMorning[1]+=d[2];
				sevenMorningLength[1]+=1;
				sevenMorning1[1]+=d[3];
				sevenMorningLength1[1]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[1]+=d[2];
				sevenMiddayLength[1]+=1;
				sevenMidday1[1]+=d[3];
				sevenMiddayLength1[1]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[1]+=d[2];
				sevenAfternoonLength[1]+=1;
				sevenAfternoon1[1]+=d[3];
				sevenAfternoonLength1[1]+=1;
			}else{
				sevenEvening[1]+=d[2];
				sevenEveningLength[1]+=1;
				sevenEvening1[1]+=d[3];
				sevenEveningLength1[1]+=1;
			}
		}else if(d[0]===datasetDate[2]){
			if(d[1]<12){
				sevenMorning[2]+=d[2];
				sevenMorningLength[2]+=1;
				sevenMorning1[2]+=d[3];
				sevenMorningLength1[2]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[2]+=d[2];
				sevenMiddayLength[2]+=1;
				sevenMidday1[2]+=d[3];
				sevenMiddayLength1[2]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[2]+=d[2];
				sevenAfternoonLength[2]+=1;
				sevenAfternoon1[2]+=d[3];
				sevenAfternoonLength1[2]+=1;
			}else{
				sevenEvening[2]+=d[2];
				sevenEveningLength[2]+=1;
				sevenEvening1[2]+=d[3];
				sevenEveningLength1[2]+=1;
			}
		}else if(d[0]===datasetDate[3]){
			if(d[1]<12){
				sevenMorning[3]+=d[2];
				sevenMorningLength[3]+=1;
				sevenMorning1[3]+=d[3];
				sevenMorningLength1[3]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[3]+=d[2];
				sevenMiddayLength[3]+=1;
				sevenMidday1[3]+=d[3];
				sevenMiddayLength1[3]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[3]+=d[2];
				sevenAfternoonLength[3]+=1;
				sevenAfternoon1[3]+=d[3];
				sevenAfternoonLength1[3]+=1;
			}else{
				sevenEvening[3]+=d[2];
				sevenEveningLength[3]+=1;
				sevenEvening1[3]+=d[3];
				sevenEveningLength1[3]+=1;
			}
		}else if(d[0]===datasetDate[4]){
			if(d[1]<12){
				sevenMorning[4]+=d[2];
				sevenMorningLength[4]+=1;
				sevenMorning1[4]+=d[3];
				sevenMorningLength1[4]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[4]+=d[2];
				sevenMiddayLength[4]+=1;
				sevenMidday1[4]+=d[3];
				sevenMiddayLength1[4]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[4]+=d[2];
				sevenAfternoonLength[4]+=1;
				sevenAfternoon1[4]+=d[3];
				sevenAfternoonLength1[4]+=1;
			}else{
				sevenEvening[4]+=d[2];
				sevenEveningLength[4]+=1;
				sevenEvening1[4]+=d[3];
				sevenEveningLength1[4]+=1;
			}
		}else if(d[0]===datasetDate[5]){
			if(d[1]<12){
				sevenMorning[5]+=d[2];
				sevenMorningLength[5]+=1;
				sevenMorning1[5]+=d[3];
				sevenMorningLength1[5]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[5]+=d[2];
				sevenMiddayLength[5]+=1;
				sevenMidday1[5]+=d[3];
				sevenMiddayLength1[5]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[5]+=d[2];
				sevenAfternoonLength[5]+=1;
				sevenAfternoon1[5]+=d[3];
				sevenAfternoonLength1[5]+=1;
			}else{
				sevenEvening[5]+=d[2];
				sevenEveningLength[5]+=1;
				sevenEvening1[5]+=d[3];
				sevenEveningLength1[5]+=1;
			}
		}else if(d[0]===datasetDate[6]){
			if(d[1]<12){
				sevenMorning[6]+=d[2];
				sevenMorningLength[6]+=1;
				sevenMorning1[6]+=d[3];
				sevenMorningLength1[6]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[6]+=d[2];
				sevenMiddayLength[6]+=1;
				sevenMidday1[6]+=d[3];
				sevenMiddayLength1[6]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[6]+=d[2];
				sevenAfternoonLength[6]+=1;
				sevenAfternoon1[6]+=d[3];
				sevenAfternoonLength1[6]+=1;
			}else{
				sevenEvening[6]+=d[2];
				sevenEveningLength[6]+=1;
				sevenEvening1[6]+=d[3];
				sevenEveningLength1[6]+=1;
			}
		}else{
			if(d[1]<12){
				sevenMorning[7]+=d[2];
				sevenMorningLength[7]+=1;
				sevenMorning1[7]+=d[3];
				sevenMorningLength1[7]+=1;
			}else if((d[1]>=12)&&(d[1]<15)){
				sevenMidday[7]+=d[2];
				sevenMiddayLength[7]+=1;
				sevenMidday1[7]+=d[3];
				sevenMiddayLength1[7]+=1;
			}else if((d[1]>=15)&&(d[1]<19)){
				sevenAfternoon[7]+=d[2];
				sevenAfternoonLength[7]+=1;
				sevenAfternoon1[7]+=d[3];
				sevenAfternoonLength1[7]+=1;
			}else{
				sevenEvening[7]+=d[2];
				sevenEveningLength[7]+=1;
				sevenEvening1[7]+=d[3];
				sevenEveningLength1[7]+=1;
			}
		}
	});

	sevenMorningLength.forEach(function (d,i) {
		if(d!==0){
			sevenMorning[i]=sevenMorning[i]/d;
		}
	});
	sevenMiddayLength.forEach(function (d,i) {
		if(d!==0){
			sevenMidday[i]=sevenMidday[i]/d;
		}
	});
	sevenAfternoonLength.forEach(function (d,i) {
		if(d!==0){
			sevenAfternoon[i]=sevenAfternoon[i]/d;
		}
	});
	sevenEveningLength.forEach(function (d,i) {
		if(d!==0){
			sevenEvening[i]=sevenEvening[i]/d;
		}
	});


	sevenMorningLength1.forEach(function (d,i) {
		if(d!==0){
			sevenMorning1[i]=sevenMorning1[i]/d;
		}
	});
	sevenMiddayLength1.forEach(function (d,i) {
		if(d!==0){
			sevenMidday1[i]=sevenMidday1[i]/d;
		}
	});
	sevenAfternoonLength1.forEach(function (d,i) {
		if(d!==0){
			sevenAfternoon1[i]=sevenAfternoon1[i]/d;
		}
	});
	sevenEveningLength1.forEach(function (d,i) {
		if(d!==0){
			sevenEvening1[i]=sevenEvening1[i]/d;
		}
	});

		 //画时间的变化
   		// var padding ={left:20 ,top:20,right:100,bottom:20};

   		var padding = {left:80,top:50,right:100,bottom:30};

 		//画费用的变化
		// var padding1 ={left:20 ,top:20,right:100,bottom:20};

   		var svg1 = d3.select("#fig2").append("svg")
   								   .attr("width",width)
   								   .attr("height",height);
			var dataset1=[
		{ name: "Morning" ,
						  Money: [	{ Date:datasetDate[0], money: sevenMorning1[0] },
									{ Date:datasetDate[1], money: sevenMorning1[1] },
									{ Date:datasetDate[2], money: sevenMorning1[2] },
									{ Date:datasetDate[3], money: sevenMorning1[3] },
									{ Date:datasetDate[4], money: sevenMorning1[4] },
									{ Date:datasetDate[5], money: sevenMorning1[5] },
							  		{ Date:datasetDate[6], money: sevenMorning1[6] }]},

		{name: "Midday" ,
						  Money: [	{ Date:datasetDate[0], money: sevenMidday1[0] },
									{ Date:datasetDate[1], money: sevenMidday1[1] },
									{ Date:datasetDate[2], money: sevenMidday1[2] },
									{ Date:datasetDate[3], money: sevenMidday1[3] },
									{ Date:datasetDate[4], money: sevenMidday1[4] },
									{ Date:datasetDate[5], money: sevenMidday1[5] },
									{ Date:datasetDate[6], money: sevenMidday1[6] }]},
		{name: "Afternoon" ,
						  Money: [	{ Date:datasetDate[0], money: sevenAfternoon1[0] },
									{ Date:datasetDate[1], money: sevenAfternoon1[1] },
									{ Date:datasetDate[2], money: sevenAfternoon1[2] },
									{ Date:datasetDate[3], money: sevenAfternoon1[3] },
									{ Date:datasetDate[4], money: sevenAfternoon1[4] },
									{ Date:datasetDate[5], money: sevenAfternoon1[5] },
						  			{ Date:datasetDate[6], money: sevenAfternoon1[6] }]},
		{name: "Evening" ,
						  Money: [	{ Date:datasetDate[0], money: sevenEvening1[0] },
									{ Date:datasetDate[1], money: sevenEvening1[1] },
									{ Date:datasetDate[2], money: sevenEvening1[2] },
									{ Date:datasetDate[3], money: sevenEvening1[3] },
									{ Date:datasetDate[4], money: sevenEvening1[4] },
									{ Date:datasetDate[5], money: sevenEvening1[5] },
						  			{ Date:datasetDate[6], money: sevenEvening1[6] }]}

	];


			var stack1 = d3.layout.stack()
   								.values(function(d){//获取或设置每一个系列值的訪问器函数
   									return d.Money;
   								})
   								.x(function(d){//获取或设置x轴訪问器函数
   									return d.Date;
   								})
   								.y(function(d)//获取或设置y轴訪问器函数
   								{
   									return d.money;
   								});

			var data1 =stack1(dataset1);


			// var padding ={left:80 ,top:50,right:100,bottom:30};

             //x轴比例尺
   			var xRange1 = width-padding.left-padding.right;
   			//序列比例尺 (设置x轴上每一个节点(年份)所显示的位置)
   			var xScale1 =d3.scale.ordinal()
   						  .domain(data1[0].Money.map(function(d){ //设置比例尺的定义域  (在x轴要显示的数据)
   						  	return d.Date;
   						  }))
   						  .rangeBands([0,xRange1],0.3);//为离散的块划分值域,(设置图表适合页面的宽度，显示位置)
    //Y轴比例尺
			//获得定义域最大值  (data[data.length-1]是最上面那个矩形，位于最高层，所以他的sales中的y0+y是最大的)
			var bigMoney = d3.max(data1[data1.length-1].Money,function(d)
			{
				return d.y+d.y0; //y0即该层起始坐标，y是高度
			});
			//获得值域最大值
			var yRange1 =height-padding.top-padding.bottom;
   			//线性比例尺
   			var yScale1 = d3.scale.linear()
   							.domain([0,bigMoney])   //定义域
   							.range([0,yRange1]); //值域



    // //颜色比例尺
   		var color = d3.scale.category20c();

 		//加入分组g标签 并设置颜色
 		var groupRect1 = svg1.selectAll("g")
 							.data(data1)
 							.enter()
 							.append("g")
 							.attr("fill",function(d,i)
 							{
 								return color(i);
 							});

 		//加入矩形
 		var rects1 = groupRect1.selectAll("rect")
 							.data(function(d)
 							{
 								return d.Money;
 							})
 							.enter()
 							.append("rect")
 							.attr("x",function(d,i){
 								return xScale1(d.Date); //x轴上坐标的位置
 							})
 							.attr("y",function(d,i){
 								return yRange1-(yScale1(d.y0+d.y));//Y轴上坐标的高度
 							})
 							.attr("width",function(d,i)
 							{
 								return xScale1.rangeBand(); //rangeBand()取得离散块的宽度，即x轴上各个矩形的宽度
 							})
							.attr("height",function(d,i)
							{
								return 0; //y为矩形的高度
							})
							//堆栈图偏移位置。即详细页面左边和顶部的位置
							.attr("transform","translate("+padding.left+","+padding.top+")")
							.transition().delay(function(d, i) { return i * 300; })
 							.attr("height",function(d,i)
 							{
 								return yScale1(d.y); //y为矩形的高度
 							})
 							 //堆栈图偏移位置。即详细页面左边和顶部的位置
 							.attr("transform","translate("+padding.left+","+padding.top+")");


 		//加入 x轴
 		var xAxis1 = d3.svg.axis()
 						.scale(xScale1)//取得比例尺
 						.orient("bottom");//设置显示的方位

 		svg1.append("g")
 			.attr("class","axis")
 			.attr("transform",function(d,i) //坐标位置
 			{
 				return "translate("+padding.left+","+(height-padding.bottom)+")";
 			})
 			.call(xAxis1)
 			//x轴坐标说明
 			.append("text")
 			.attr("x",function(d)
 			{
 				return width-padding.left-padding.right;
 			})
 			.text("Date");

 		//加入y轴
 		yScale1.range([yRange1,0]); //y轴上数据是从上到下递减

 		var yAxis1 = d3.svg.axis()
 						.scale(yScale1)
 						.orient("left");

 		svg1.append("g")
 			.attr("class","axis")
 			.attr("transform",function(d,i) //坐标位置
 			{
 				return "translate("+padding.left+","+(height-padding.bottom-yRange1)+")";
 			})
 			.call(yAxis1)
 			//y轴坐标说明
 			.append("text")
 			.text("fee")
 			.attr("x",function(d)
 			{
 				return -20;
 			});
	//分组标签
 		var labHeight1=50;
 		var labRadius1=10;
 		//圆形标识
 		var labelCircle1 = groupRect1.append("circle")
									.attr("cx",function(d)
									{
										return 0;
									})
									.attr("cy",function(d,i)
									{
										return padding.top*2+labHeight1*i*0.5;
									})
									.transition().delay(function(d, i) { return i * 300; })
 									.attr("cx",function(d)
 									{
 										return width-padding.right*0.98;
 									})
 									.attr("cy",function(d,i)
 									{
 										return padding.top*2+labHeight1*i*0.5;
 									})
 									.attr("r",labRadius1);
 		//文本文字
 		var labelText1 = groupRect1.append("text")
								.attr("x",function(d)
								{
									return width-padding.right*0.8;
								})
								.attr("y",function(d,i)
								{
									return padding.top*2+labHeight1*i*0.5;
								})
								.transition().delay(function(d, i) { return i * 300; })
 								.attr("x",function(d)
 								{
 									return width-padding.right*0.8;
 								})
								.attr("y",function(d,i)
								{
									return padding.top*2+labHeight1*i*0.5;
								})
								//dy使 文字显示和圆形的圆心在同一行
								 .attr("dy",function(d)
								{
									return labRadius1/2;
								})
								.text(function(d)
								{
									return d.name;
								});
}