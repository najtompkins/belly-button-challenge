# belly-button-challenge
Challenge 14: Using Javascript to create a dynamic dashboard the explores the samples by ID in the belly-button microbiome data.

## Sources: 
- https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
- Luis Norda, who provided specific functions cited in the code.

## Notes:
- The D3 javascript library was used in this challenge to edit the DOM, most critically the dropdown menu.
- Plotly is used to generate the plots that visually express the data.
- The extra challenge of this assignemnt included adding the gauge chart. The index.html indicated that this should be handled in a separate bonus.js file. I did not find that necessary and instead added the code to the existing script for both efficiency and readability in the final product.

### The Dashboard
- There are several different portions of the dashboard. The first of note is the dropdown mentioned above. This is populated by appending the sample participant IDs to the list and then using a .on("change", function...) to start a cascading number of functions to update the rest of the page with the data associated with the participant ID being selected.

### The Panel
- The Panel is initialized and updated in much the same way. It first clears the list of any data and then populates it with the metadata of the participant by appending new DIVs with text appropriate for each piece of metadata.

### The Bar Chart
- The bar chart is a Plotly element that is initialized with the first participant in the study's data, participant number 940. With each change of the dropdown it is then updated to include new X and Y values for the selected participant, as well as a dynamic title to present the participant ID being viewed.

### The Bubble Chart
- The Bubble chart, like the bar chart, is a Plotly element that is initialized with the first participant in the study's data, participant number 940. With each change of the dropdown it is then updated to include new X and Y values for the selected participant, as well as a dynamic title to present the participant ID being viewed. The colors of the bubbles as well as the size vary based on the numerical values of the UTC IDs (creating a spectrum of color regardless of the specific data). Each bubble, with its color, has an opacity that indicates the intensity of the amount of bacteria found for that UTC ID. (The size and opacity are calculated by functions provided by classmate Luis Norda.)

### The Gauge Chart
- The Bubble chart, like the others, is a Plotly element that is initialized with the first participant in the study's data, participant number 940. With each change of the dropdown it is then updated to include the new single value of the washing frequency of the participant and a  dynamic title to present the participant ID being viewed.
