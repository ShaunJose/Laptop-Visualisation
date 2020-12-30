// Code modified from https://gist.github.com/nbremer/6506614
var width = 300,
	height = 280;

const colorscale = d3.scaleOrdinal(d3.schemeCategory10);


var fields = [];
var averages = [];

theFunc(fields, averages);
setTimeout(function() {
	console.log(fields.length);
	console.log(fields[0]);

var legendOptions = [ 'You', 'Average' ];
var boxesChecked = [ true, false ]
var axisTitles = [ "Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5" ];

//Data
var data = [
		  [
			{ axis: fields[0], value: averages[0] },
			{ axis: fields[1], value: averages[1] },
			{ axis: fields[2], value: averages[2] },
			{ axis: fields[3], value: averages[3] },
			{ axis: fields[4], value: averages[4] }
			]
		];

// draw shtuff
RadarChart.drawChart("#chart_div", data);

}, 1000);

function theFunc(fields)
{
	fetch("./preprocessed_data/field_headings.json")
			.then(response => response.json())
			.then(data => {
				for(var i = 0; i < data.length; i++)
				{
					fields.push(data[i]);
				}
				console.log("HERE:" + fields.length);
			});

	fetch("./preprocessed_data/average_values.json")
			.then(response => response.json())
			.then(data => {
				for(var i = 0; i < data.length; i++)
					averages.push(data[i]);
			});
}
