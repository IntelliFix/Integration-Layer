require("dotenv").config();
const axios = require("axios");
const genAIServerUrl = require("../../../GenAI.url");

const codeFixer = async (req, res) => {
  const code = req.body.code;
  const comment = req.body.comment;

  try {
    const response = await axios.post(genAIServerUrl + "/code-fixer", {
      code: code,
      comment: comment,
    });
    console.log(response.data);
    // Here goes intent classification and security
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = codeFixer;
