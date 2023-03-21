
function draw_hist(ident, vals) {

    // A formatter for counts.
    var formatCount = d3.format(",0d");

    var margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 400 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    var x = d3.scale.linear()
        .domain([-5, 5])
        .range([0, width]);

    // Generate a histogram using twenty uniformly-spaced bins.
    var data = d3.layout.histogram()
        .bins(x.ticks(20))
        (vals);

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y + Math.sqrt(d.y); })])
        .range([height, 0]);

    correction = y(0);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(3)
        .tickFormat(function(d) { return '';})
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(4)
        //.tickFormat(function(d) { return ''; })
        .orient("left");

    var svg = d3.select(ident).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(data)
        .enter().append("svg:circle")
        .attr("stroke", "black")
        .attr("fill", function(d, i) { return "black" })
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .attr("r", function(d, i) { return 1 });

    svg.selectAll(".bar")
        .data(data)
        .enter().append("svg:line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", function(d) { return y(Math.sqrt(d.y))-correction; })
        .attr("y2", function(d) { return -y(Math.sqrt(d.y))+correction; })
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .attr("stroke", "black")
        .attr("stroke-width", 1)

    svg.selectAll(".bar")
        .data(data)
        .enter().append("svg:line")
        .attr("x1", -2)
        .attr("x2", 2)
        .attr("y1", function(d) { return y(Math.sqrt(d.y))-correction; })
        .attr("y2", function(d) { return y(Math.sqrt(d.y))-correction; })
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .attr("stroke", "black")
        .attr("stroke-width", 1)

    svg.selectAll(".bar")
        .data(data)
        .enter().append("svg:line")
        .attr("x1", -2)
        .attr("x2", 2)
        .attr("y1", function(d) { return -y(Math.sqrt(d.y))+correction; })
        .attr("y2", function(d) { return -y(Math.sqrt(d.y))+correction; })
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
        .attr("stroke", "black")
        .attr("stroke-width", 1)

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(data[0].dx))
        .attr("height", function(d) { return height - y(d.y); });

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height ) + ")")
        .call(xAxis);

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 20)
        .text("m (GeV)");

    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0, 0)")
        .call(yAxis);

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -20)
        .attr("dy", "-1em")
        .attr("dx", "-0.5em")
        .attr("transform", "rotate(-90)")
        .text("events");

    return svg;
}

function Histogram(ident) {
    // TODO: Allow for arbitrary numbers of events
    this.values = [];
    draw_hist(ident, []);

    this.add_events = function(num) {
        var new_vals = d3.range(num).map(d3.random.normal(0, 1));
        this.values = $.merge(this.values, new_vals);
        d3.select(ident).select("svg").remove();
        draw_hist(ident, this.values);
    }

    this.clear = function() {
        d3.select(ident).select("svg").remove();
        this.values = [];
        draw_hist(ident, []);
    }
}

