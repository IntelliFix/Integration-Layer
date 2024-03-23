require("dotenv").config();
const axios = require("axios");
const genAIServerUrl = require("../../../GenAI.url");

const chatbot = async (req, res) => {
  try {
    console.log(req.headers.authorization);
    const response = await axios.post(genAIServerUrl + "/chatbot", {
      // Session id el mafrood negebha men el user logged in, + howa fe chat raqam kam
      // For now hane3taha men postman 3ady bas ba3d keda hatet7at hena
      session_id: req.body.session_id,
      message: req.body.message,
    });
    console.log(response.data);
    // Here goes intent classification and security
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = chatbot;
