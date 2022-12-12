function map() {
  var width = 500,
    height = 600
  var svg = d3 
    .select("#map")
    .append("svg")
    .attr("width", width + 250 + 250)
    .attr("height", height + 150 + 150)
    .append("g")
  var tooltip = d3
    .select("#map")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

  d3.json("assets/units.geojson").then((data) => {
    var seattleMap;
    d3.json("assets/census.geojson").then((seattle) => {
      var projection = d3.geoMercator().fitSize([width, height], seattle);
      var path = d3.geoPath().projection(projection);
      seattleMap = svg 
        .append("g")
        .selectAll("path")
        .data(seattle.features)
        .enter()
        .append("path")
        .call(d3.zoom().on("zoom", function () {
                  svg.attr("transform", d3.event.transform)
               }))
        .attr("d", path)
        .attr("fill", function (d) {
          return "grey";
        })
        .style("stroke", "black");

      svg.selectAll()
        .data(data.features)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return projection([d.properties.LONGITUDE, d.properties.LATITUDE])[0];
        })
        .attr("cy", function (d) {
          return projection([d.properties.LONGITUDE, d.properties.LATITUDE])[1];
        })
        .attr("r", 1.5)
        .attr("class", "circle")
        .attr("stroke", "#BFB9FA")
        .attr("stroke-width", 1)
        .attr("fill-opacity", 0.4)
        .on("mouseover", function (d, i) {

        d3.select();
          tooltip.transition().style("opacity", 1);
          tooltip
            .html(
              `<span style="font-size:20px">Address: ${d.properties.ADDRESS}<br></span><span style="font-size:20px">Dwelltype Name: ${d.properties.DWELTYPE}`
            )
            .style("visibility", "visible") 
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 20 + "px");
        })
        });
    });
}
