# Iris Flower Prediction App

This project demonstrates full-stack development by integrating both front-end and back-end technologies, along with a machine learning model, to create a dynamic, interactive web application.

- **Front-End**: The user interface is built using HTML and JavaScript. Users input Iris flower measurements (sepal length, sepal width, petal length, petal width) through a form, and the interface dynamically updates with the predicted flower species. Interactive data visualization is provided using **Plotly.js**, which displays a scatter plot matrix of the Iris dataset, and highlights the user's input.
  
- **Back-End**: The back-end is built using **Flask** (Python), which handles the requests from the front end, serves the machine learning model (trained using **scikit-learn**), and provides API endpoints (`/predict` and `/get_data`) to make predictions and serve dataset visualizations.

- **Machine Learning**: A **Random Forest Classifier** is trained on the famous Iris dataset using scikit-learn. The model is saved as a `.pkl` file and is loaded by the Flask app to provide real-time predictions based on user input.

- **Full-Stack Integration**: The front end and back end communicate through asynchronous HTTP requests (using `fetch`), enabling real-time interaction between the user and the server. User input is processed by the back-end model, and the result is sent back to the front end for visualization.

This project is an example of how to combine client-side interaction, server-side logic, and data science to create a seamless full-stack web application.


## Demo

![Iris Flower Prediction App Demo](demo.gif)

## Features

- Predict the Iris flower species using a pre-trained machine learning model.
- Visualize the dataset in a 4x4 scatter plot matrix.
- Highlight user input on the scatter plot matrix with the prediction.

## Prerequisites

- Python 3.x
- Flask
- scikit-learn
- Plotly

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/samanseifi/iriswebapp.git
    cd iriswebapp
    ```

2. **Create a virtual environment (optional but recommended):**

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. **Install the dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

## Setup

1. **Train and save the model (if not already saved):**

    Run the following script to train the model and save it as `model.pkl`:

    ```python
    from sklearn.datasets import load_iris
    from sklearn.model_selection import train_test_split
    from sklearn.ensemble import RandomForestClassifier
    import pickle

    # Load the dataset
    data = load_iris()
    X = data.data
    y = data.target

    # Train the model
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier()
    model.fit(X_train, y_train)

    # Save the model
    with open('model.pkl', 'wb') as file:
        pickle.dump(model, file)

    print("Model saved as model.pkl")
    ```

2. **Run the Flask app:**

    ```bash
    python3 app_iris.py
    ```

3. **Access the application:**

    Open your browser and go to `http://127.0.0.1:5000` to use the app.

## Usage

- Enter the values for sepal length, sepal width, petal length, and petal width.
- Click "Predict" to get the predicted Iris flower species.
- The user input will be highlighted in red across all scatter plots in the scatter plot matrix.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.