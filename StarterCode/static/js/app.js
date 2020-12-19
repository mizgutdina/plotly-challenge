//Working link https://mizgutdina.github.io/plotly-challenge/StarterCode/ 

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
//2.Dropdown #1 (got help from my tutor on lines 20-172)
//(#selDataset)
//Create init 
function init() {
    var selector = d3.select("#selDataset"); //object selector is feeding dropdown
    //Grab values from samples.json 
    d3.json("samples.json").then((data) => {
        var sampleIDNames = data.names; //going into names
        console.log("IDs ", sampleIDNames);
        sampleIDNames.forEach((sample) => { //looping through the list of names ["940", "941", ...] & appending values to drop down
            selector.append("option").text(sample).property("value"); //in property: feeding key vs value (key=names; value=list of sampleIDs(940,etc))
        })
        //build chart with first sample id name (0th)
        buildPlot(sampleIDNames[0]);
        console.log(data);
        buildDemo(sampleIDNames[0]); 
    })

}
init();

//Event listener function #2
function optionChanged(newSample) {
//recall function inside option change (buildPlot(newsample))
    buildPlot(newSample);
    buildDemo(newSample); 
};

//3. Create a horizontal bar chart with a dropdown menu 
//to display the top 10 OTUs found in that individual.

//Unpack JSON

//Building plot by feeding the sample id value from above init function #3
function buildPlot(sample) { 
    d3.json("samples.json").then((data) => {
        //Filer function matching the id
        var samples = data.samples //going into "samples" object (that have ["id, otu_ids, "sample_values"...])
        var filteredData = samples.filter(sampleID => sampleID.id === sample)[0] //filteredData becomes object that was filtered by matching the sample (=id from dropdown) {id:940, otu_ids: [1167...]}
        console.log(samples)

        //Use sample_values as the values for the bar chart.
        //*****USE SLICE & REVERSE to display top 10 OTUs
        //Slice top 10 and reverse in descending order on the bar chart
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

        //trace, layout go here 
        //Bar chart
        let trace1 = {
            x: sample_values, 
            y: otu_ids.map(data=>`OTU ${data}`), //(`OTU ${otu_ids}`),
            text: otu_labels,
            type: "bar",
            orientation: "h"
            //showticklabels: true
        };
        var data = [trace1];

        let layout = {
            xaxis: { title: "Sample Values" },
            yaxis: { title: " " },
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
                color: otu_ids,
                colorscale: 'Earth'
                // color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)',
                //         'rgb(255, 0, 0)', 'rgb(204, 153, 255)', 'rgb(204, 255, 255)', 'rgb(255, 128, 0)',
                //         'rgb(0, 0, 255)', 'rgb(255, 51, 153)', 'rgb(0, 255, 0)'],

                // opacity: [1, 0.8, 0.6, 0.4, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.6]
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
        Plotly.newPlot("bubble", data2, layout2);

        
 
        
    }) 
};

//Demographic data 
function buildDemo(id) { //placeholder id is used in filteredMetadata for matching
    d3.json("samples.json").then((data) => {

        //data.metadata is an object "metadata" that contains "id", "ethnicity", "gender", etc
        var metadata = data.metadata //using metadata in filter step. Turns into list
        var filteredMetadata = metadata.filter(meta => meta.id == id)[0]; //filteredMetadata is an object that we get once we match the placeholder id with metadata id. We get {id:"940, "ethnicity":"Caucasion".....}
        // var filteredMetadata = metadata.filter( function(meta) {
        //     return meta.id === id;
        // });
        // var filteredMetadata = filteredMetadata[0];
        
        var panelbody = d3.select("#sample-metadata");
        console.log(panelbody);
        panelbody.html("");
        
        Object.entries(filteredMetadata).forEach(([key,value]) => {
            panelbody.append("h6").text(`${key} : ${value}`); //h6 is the font
            
            

        });
        
        //Gauge chart
        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1]}, //filteredMetadata.wfreq]} //[0,9]},
                value: filteredMetadata.wfreq,
                title: {text: "Belly Button Washing Frequency: Scrubs per Week"},
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: { range: [null, 9] } }
            }
        ];
        var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data3, layout3);


});
}
