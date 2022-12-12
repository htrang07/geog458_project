function map() {
  var width = 1000,
    height = 700

  var svg = d3 //adding svg container
    .select("#map")
    .append("svg")
    .attr("width", width + 500)
    .attr("height", height)
    .append("g");

  var tooltip = d3
    .select("#map")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  d3.json("assets/units.geojson").then((data) => {
    const sizes = data.features.map(f=>+f.properties.NET_UNITS);
    var seattleMap;
    min_value = d3.min(data.features, d => (+d.properties.NET_UNITS))
    max_value = d3.max(data.features, d => (+d.properties.NET_UNITS))
    color = d3.scaleSequential([min_value, max_value], d3.interpolateTurbo);


    d3.json("assets/census.geojson").then((seattle) => {
      var projection = d3.geoMercator().fitSize([width, height], seattle);
      var path = d3.geoPath()
        .projection(projection)
        .pointRadius(1.2);
      //loading seattle json file for making map
      seattleMap = svg.append('g')
        .attr('class', 'boundary')
        .selectAll("path")
        .data(seattle.features)
        .enter()
        .append('path')
        .attr('d', path)
        .style('stroke', 'grey')
        .attr("stroke-opacity", 0.5)
        .call(d3.zoom().on("zoom", function () {
                  svg.attr("transform", d3.event.transform)
               }))

      svg.append('g').selectAll('path')
           	.data(data.features)
           	.enter()
             .append('path')
           	.attr('d', path)
             .style('fill', d => {
                 return color(d.properties.NET_UNITS)
               })
               .attr("fill-opacity", 0.7)
               .attr("r", .1)
               .style('stroke', 'none')
              .on("mouseover", function (d, i) {

          tooltip.transition().style("opacity", 1);
          tooltip
            .html(
              `<span style="font-size:20px">Address: ${d.properties.ADDRESS}<br></span>
              <span style="font-size:20px">Net Units: ${d.properties.NET_UNITS}
              <span style="font-size:20px"><br>Value: ${d.properties.VALUE}<br></span>`
            )
            .style("visibility", "visible") //adding values on tooltip
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 30 + "px");
        })
          tooltip
            .style("visibility", "none")
            .transition()
            .duration(300)
            .style("opacity", 0);

      // legend
      const legend = svg.append('g')
        .attr('transform', 'translate(20, 100)');
//min
          legend.append('circle')
        .style('fill', color(min_value))
        .attr('r', 10)
          legend.append('text')
          .style('fill', color(min_value))
          .attr('x', 15)
          .style('alignment-baseline', 'middle')
          .text("Demolished, -250")

//-100
legend.append('circle')
.style('fill', color(-100))
.attr('r', 10)
.attr('cy', 25)
legend.append('text')
  .style('fill', color(-100))
  .attr('x', 15)
  .style('alignment-baseline', 'middle')
  .attr('y', 25)
  .text("Demolished, -100")



  //1
          legend.append('circle')
          .style('fill', color(1))
          .attr('r', 10)
          .attr('cy', 50)
          legend.append('text')
            .style('fill', color(1))
            .attr('x', 15)
            .style('alignment-baseline', 'middle')
            .attr('y', 50)
            .text(1)

  //50
  legend.append('circle')
  .style('fill', color(50))
  .attr('r', 10)
  .attr('cy', 75)
  legend.append('text')
    .style('fill', color(50))
    .attr('x', 15)
    .style('alignment-baseline', 'middle')
    .attr('y', 75)
    .text(50)




  //100
  legend.append('circle')
  .style('fill', color(100))
  .attr('r', 10)
  .attr('cy', 100)
  legend.append('text')
    .style('fill', color(100))
    .attr('x', 15)
    .style('alignment-baseline', 'middle')
    .attr('y', 100)
    .text(100)



  //150
  legend.append('circle')
  .style('fill', color(150))
  .attr('r', 10)
  .attr('cy', 125)
  legend.append('text')
    .style('fill', color(150))
    .attr('x', 15)
    .style('alignment-baseline', 'middle')
    .attr('y', 125)
    .text(150)

//200
legend.append('circle')
  .style('fill', color(200))
  .attr('r', 10)
  .attr('cy', 150)
  legend.append('text')
    .style('fill', color(200))
    .attr('x', 15)
    .style('alignment-baseline', 'middle')
    .attr('y', 150)
    .text(200)


//300
legend.append('circle')
  .style('fill', color(300))
  .attr('r', 10)
  .attr('cy', 175)
  legend.append('text')
    .style('fill', color(300))
    .attr('x', 15)
    .style('alignment-baseline', 'middle')
    .attr('y', 175)
    .text(300)



//400
legend.append('circle')
  .style('fill', color(400))
  .attr('r', 10)
  .attr('cy', 200)
  legend.append('text')
    .style('fill', color(400))
    .attr('x', 15)
    .style('alignment-baseline', 'middle')
    .attr('y', 200)
    .text(400)



//500
legend.append('circle')
  .style('fill', color(500))
  .attr('r', 10)
  .attr('cy', 225)
  legend.append('text')
    .style('fill', color(500))
    .attr('x', 15)
    .style('alignment-baseline', 'middle')
    .attr('y', 225)
    .text(500)



  //max
          legend.append('circle')
            .style('fill', color(max_value))
            .attr('r', 10)
            .attr('cy', 250)
          legend.append('text')
              .style('fill', color(max_value))
              .attr('x', 15)
              .style('alignment-baseline', 'middle')
              .attr('y', 250)
              .text(max_value)
    });
  });
}
