require('dotenv').config(); // For environment variables
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json()); // To parse JSON body

// OneSignal Notification Endpoint
app.post('/onesignal', (req, res) => {
  const url = 'https://onesignal.com/api/v1/notifications';

  
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.ONESIGNAL_AUTH_KEY}`, // Secure Authorization Key
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      app_id: process.env.ONESIGNAL_APP_ID, // Replace with your OneSignal App ID
      included_segments: req.body.included_segments || ['All'], // Default to all users
      contents: req.body.contents || { en: 'Default message' },
      name: req.body.name || 'Default Notification',
      send_after: req.body.send_after, // Optional scheduling
      custom_data: req.body.custom_data // Optional custom data
    })
  };

  fetch(url, options)
    .then(response => response.json())
    .then(json => res.status(200).send(json))
    .catch(err => {
      console.error(err);
      res.status(500).send({ error: 'Failed to send notification' });
    });
});

// Example root route
app.get('/', (req, res) => {
  res.send('OneSignal Notification Service is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});