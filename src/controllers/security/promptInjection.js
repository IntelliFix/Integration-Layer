const axios = require('axios');
const fs = require('fs');
require("dotenv").config(); // use the env variables


async function promptinjection(message) {
  try {
    const API_ENDPOINT = 'europe-west4-aiplatform.googleapis.com';
    const PROJECT_ID = '457785005814';
    const ENDPOINT_ID = '4433147320309121024';
    const LOCATION_ID = 'europe-west4';

    // Generate access token using gcloud command-line tool
    const accessToken = process.env.accessToken; 

    // Read the JSON payload from the separate file, sanitize user input (message) and concatenate
    // the sanitized input to the prompt injection prompt
    const requestData = JSON.parse(fs.readFileSync('request.json', 'utf8'));
    const sanitizedMessage = JSON.stringify(message); //sanitize user input
    requestData.instances[0].content += sanitizedMessage;  

    // Send request using Axios
    const response = await axios.post(
      `https://${API_ENDPOINT}/v1/projects/${PROJECT_ID}/locations/${LOCATION_ID}/endpoints/${ENDPOINT_ID}:predict`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending prediction request:', error);
    throw error;
  }
}

module.exports = promptinjection;
