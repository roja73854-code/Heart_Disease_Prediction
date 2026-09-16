import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle


# Load dataset
heart_df = pd.read_csv('heart_disease_prediction_data.csv')

print("First 5 rows:")
print(heart_df.head())

print("\nDataset Shape:")
print(heart_df.shape)

print("\nMissing Values:")
print(heart_df.isna().sum())

print("\nDataset Information:")
print(heart_df.info())

print("\nStatistical Summary:")
print(heart_df.describe())

print("\nTarget Distribution:")
print(heart_df['target'].value_counts())


# Separate features and target
x = heart_df.drop('target', axis=1)
y = heart_df['target']


# Split dataset
x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)

print("\nTraining Shape:", x_train.shape)
print("Testing Shape:", x_test.shape)


# Create model
model = LogisticRegression(max_iter=1000)

# Train model
model.fit(x_train, y_train)


# Training accuracy
train_y_pred = model.predict(x_train)
train_accuracy = accuracy_score(y_train, train_y_pred)

print("\nTraining Accuracy:", train_accuracy)


# Testing accuracy
test_y_pred = model.predict(x_test)
test_accuracy = accuracy_score(y_test, test_y_pred)

print("Testing Accuracy:", test_accuracy)


# Save model
pickle.dump(model, open('heart_disease_model.pkl', 'wb'))

print("\nModel saved successfully!")