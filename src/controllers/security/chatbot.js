require("dotenv").config();
const axios = require("axios");
const genAIServerUrl = require("../../../GenAI.url");
const promptinjection = require('./promptInjection');


const chatbot = async (req, res) => {
  try {
    // console.log(req.headers.authorization);

    //Prompt Injection model first to classify code as safe or promptinjection/jailbreaking attempt
    const promptResponse = await promptinjection(req.body.message);
    const promptContent = promptResponse.predictions[0].content.trim();
    console.log(promptContent);


    // Check if promptResponse starts with "Yes it is safe to answer"
    if (promptContent.startsWith("Yes, it is safe to answer")){
      
      //Send the request to the AI server where the main Chatbot model exists
      const response = await axios.post(genAIServerUrl + "/chatbot", {
        // Session id el mafrood negebha men el user logged in, + howa fe chat raqam kam
        // For now hane3taha men postman 3ady bas ba3d keda hatet7at hena
        session_id: req.body.session_id,
        message: req.body.message,
      });
      console.log(response.data);

      // console.log(req.body);

      res.status(200).json({ success: true, data: response.data });

    
    }else if (promptContent.startsWith("No, it is not safe to answer")){
      
      //Reply with Prompt_Injection, finetuned model's reponse
      res.status(200).json({ success: true, data: promptResponse.predictions[0].content });

    }
    else {
      // Handle other cases if needed
      // For example, if the promptResponse does not start with either expected string
            //Send the request to the AI server where the main Chatbot model exists
      const response = await axios.post(genAIServerUrl + "/chatbot", {
        // Session id el mafrood negebha men el user logged in, + howa fe chat raqam kam
        // For now hane3taha men postman 3ady bas ba3d keda hatet7at hena
        session_id: req.body.session_id,
        message: req.body.message,
      });
      console.log(response.data);

      // console.log(req.body);

      res.status(200).json({ success: true, data: response.data });
    }
    
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = chatbot;