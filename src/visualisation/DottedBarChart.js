
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
                .attr("y", height*1.9)
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
            .attr("y", height*1.9 + 50)
            .style("font-size", "15px")
            .style("fill", function(d, i) {
              return colorscale(i)
            })
            .text( function(d, i) {
              return headings[i];
            })

    //setup variables for the dots in the dotted column chart
    const cols = 5
    const rad = width/150
    const valuesNum = values.length

    //draw circles (dotted column chart)
    for(let i = 0; i < valuesNum; i++)
    {
      //draw blocks of circles
      const rows = Math.floor(values[i]/cols)
      for(let j = 0; j < rows; j++)
      {
        for(let k = 0; k < cols; k++)
        {
          barSvg.append("circle")
                      .attr("r", rad)
                      .attr("cx", ((i-0.5) * width/4) + 5 + k * width/(4.5 * cols))
                      .attr("cy", height*1.9 - 10 - j * 10)
                      .style("fill", colorscale(i))
        }
      }

      //draw last row of remaining circles, if any
      const remainingCols = values[i] - (cols * rows)
      for(let j = 0; j < remainingCols; j++)
      {
        barSvg.append("circle")
                    .attr("r", rad)
                    .attr("cx", ((i-0.5) * width/4) + 5 + j * width/(4.5 * cols))
                    .attr("cy", height*1.9 - 10 - rows * 10)
                    .style("fill", colorscale(i))
      }

    //draw the value text on top of the topmost dot row
    barSvg.append("text")
                .attr("x", (i-0.5) * width/4 + width/9)
                .attr("y", height*1.9 - 15 - (rows + 1) * 10.5)
                .style("font-size", "17px")
                .style("fill", colorscale(i))
                .text(values[i])
    }
  }
};
