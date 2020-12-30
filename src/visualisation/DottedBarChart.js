
var DottedBarChart = {

  drawChart: function(values, headings, div_id)
  {

    // width and height of svg
    var svgWidth = 1500;
    var svgHeight = 600;

    // margins for the progress bars
    const horMargin = window.innerWidth/30;
    const vertMargin = window.innerHeight/30;

    // draw the svg for the chart
    const barSvg =  d3.select(div_id)
                            .append("svg")
                              .attr("width", svgWidth)
                              .attr("height", svgHeight)
                              .attr("align", "center")
                            .append("g")
                              .attr("transform", "translate(" + horMargin + ",0)")
                              .attr("text-anchor", "middle")
                              .attr("dominant-baseline", "central");

    // draw the bar chart bases
    barSvg.selectAll()
                .data(values)
                .enter()
                .append("rect")
                .attr("x", function(d, i) {
                  return (i-0.5) * width/4
                })
                .attr("y", height*1.7)
                .attr("height", height/10)
                .attr("width", width/4.5)
                .attr("rx", 5)
                .attr("ry", 5)
                .style("fill", function(d, i) {
                    return colorscale(i)
                })

    //draw labels for the topic bases
    barSvg.selectAll()
            .data(headings)
            .enter()
            .append("text")
            .attr("x", function(d, i) {
              pos = (i-0.5) * width/4 + width/9;
              return pos;
            })
            .attr("y", height*1.7 + 50)
            .style("font-size", "15px")
            .style("fill", function(d, i) {
              return colorscale(i)
            })
            .text( function(d, i) {
              return headings[i];
            })
  }

};
