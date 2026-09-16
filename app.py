from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open('heart_disease_model.pkl', 'rb'))

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if request.is_json:
            data = request.get_json()
            features = [
                float(data['age']), float(data['sex']), float(data['cp']),
                float(data['trestbps']), float(data['chol']), float(data['fbs']),
                float(data['restecg']), float(data['thalach']), float(data['exang']),
                float(data['oldpeak']), float(data['slope']), float(data['ca']),
                float(data['thal'])
            ]
        else:
            features = [
                float(request.form['age']), float(request.form['sex']), float(request.form['cp']),
                float(request.form['trestbps']), float(request.form['chol']), float(request.form['fbs']),
                float(request.form['restecg']), float(request.form['thalach']), float(request.form['exang']),
                float(request.form['oldpeak']), float(request.form['slope']), float(request.form['ca']),
                float(request.form['thal'])
            ]

        input_data = np.array(features).reshape(1, -1)
        prediction = model.predict(input_data)

        if prediction[0] == 0:
            result = "No Heart Disease Detected"
            result_class = "safe"
        else:
            result = "Heart Disease Detected"
            result_class = "danger"

        return jsonify({
            'prediction_text': result,
            'result_class': result_class
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)