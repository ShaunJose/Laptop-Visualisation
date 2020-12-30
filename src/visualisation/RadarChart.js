// Code modified from https://gist.github.com/nbremer/6506614 -->

// var used to check if more (in-depth/interactive) info is displayed
var moreInfoIndex = null

var RadarChart = {
  /*
    Draws a radar chart

    @param id: id of the html element to draw the chart in
    @param d: data to display in the radar chart
  */
  drawChart: function(id, d) {

    // set up default configurations
    var cfg = {
  	 radius: 5,
  	 w: width,
  	 h: height,
  	 factor: 1,
  	 factorLegend: .85,
  	 levels: 6,
  	 maxValue: 0.6,
  	 radians: 2 * Math.PI,
  	 opacityArea: 0.5,
  	 ToRight: 5,
  	 TranslateX: 100,
  	 TranslateY: 100,
  	 ExtraWidthX: 300,
  	 ExtraWidthY: 130
  	};

    // set up chart variables
  	cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, function(i) {
      return d3.max( i.map( function(o) { return o.value; } ))
    } ));
  	var allAxis = (d[0].map(function(i, j) { return i.axis } ));
  	var total = allAxis.length;
  	var radius = cfg.factor * Math.min(cfg.w/2, cfg.h/2);
  	var Format = d3.format(".2f");

    // Remove any previous svgs and draw new svg
    d3.select(id).select("svg").remove();
  	var g = d3.select(id)
          			.append("svg")
          			.attr("width", cfg.w + cfg.ExtraWidthX)
          			.attr("height", cfg.h + cfg.ExtraWidthY)
          			.append("g")
          			.attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

  	var tooltip;

  	// Spider "inner webs"
  	for(var j = 0 ; j < cfg.levels - 1 ; j++)
    {
  	  var levelFactor = cfg.factor * radius * ( (j + 1) / cfg.levels );
  	  g.selectAll(".levels")
    	   .data( allAxis )
    	   .enter()
    	   .append("svg:line")
    	   .attr("x1", function(d, i) { return levelFactor * (1 - cfg.factor * Math.sin( i * cfg.radians/total ) );
         })
    	   .attr("y1", function(d, i) { return levelFactor * (1 - cfg.factor * Math.cos(i * cfg.radians/total ) );
         })
    	   .attr("x2", function(d, i) { return levelFactor * (1 - cfg.factor * Math.sin( (i + 1) * cfg.radians/total ) );
         })
    	   .attr("y2", function(d, i) { return levelFactor * (1 - cfg.factor * Math.cos( (i + 1) * cfg.radians/total ) );
         })
    	   .attr("class", "line")
    	   .style("stroke", "white")
    	   .style("stroke-opacity", "0.75")
    	   .style("stroke-width", "0.3px")
    	   .attr("transform", "translate(" + (cfg.w/2-levelFactor) + ", " + (cfg.h/2-levelFactor) + ")");
  	}

  	//Text indicating at what % each level is
  	for(var j = 0 ; j < cfg.levels ; j++)
    {
  	  var levelFactor = cfg.factor * radius * ( (j + 1) / cfg.levels);
  	  g.selectAll(".levels")
    	   .data([1]) //dummy data
    	   .enter()
    	   .append("svg:text")
    	   .attr("x", function(d) { return levelFactor * (1 - cfg.factor * Math.sin(0) );
         })
    	   .attr("y", function(d) { return levelFactor * (1 - cfg.factor * Math.cos(0) );
         })
    	   .attr("class", "legend")
    	   .style("font-family", "sans-serif")
    	   .style("font-size", "10px")
    	   .attr("transform", "translate(" + (cfg.w/2 - levelFactor + cfg.ToRight) + ", " + (cfg.h/2 - levelFactor) + ")")
    	   .attr("fill", "darkgray")
    	   .text(Format(((j + 1) * cfg.maxValue/cfg.levels)));
  	}

  	series = 0;

    // draw axes
  	var axis = g.selectAll(".axis")
            			.data(allAxis)
            			.enter()
            			.append("g")
            			.attr("class", "axis");

  	axis.append("line")
  		.attr("x1", cfg.w/2)
  		.attr("y1", cfg.h/2)
  		.attr("x2", function(d, i) { return cfg.w / 2 * (1 - cfg.factor * Math.sin(i * cfg.radians/total) );
      })
  		.attr("y2", function(d, i) { return cfg.h / 2 * (1 - cfg.factor * Math.cos(i * cfg.radians/total) );
      })
  		.attr("class", "line")
  		.style("stroke", "darkgray")
  		.style("stroke-width", "1px");

    // draw text indicating axes' levels
  	axis.append("text")
  		.attr("class", "legend")
  		.text( function(d) { return d } )
  		.style("font-family", "sans-serif")
  		.style("font-size", "11px")
  		.attr("text-anchor", "middle")
  		.attr("dy", "1.5em")
  		.attr("transform", function(d, i) { return "translate(0, -10)" } )
  		.attr("x", function(d, i) { return cfg.w / 2 * (1 - cfg.factorLegend * Math.sin(i * cfg.radians/total)) - 60 * Math.sin(i * cfg.radians/total);
      })
  		.attr("y", function(d, i) { return cfg.h / 2 * (1 - Math.cos(i * cfg.radians/total)) - 20 * Math.cos(i * cfg.radians/total);
      });

    // draw the polygons
  	d.forEach(function(y, x) {
  	  dataValues = [];
  	  g.selectAll(".nodes")
  		.data(y, function(j, i) {
  		  dataValues.push([
  			cfg.w/2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians/total)),
  			cfg.h/2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians/total))
  		  ]);
  		});
  	  dataValues.push(dataValues[0]);
  	  g.selectAll(".area")
  					 .data([dataValues])
  					 .enter()
  					 .append("polygon")
  					 .attr("class", "radar-chart-serie"+series)
  					 .style("stroke-width", "2px")
  					 .style("stroke", colorscale(series))
  					 .attr("points",function(d) {
  						 var str = "";
  						 for(var pti = 0 ; pti < d.length ; pti++){
  							 str = str + d[pti][0] + "," + d[pti][1] + " ";
  						 }
  						 return str;
  					  })
  					 .style("fill", function(j, i) { return colorscale(series) })
  					 .style("fill-opacity", cfg.opacityArea)
  					 .on('mouseover', function (d) {
  										z = "polygon." + d3.select(this).attr("class");
  										g.selectAll("polygon")
  										 .transition(200)
  										 .style("fill-opacity", 0.1);
  										g.selectAll(z)
  										 .transition(200)
  										 .style("fill-opacity", .7);
  									  })
  					 .on('mouseout', function(){
  										g.selectAll("polygon")
  										 .transition(200)
  										 .style("fill-opacity", cfg.opacityArea);
  					 });
  	  series++;
  	});
  	series = 0;

    // Drawing points
  	d.forEach(function(y, x) {
  	  g.selectAll(".nodes")
  		.data(y)
      .enter()
  		.append("svg:circle")
  		.attr('r', cfg.radius)
  		.attr("alt", function(j) { return Math.max(j.value, 0) } )
  		.attr("cx", function(j, i){
  		  dataValues.push([
  			cfg.w / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians/total)),
  			cfg.h / 2 * (1 - (parseFloat(Math.max(j.value, 0)) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians/total))
  		]);
  		return cfg.w / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.sin(i * cfg.radians/total));
  		})
  		.attr("cy", function(j, i) {
  		  return cfg.h / 2 * (1 - (Math.max(j.value, 0) / cfg.maxValue) * cfg.factor * Math.cos(i * cfg.radians/total));
  		})
  		.attr("data-id", function(j) { return j.axis })
  		.style("fill", colorscale(series)).style("fill-opacity", .9)
  		.on('mouseover', function (d){
  					newX =  parseFloat(d3.select(this).attr('cx')) - 10;
  					newY =  parseFloat(d3.select(this).attr('cy')) - 5;

  					tooltip
  						.attr('x', newX)
  						.attr('y', newY)
  						.text(Format(d.value))
  						.transition(200)
  						.style('opacity', 1);

  					z = "polygon."+d3.select(this).attr("class");
  					g.selectAll("polygon")
  						.transition(200)
  						.style("fill-opacity", 0.1);
  					g.selectAll(z)
  						.transition(200)
  						.style("fill-opacity", .7);

            d3.select(this).attr("cursor", "pointer"); })
  		.on('mouseout', function(){
  					tooltip
  						.transition(200)
  						.style('opacity', 0);
  					g.selectAll("polygon")
  						.transition(200)
  						.style("fill-opacity", cfg.opacityArea);
  				  })
      .on('click', id === "#more_info_div" ? null : displayMoreInfo )
  		.append("svg:title")
  		.text(function(j) { return Math.max(j.value, 0) } );

  	  series++;
  	});
  	//Tooltip
  	tooltip = g.append('text')
  			   .style('opacity', 0)
  			   .style('font-family', 'sans-serif')
  			   .style('font-size', '13px');

     // write spec i if moreInfo is shown
     if(id === "#more_info_div" && moreInfoIndex !== null)
     {
       var moreInfoText = getText(moreInfoIndex);

       //adding spec i
       g.append("text")
        .attr("font-variant", "small-caps")
        .attr("font-style", "italic")
        .attr("fill", "lightgreen")
        .attr("x", "-15%")
        .attr("y", "-7%")
        .attr("font-size", "20px")
        .text(moreInfoText)

        // remove linebreak and description (in case they already exist)
        d3.select("#break").remove()
        d3.select("#more_info_desc").remove()

        // setting up variables for description
        let arr = d[0]
        let tmp = getMaxWithIndex(arr)
        let maxTime = tmp.maxVal
        let maxIndex = tmp.maxInd

         // if value is high enough, add linebreak and descripton
         if(maxTime >= 0.17) //10 mins
         {
           d3.select("#body").append("br") //break for spacing
                    .attr("id", "break")

           d3.select("#body").append("text") //description
            .attr("font-family", "Times New Roman")
            .attr("id", "more_info_desc")
            .style("font-style", "italic" )
            .style("font-size", "17px")
            .text(moreInfoDescription.replace("COMPONENT", arr[maxIndex].axis))
         }
     }

   }, //end of drawChart function

    drawButtons: function(id)
    {
      //get container
      var container = d3.select("#body")

      //breaks
      container.append("br")
      container.append("br")

      //add the buttons
      container.selectAll()
               .data(axisTitles)
               .enter()
               .append("button")
               .style("background", "darkcyan")
               .text(function(d) { return d; } )
               .on("click", displayMoreInfo)
    }
};

/////////////////////////////////////////////
/////////// Event-based Functions ///////////
/////////////////////////////////////////////

function displayMoreInfo(d, i)
{
  if(moreInfoIndex != null) // if more_info stuff already exists
  {
    // delete div (with the additional information)
    d3.select("#more_info_div").remove()
    d3.select("#break").remove()

    if(moreInfoIndex === i) // if user clicks already displayed info
    {
      // set moreInfoIndex to null and quit
      moreInfoIndex = null
      return;
    }
  }

  moreInfoIndex = i;

  //draw div container for additional radar chart
  d3.select("#body")
    .append("div")
    .attr("id", "more_info_div")


  //send to dotted bar chart drawer
  values = [67,84,54,1125,43,23,65,86,34,23,54,65,23,54,7,78,23,43,23];
  headings = ["Apple", "HP", "Acer", "Asus", "Dell", "Lenovo","Chuwi", "MSI", "Microsoft", "Toshiba", "Huawei", "Xiaomi","Vero", "Razer", "Mediacom", "Samsung", "Google", "Fujistu", "LG"];
  DottedBarChart.drawChart(values, headings, "#more_info_div");

  // absolutely_random_data = JSON.parse(JSON.stringify(getData(i)));
  // RadarChart.drawChart("#more_info_div", absolutely_random_data)
}

/*
  Takes an array of objects and returns an object with the maximum value and the index of the object in the array with the maximum value
*/
function getMaxWithIndex(array)
{
  var maxVal = -Infinity
  var maxInd = -1

  //getting maximum values
  array.forEach(function (v, k) {
       if (maxVal < +v.value)
       {
           maxVal = +v.value;
           maxInd = k;
       }
   });

   return { "maxVal": maxVal , "maxInd": maxInd }
}

function getData(index)
{
  something = [[
  { axis: "fields[0]", value: 29 },
  { axis: "fields[1]", value: 105 },
  { axis: "fields[2]", value: 12 },
  { axis: "fields[3]", value: 85.6 },
  { axis: "fields[4]", value: 75 }
]];

  return something;
}

function getText(index)
{
  text = "";
  switch(index)
  {
    case 0: return "Screen Size (inches)";
    case 1: return "Price (euros)";
    case 2: return "Weight (grams)";
    case 3: return "Hard disk Memory (GB)";
    case 4: return "RAM (GB)";
    default: return "";
  }
}
