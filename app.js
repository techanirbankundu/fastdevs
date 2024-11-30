const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithPhoneNumber, RecaptchaVerifier } = require('firebase/auth');

const app = express();
app.use(bodyParser.json());

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6fzapWXtNG8S25I3Exqvk2zPxi97o50w",
  authDomain: "pythonapp-d70a8.firebaseapp.com",
  databaseURL: "https://pythonapp-d70a8-default-rtdb.firebaseio.com",
  projectId: "pythonapp-d70a8",
  storageBucket: "pythonapp-d70a8.firebasestorage.app",
  messagingSenderId: "586400082461",
  appId: "1:586400082461:web:ae37239507bdb4b615b4f4",
  measurementId: "G-34605PWKF7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

app.post('/otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  try {
    const auth = getAuth(firebaseApp);

    // Create a dummy reCAPTCHA verifier
    const recaptchaVerifier = new RecaptchaVerifier('dummy-container', {}, auth);
    recaptchaVerifier.render();

    // Send OTP
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);

    res.json({
      status: 'success',
      verificationId: confirmationResult.verificationId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
