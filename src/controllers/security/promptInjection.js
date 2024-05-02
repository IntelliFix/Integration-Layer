const axios = require('axios');
const fs = require('fs');
require("dotenv").config(); // use the env variables
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function getAccessToken() {
  try {
    // Run the gcloud command to get the access token for authentication
    const { stdout, stderr } = await exec('gcloud auth print-access-token');
    if (stderr) {
      throw new Error(stderr);
    }
    return stdout.trim(); 
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}



async function promptinjection(message) {
  try {
    const API_ENDPOINT="europe-west4-aiplatform.googleapis.com"
    const PROJECT_ID="977448003671"
    const ENDPOINT_ID="4885996577371455488"
    const LOCATION_ID="europe-west4"

    
    // Generate or fetch access token
    const accessToken = process.env.ACCESS_TOKEN === 'GENERATE_ON_RUNTIME'
      ? await getAccessToken()
      : process.env.ACCESS_TOKEN;

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
