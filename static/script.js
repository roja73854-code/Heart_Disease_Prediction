document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const clearBtn = document.getElementById('clearBtn');
    
    const resultContainer = document.getElementById('resultContainer');
    const resultTitle = document.getElementById('resultTitle');
    const resultText = document.getElementById('resultText');
    const badgeOutput = document.getElementById('badgeOutput');
    const resultImage = document.getElementById('resultImage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        resultTitle.textContent = "Analyzing...";
        resultText.textContent = "The machine learning model is processing patient metrics...";
        badgeOutput.classList.add('hidden');
        if (resultImage) {
            resultImage.style.transform = "scale(0.98)";
            resultImage.style.opacity = "0.7";
        }

        const formData = {
            age: parseInt(document.getElementById('age').value),
            sex: parseInt(document.getElementById('sex').value),
            cp: parseInt(document.getElementById('cp').value),
            trestbps: parseInt(document.getElementById('trestbps').value),
            chol: parseInt(document.getElementById('chol').value),
            fbs: parseInt(document.getElementById('fbs').value),
            restecg: parseInt(document.getElementById('restecg').value),
            thalach: parseInt(document.getElementById('thalach').value),
            exang: parseInt(document.getElementById('exang').value),
            oldpeak: parseFloat(document.getElementById('oldpeak').value),
            slope: parseInt(document.getElementById('slope').value),
            ca: parseInt(document.getElementById('ca').value),
            thal: parseInt(document.getElementById('thal').value)
        };

        try {
            const response = await fetch('/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Server connection error.');
            }

            const data = await response.json();
            displayResult(data);

        } catch (error) {
            console.error('Error:', error);
            resultTitle.textContent = "Connection Error";
            resultText.textContent = "Could not communicate with the AI prediction server. Please verify your backend application is active.";
            if (resultImage) {
                resultImage.style.transform = "scale(1)";
                resultImage.style.opacity = "1";
            }
        }
    });

    function displayResult(data) {
        if (resultImage) {
            resultImage.style.transform = "scale(1)";
            resultImage.style.opacity = "1";
        }
        badgeOutput.classList.remove('hidden', 'risk-high', 'risk-low');

        if (data.result_class === 'danger') {
            resultContainer.style.borderColor = "rgba(239, 68, 68, 0.4)";
            resultTitle.textContent = data.prediction_text;
            resultText.textContent = "High cardiovascular risk factors detected. The model recommends clinical evaluation and further diagnostic exploration.";
            badgeOutput.textContent = "High Risk";
            badgeOutput.classList.add('risk-high');
            if (resultImage) {
                resultImage.style.borderColor = "#EF4444";
                resultImage.style.boxShadow = "0 8px 30px rgba(239, 68, 68, 0.3)";
            }
        } else {
            resultContainer.style.borderColor = "rgba(16, 185, 129, 0.4)";
            resultTitle.textContent = data.prediction_text;
            resultText.textContent = "Low cardiovascular anomalies detected. Metrics appear to be within normal expected clinical constraints.";
            badgeOutput.textContent = "Low Risk";
            badgeOutput.classList.add('risk-low');
            if (resultImage) {
                resultImage.style.borderColor = "#10B981";
                resultImage.style.boxShadow = "0 8px 30px rgba(16, 185, 129, 0.3)";
            }
        }
    }

    clearBtn.addEventListener('click', () => {
        form.reset();
        resultContainer.style.borderColor = "#222F43";
        resultTitle.textContent = "Awaiting Analysis";
        resultText.textContent = "Fill out the patient metrics on the left and click predict to run the AI cardiac risk assessment model.";
        badgeOutput.classList.add('hidden');
        if (resultImage) {
            resultImage.style.borderColor = "#1E293B";
            resultImage.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.5)";
        }
    });
});