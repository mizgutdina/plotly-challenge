//1. Use the D3 library to read in samples.json.

//Fetch JSON data and console.log it
//finish with /html("") demographics 
d3.json("samples.json").then(function(data) {
    console.log(data);
});

const dataPromise = d3.json("samples.json");
console.log("Data Promise: ", dataPromise)


function unpack(rows, index) {
    return rows.map(function(row) {
        return row[index];
    });
}
//2.Dropdown #1 (got help from my tutor on lines 20-65)
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
        //buildDemo(sampleIDNames[0]);
    })

}
init();

//Event listener function #2
function optionChanged(newSample) {
//recall function inside option change (buildPlot(neewsample))
    buildPlot(newSample);
    //buildDemo(newSample);
};

//3. Create a horizontal bar chart with a dropdown menu 
//to display the top 10 OTUs found in that individual.

//Unpack JSON

//Building plot by feeding the sample id value from above init function #3
function buildPlot(sample) {
    d3.json("samples.json").then((data) => {
        //Filer function matching the id
        var samples = data.samples 
        var filteredData = samples.filter(sampleID => sampleID.id === sample)[0]
        
        //Use sample_values as the values for the bar chart.
        
        var sample_values_all = filteredData.sample_values;
        var sample_values = sample_values_all.slice(0,10).reverse();
        //console.log(sample_values);
        
        //Use otu_ids as the labels for the bar chart.
        var otu_ids_all = filteredData.otu_ids;
        var otu_ids = otu_ids_all.slice(0,10).reverse();
        //console.log(otu_ids)

        //Use otu_labels as the hovertext for the chart.
        var otu_labels_all = filteredData.otu_labels;
        var otu_labels = otu_labels_all.slice(0,10).reverse();

        console.log(sample_values);
        console.log(otu_ids);
        console.log(otu_labels);

        //trace, layout go here *****USE SLICE & REVERSE to display top 10 OTUs
        let trace1 = {
            x: sample_values, 
            y: (`OTU ${otu_ids}`), //how to put OTU in front of ID
            text: otu_labels,
            type: "bar",
            orientation: "h"
            //showticklabels: true
        };
        var data = [trace1];

        let layout = {
            xaxis: { title: "Sample Values" },
            yaxis: { title: "Top 10 OTU IDs" },
        };

        Plotly.newPlot("bar",data, layout);

        //Buble chart
        // Use otu_ids for the x values.
        // Use sample_values for the y values.
        // Use sample_values for the marker size.
        // Use otu_ids for the marker colors.
        // Use otu_labels for the text values.
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)',
                        'rgb(255, 0, 0)', 'rgb(204, 153, 255)', 'rgb(204, 255, 255)', 'rgb(255, 128, 0)',
                        'rgb(0, 0, 255)', 'rgb(255, 51, 153)', 'rgb(0, 255, 0)'],

                opacity: [1, 0.8, 0.6, 0.4, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6]
            }
        };
        var data2 = [trace2];
        var layout2 = {
            title: " ",
            showlegend: false,
            xaxis: { title: "OTU ID" },
            height: 500,
            width: 900
        };
        Plotly.newPlot("bubble", data2, layout2)
 
        
    }) 
};

// function buildDemo (sample) {
//     d3.json("samples.json").then((data) => {
// //Demographic data
//         var metadata = d3.select("#sample-metadata");
//         var metadataSamples = data.metadata
//         var filteredMetadata = metadataSamples.filter(metadataSampleID => metadataSampleID.id === sample)[0];
//         var id = filteredMetadata.id
//         console.log(id)
//         // Object.keys


// };
//buildPlot();
//id directly
//Plotly.NewPlot("bar",trace1, layout);