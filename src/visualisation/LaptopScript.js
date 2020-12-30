// Code modified from https://gist.github.com/nbremer/6506614

// init the variables
var width = 300,
	height = 280;
var fields = [];
var averages = [];

// get data from json files
theFunc(fields, averages);

// waiting for the data fetching function to finish, before drawing charts
setTimeout(function() {

//Set data in 2d array
var data = [
		  [
			{ axis: fields[0], value: averages[0] },
			{ axis: fields[1], value: averages[1] },
			{ axis: fields[2], value: averages[2] },
			{ axis: fields[3], value: averages[3] },
			{ axis: fields[4], value: averages[4] }
			]
		];

// draw radar chart using data
RadarChart.drawChart("#chart_div", data);

}, 500);

function theFunc(fields)
{
	fetch("./preprocessed_data/field_headings.json")
			.then(response => response.json())
			.then(data => {
				for(var i = 0; i < data.length; i++)
				{
					fields.push(data[i]);
				}
			});

	fetch("./preprocessed_data/average_values.json")
			.then(response => response.json())
			.then(data => {
				for(var i = 0; i < data.length; i++)
					averages.push(data[i]);
			});
}
