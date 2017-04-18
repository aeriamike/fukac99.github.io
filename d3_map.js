var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geoMercator()
    .translate([width / 2.2, height / 1.7]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

var path = d3.geoPath()
    .projection(projection);

var g = svg.append("g");

var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip hidden");

// load and display the World
d3.json("https://unpkg.com/world-atlas@1/world/50m.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries)
          .features)
    .enter()
      .append("path")
      .attr("d", path);
      
var trip_data = [{"lat" : 48.215567, "lon" : 16.354645, "name" : "Vienna, Austria"},
				 {"lat" : 59.334823, "lon" : 18.051397, "name" : "Stockholm, Sweden"},
				 {"lat" : 68.349822, "lon" : 18.829744, "name" : "Abisko, Sweden"},
				 {"lat" : 68.401975, "lon" : 15.028818, "name" : "Lofoten, Norway"},
				 {"lat" : 49.220593, "lon" : 18.725948, "name" : "Zilina, Slovakia"},
				 {"lat" : 48.769299, "lon" : 17.866317, "name" : "Zelena Voda, Slovakia"},
				 {"lat" : 49.089275, "lon" : 19.608975, "name" : "Liptovsky Mikulas, Slovakia"},
				 {"lat" : 48.964045, "lon" : 20.385249, "name" : "Podlesok, Slovakia"},
				 {"lat" : 47.662625, "lon" : 23.558505, "name" : "Baia Mare, Romania"},
				 {"lat" : 46.779538, "lon" : 23.608950, "name" : "Cluj-Napoca, Romania"},
				 {"lat" : 46.217893, "lon" : 24.788900, "name" : "Sighisoara, Romania"},
				 {"lat" : 45.514474, "lon" : 25.367078, "name" : "Bran, Romania"},
				 {"lat" : 45.652937, "lon" : 25.602984, "name" : "Brasov, Romania"},
				 {"lat" : 45.498800, "lon" : 25.578403, "name" : "Predeal, Romania"},
				 {"lat" : 44.435779, "lon" : 26.097375, "name" : "Bucharest, Romania"},
				 {"lat" : 43.077798, "lon" : 25.629002, "name" : "Veliko Tarnovo, Bulgaria"},
				 {"lat" : 43.627028, "lon" : 22.679694, "name" : "Belogradchik, Bulgaria"},
				 {"lat" : 43.213010, "lon" : 23.546738, "name" : "Vratsa, Bulgaria"},
				 {"lat" : 42.705439, "lon" : 23.297158, "name" : "Sofia, Bulgaria"},
				 {"lat" : 42.133314, "lon" : 23.549659, "name" : "Rila, Bulgaria"},
				 {"lat" : 42.271949, "lon" : 23.604295, "name" : "Borovets, Bulgaria"},
				 {"lat" : 42.146136, "lon" : 24.741558, "name" : "Plovdiv, Bulgaria"},
				 {"lat" : 41.838192, "lon" : 23.492494, "name" : "Bansko, Bulgaria"},
				 {"lat" : 41.940874, "lon" : 21.304953, "name" : "Matka Canyon, Macedonia"},
				 {"lat" : 42.005702, "lon" : 21.435874, "name" : "Skopje, Macedonia"},
				 {"lat" : 42.217693, "lon" : 20.721379, "name" : "Prizren, Kosovo"},
				 {"lat" : 42.450726, "lon" : 19.889191, "name" : "Valbone Valley, Albania"},
				 {"lat" : 42.058600, "lon" : 19.505837, "name" : "Shkodra, Albania"},
				 {"lat" : 42.424350, "lon" : 18.771442, "name" : "Kotor, Montenegro"}];

g.selectAll("circle")
 .data(trip_data)
 .enter()
 .append("circle")
 .attr("cx", function(d) {
        return projection([d.lon, d.lat])[0];
  })
 .attr("cy", function(d) {
        return projection([d.lon, d.lat])[1];
  })
 .attr("r", width / 300)
 .on("mousemove", showTooltip)
 .on("mouseout", hideTooltip)
 
 
 });

var zoom = d3.zoom()
    .on("zoom",function() {
        var z = d3.event.transform;
        g.attr("transform", z);
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
        
        g.selectAll("circle")
         .attr("r", width / 300 / z.k);
});

function hideTooltip(d) {
  // Show the tooltip (unhide it) and set the name of the data entry.
  tooltip
  .classed('hidden', true);
}

function showTooltip(d){
  var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
  tooltip
  .classed('hidden', false)
  .html(d.name)
  .attr('style', 
        'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
};

svg.call(zoom);