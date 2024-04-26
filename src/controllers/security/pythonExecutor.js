// chatbotSpawner.js
//This is the first interaction with the python code, where I call the spawn function calling prompt_injectio.py
const { spawn } = require('child_process');

// Function to spawn the Python process and pass message to it
const runPythonScript = (message) => {
  return new Promise((resolve, reject) => {
    // Path to your Python script
    const pythonScriptPath = '../middleware/prompt_injection.py'; // Update this with the actual path

    // Spawn the Python process
    const pythonProcess = spawn('python3', [pythonScriptPath, message]);

    // Capture stdout data from the Python process
    let dataBuffer = '';
    pythonProcess.stdout.on('data', (data) => {
      dataBuffer += data.toString();
      console.log(dataBuffer);
    });

    // Capture any error messages
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error from Python script: ${data}`);
      reject(data.toString());
    });

    // Handle process termination
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(dataBuffer.trim()); // Resolve with the output from Python script
      } else {
        reject(`Python script exited with code ${code}`);
      }
    });
  });
};

module.exports = { runPythonScript };
