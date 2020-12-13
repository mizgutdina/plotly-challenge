//1. Use the D3 library to read in samples.json.

//Fetch JSON data and console.log it
d3.json("samples.json").then(function(data) {
    console.log(data);
});

const dataPromise = d3.json("samples.json");
console.log("Data Promise: ", dataPromise)
//Up to now works
function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}
//2.Dropdown
//(#selDataset)
//Create init 
function init() {
    var selector = d3.select("#selDataset");
    //Grab values from samples.json 
    d3.json("samples.json").then((data) => {
        var sampleIDNames = data.names;
        console.log("IDs ", sampleIDNames);
        sampleIDNames.forEach((sample) => {
            selector.append("option").text(sample).property("value");
        })
        //build chart with first id name
        buildPlot(sampleIDNames[0]);
    })

}
init();

//Event listener function
function optionChanged(newSample) {
//recall function inside option change (buildPlot(neewsample))
    buildPlot(newSample);
};

//3. Create a horizontal bar chart with a dropdown menu 
//to display the top 10 OTUs found in that individual.

//Unpack JSON

//Building plot by feeding the sample id value from above init function
function buildPlot(sample) {
    d3.json("samples.json").then((data) => {
        //Filer function matching the id
        var samples = data.samples 
        var filteredData = samples.filter(sampleID => sampleID.id === sample)[0]
        
        //Use sample_values as the values for the bar chart.
        var sample_values = filteredData.sample_values;
        
        //Use otu_ids as the labels for the bar chart.
        var otu_ids = filteredData.otu_ids;

        //Use otu_labels as the hovertext for the chart.
        var otu_labels = filteredData.otu_labels;

        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);
        //trace, layout go here *****USE SLICE & REVERSE to display top 10 OTUs
        var trace1 = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar"
        };

        var layout = {
            xaxis: {"OTU ": sample_values},
            yaxis: {otu_ids}
        }
        //Plotly.NewPlot("bar",trace1, layout);
    }) 
}

//buildPlot();
//id directly
Plotly.NewPlot("bar",trace1, layout);