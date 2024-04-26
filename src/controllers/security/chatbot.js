//This file is where the python code receives the message from the frontend and the response is printed
// here too
//I need to make sure that this is called and receives data at route /chatbot
const { runPythonScript } = require('./pythonExecutor');

// Controller function to handle chatbot route
const chatbot = async (req, res) => {
  try {
    const { message } = req.body;

    // Pass the message to the Python script
    const pythonResponse = await runPythonScript(message);
    
    console.log(pythonResponse);

    res.status(200).json({ response: pythonResponse });
  } catch (error) {
    console.error('Error in chatbot controller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = chatbot;

















// require("dotenv").config();
// const axios = require("axios");
// const genAIServerUrl = require("../../../GenAI.url");

// const spawner = require('child_process').spawn;


// const chatbot = async (req, res) => {
//   try {
//     console.log(req.headers.authorization);
//     const response = await axios.post(genAIServerUrl + "/chatbot", {
//       // Session id el mafrood negebha men el user logged in, + howa fe chat raqam kam
//       // For now hane3taha men postman 3ady bas ba3d keda hatet7at hena
//       session_id: req.body.session_id,
//       message: req.body.message,
//     });
//     console.log(response.data);
//     // Here goes intent classification and security
//     console.log(req.body);


//     res.status(200).json({ success: true, data: response.data });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// module.exports = chatbot;


