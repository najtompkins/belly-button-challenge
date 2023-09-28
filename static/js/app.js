const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// establish the promise
promise = d3.json(url)

// log the data
promise.then((data) => console.log(data))

// CODE FROM LUIS NORDA \/
// Primary action on page: interaction with the dropdown menu to repopulate charts based on selected sample ID
d3.select("#selDataset").on("change", function() {
  const selectedValue = d3.select(this).property("value");
  optionChanged(selectedValue);
});
// CODE FROM LUIS NORDA /\

// Priary action calls this function to update the graphs,
function optionChanged(selectedValue) {
  // verify selectedValue (ID of sample)
  console.log(selectedValue)


  promise.then(function(data) {
    console.log("The Bar is being updated")
  
    // Due to the organization of the data, the names and their indexes are consistent accross the data, meaning that the index of ID:X is the same as the sample data of ID:X.
    // Using this organiztion to our advatage we can find the index of an id and feed it into the update functions.
    // startingValue is the index value of the selected ID
    let startingValue = data.names.indexOf(selectedValue)
    console.log(startingValue)
  
    // Feeding the index value into the indexes to then set the data sample being pulled into variables
    console.log(`The index of the ID is ${startingValue}`)
    let sampleData = data.samples[startingValue]
    let metaData = data.metadata[startingValue]

    // Feed the data selected into the update functions
    updateBar(sampleData)
    updateBubble(sampleData)
    updateMetaData(metaData)
  })
}

// UPDATE FUNCTION
function updateBar(sampleData) {

  // list to hold the moidified utc_ids
  let modifiedLabels = []
  
  // CODE FROM LUIS NORDA \/ 
  // Adding a string to the OTU_Labels to more clearly distinguish them from integers.
  let idsLabels = sampleData.otu_ids.map(function(number) {
    return 'OTU ' + number;
  });
  // CODE FROM LUIS NORDA /\

    // Pushing the updated labels the list
      for (i = 0; i < sampleData.otu_labels.length; i++) 
      {
      modifiedLabels.push(idsLabels[i])
      } 

  // Setting the sliced and reversed data (top 10) to each corresponding axis variable
  let x = sampleData.sample_values.slice(0,10).reverse()
  let y = idsLabels.slice(0,10).reverse()

  // Setting the dynamic title to a variable
  let title = {title: `Top 10 UTC Id's for participant #${sampleData.id}`}

  // Restyling and updating the charts with the new sample data
  Plotly.restyle("barChart", "x", [x]);
  Plotly.restyle("barChart", "y", [y]);
  Plotly.update("barChart", {}, title);
}
// UPDATE FUNCTION
function updateBubble(sampleData) {

    // Updating the bubble chart with new values
    let x = sampleData.otu_ids
    let y = sampleData.sample_values
    let text = sampleData.otu_labels
    let marker =  {
              color: sampleData.otu_ids.map(val => fColor(val)),
              opacity: sampleData.otu_ids.map(val => fOp(val)),
              size: sampleData.sample_values
              }
    
    // Setting the dynamic title to a variable
    let title = {title: `Buble visualization for all UTC Id's for participant #${sampleData.id}`}

    // Restyling and updating the charts with the new sample data
    Plotly.restyle("bubbleChart", "x", [x])
    Plotly.restyle("bubbleChart", "y", [y])
    Plotly.restyle("bubbleChart", "text", [text]);
    Plotly.restyle("bubbleChart", "marker", [marker]);
    Plotly.update("bubbleChart", {}, title);

}

// UPDATE FUNCTION
function updateMetaData(metaData) {

  // Updating the Meta Data panel chart with new values, first removing the previously initialized/populated divs.
  d3.selectAll(".appended-data").remove()

  let div = d3.select("#sample-metadata").style("font-weight", "bold")
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.id}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.ethnicity}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.gender}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.age}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.location}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.wfreq}`)
}

// INIT() FUNCTION
// Populate the dropdown menu
function populateDropdown(data) {

  // Select the dropdown menu
  let dropdownMenu = d3.select("#selDataset")

  // Append a new option to the dopdown for every ID in the names array of the data
  for (i =0; i < data.names.length; i++) 
      {
      dropdownMenu.append("option").text(data.names[i])
      }
}

// INIT() FUNCTION
// Initialize the page with the panel and chart data of the first sample value in the dataset. (The ID will be the string '940')
function init(firstID) {

  promise.then(function(data) {
  // Log
  console.log("The Page is being initialized")

  // startingValue is the index value of the selected ID (init() parameter)
  let startingValue = data.names.indexOf(firstID)
  console.log(startingValue)

  // Feeding the index value into the indexes to then set the data sample being pulled into variables
  let sampleData = data.samples[startingValue]
  let metaData = data.metadata[startingValue]

  // Initial population of the dropdown menu
  populateDropdown(data)


  // Feed the data selected into the init() functions
  initBar(sampleData)
  initBubble(sampleData)
  initMetadata(metaData)
})
}

// INIT() FUNCTION
// Initiale the bar graph with sample ID:940
function  initBar(sampleData) {

  // list to hold the moidified utc_ids
  let modifiedLabels = []

  // CODE FROM LUIS NORDA \/ 
  // Adding a string to the OTU_Labels to more clearly distinguish them from integers.
  let idsLabels = sampleData.otu_ids.map(function(number) {
    return 'OTU ' + number;
  });
  // CODE FROM LUIS NORDA /\

      for (i = 0; i < sampleData.otu_labels.length; i++) 
      {
      modifiedLabels.push(idsLabels[i])
      } 

  //CREATING A BAR CHART
  var trace1 =  {
    // Setting the sliced and reversed data (top 10) to each corresponding axis variable
    x: sampleData.sample_values.slice(0,10).reverse(),
    y: idsLabels.slice(0,10).reverse(), 
    text: sampleData.otu_labels.slice(0,10).reverse(),
    type: 'bar', 
    orientation: 'h'
            };

  var data = [trace1];

  var layout = {
    // Setting the dynamic title to a variable
      title: `Top 10 OTU ID's for participant #${sampleData.id}`,
      xaxis: { title: 'Quantity of Samples Found' },
      yaxis: { title: 'OTU ID' },
      margin: { l: 100, r: 20, t: 40, b: 40 } // Adjust the margins as needed
  };
  
  Plotly.newPlot('barChart', data, layout);
}

// INIT() FUNCTION
// Initiale the bubble graph with sample ID:940
function initBubble(sampleData) {

    // Creating the bubble chart
    var trace1 = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      mode: 'markers',
      text: sampleData.otu_labels,
      // LUIS NORDA'S CODE \/
      marker: {
              color: sampleData.otu_ids.map(val => fColor(val)),
              opacity: sampleData.otu_ids.map(val => fOp(val)),
              size: sampleData.sample_values
              }

  };
  
  var data = [trace1];
  
  var layout = {
      title: `Buble visualization for all UTC Id's for participant #${sampleData.id}`,
      showlegend: false,
      xaxis: { title: 'OTU ID' },
      height: 600,
      width: 1000
  };
        // LUIS NORDA'S CODE /\
  
  // Create the chart
  Plotly.newPlot('bubbleChart', data, layout);
}

// INIT() FUNCTION
// Initiale the Metadata panel with sample ID:940
function initMetadata(metaData) {

  // Initialize the Meta Data panel chart with new values, first removing the previously initialized/populated divs if found.
  d3.selectAll(".appended-data").remove()

  let div = d3.select("#sample-metadata").style("font-weight", "bold")
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.id}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.ethnicity}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.gender}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.age}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.location}`)
  div.append("div").classed("appended-data", true).text(`ID: ${metaData.wfreq}`)

}

// LUIS NORDA'S CODE \/
// Create color variablity based on the values of the data
function fColor(y){
  if (y > 2000) {
    return "yellow"
  }
  else if (y > 1750){
    return "gold"
  } 
  else if (y > 1500){
    return "green"
  }
  else if (y > 1250){
      return "cyan"
    }
  else if (y > 1000){
      return "blue"
    }
  else if (y > 750){
      return "teal"
    }
  else if (y > 500){
      return "pink"
    }
  else if (y > 250){
      return "orange"
    }
  else if (y > 50){
      return "red"
    }
  else { return "black"}
}

// Create opacity variablity based on the values of the data
function fOp(y){
  if (y > 2000) {
      return 1
    }
    else if (y > 1750){
      return 0.9
    } 
    else if (y > 1500){
      return 0.8
    }
    else if (y > 1250){
        return 0.7
      }
    else if (y > 1000){
        return 0.6
      }
    else if (y > 750){
        return 0.5
      }
    else if (y > 500){
        return 0.4
      }
    else if (y > 250){
        return 0.3
      }
    else if (y > 50){
        return 0.2
      }
    else { return 0.1}
  }

// LUIS NORDA'S CODE /\

// Initialize the page.
// The starting value of each chart will be the first of all of the samples (id: 940)
init('940')
