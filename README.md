# Heart Disease Prediction using Machine Learning

This repository contains a Machine Learning project designed to predict the likelihood of heart disease in patients based on clinical and medical data parameters. 

## 📂 Project Structure

* **`model.py`**: The core Python script used to load the dataset, perform data preprocessing, handle feature engineering, and train the machine learning model.
* **`app.py`**: The deployment script (typically built with Streamlit or Flask) that creates a user-friendly interface for making real-time predictions.
* **`heart_disease_model.pkl`**: The trained and serialized machine learning model object, saved using Pickle for deployment.
* **`heart_disease_prediction_data.csv`**: The dataset containing historical patient records used to train and evaluate the model.

## 🚀 How to Run the Project Locally

### 1. Prerequisites
Make sure you have Python installed on your system. 

### 2. Install Dependencies
Open your terminal or command prompt in the project directory and install the required libraries (such as pandas, scikit-learn, and streamlit):
```bash
pip install pandas scikit-learn streamlit
```

### 3. Run the Application
Execute the application script to launch the interface:
```bash
streamlit run app.py
```
*(If your `app.py` is a Flask app, use `python app.py` instead).*
