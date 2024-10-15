// Fetch and plot the Iris dataset using Plotly
function plotIrisData(userInput = null) {
    fetch('http://127.0.0.1:5000/get_data')
    .then(response => response.json())
    .then(data => {
        const speciesColors = {
            'setosa': '#1f77b4',     // blue
            'versicolor': '#ff7f0e', // orange
            'virginica': '#2ca02c'   // green
        };

        // Create separate traces for each species
        const speciesTraces = data.target_names.map((species, i) => {
            return {
                type: 'splom',
                dimensions: [
                    {label: data.feature_names[0], values: data.features.filter((_, idx) => data.target[idx] === i).map(f => f[0])},
                    {label: data.feature_names[1], values: data.features.filter((_, idx) => data.target[idx] === i).map(f => f[1])},
                    {label: data.feature_names[2], values: data.features.filter((_, idx) => data.target[idx] === i).map(f => f[2])},
                    {label: data.feature_names[3], values: data.features.filter((_, idx) => data.target[idx] === i).map(f => f[3])},
                ],
                name: species,
                marker: {
                    color: speciesColors[species],
                    size: 5,
                    line: {color: 'white', width: 0.5}
                }
            };
        });

        const plotData = [...speciesTraces];

        // Add user's point to all plots if available
        if (userInput) {
            const userPoints = {
                type: 'splom',
                dimensions: [
                    {label: 'Sepal Length', values: [userInput[0]]},
                    {label: 'Sepal Width', values: [userInput[1]]},
                    {label: 'Petal Length', values: [userInput[2]]},
                    {label: 'Petal Width', values: [userInput[3]]},
                ],
                marker: {
                    color: 'red',
                    size: 10,
                    symbol: 'cross'
                },
                name: 'User Input'
            };

            plotData.push(userPoints);
        }

        const layout = {
            title: 'Iris Dataset: 4x4 Scatter Plot Matrix',
            height: 700,
            width: 800,
            showlegend: true,
            legend: {x: 1, y: 0.5}, // Positioning the legend
            hovermode: 'closest'
        };

        Plotly.newPlot('plot', plotData, layout);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

document.getElementById('predictButton').addEventListener('click', function() {
    const sepal_length = parseFloat(document.getElementById('sepal_length').value);
    const sepal_width = parseFloat(document.getElementById('sepal_width').value);
    const petal_length = parseFloat(document.getElementById('petal_length').value);
    const petal_width = parseFloat(document.getElementById('petal_width').value);

    const data = {
        data: [sepal_length, sepal_width, petal_length, petal_width]
    };

    fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('result').innerText = result.prediction;
        document.getElementById('probability').innerText = result.probability;

        // Update the plot with the user-entered point in all scatter plots
        plotIrisData(result.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Plot the data on page load
window.onload = plotIrisData;