//1. Use the D3 library to read in samples.json.

//Fetch JSON data and console.log it
d3.json("samples.json").then(function(data) {
    console.log(data);
});

const dataPromise = d3.json("samples.json");
console.log("Data Promise: ", dataPromise)
//Up to now works

//2. Create a horizontal bar chart with a dropdown menu 
//to display the top 10 OTUs found in that individual.

//Unpack JSON
//*****HOW TO CALL THE DATA NEEDED FOR CHARTS? */
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}

function buildPlot() {
    d3.json("samples.json").then(function(data) {
        //Grab values from samples.json to build the plots
        //Use sample_values as the values for the bar chart.
        var sample_values = data.samples.sample_values;

        //Use otu_ids as the labels for the bar chart.
        var otu_ids = data.samples.otu_ids;

        //Use otu_labels as the hovertext for the chart.
        var otu_labels = data.samples.otu_labels;


        console.log(sample_values, otu_ids, otu_labels);
    })
}

buildPlot();