const fs = require("fs").promises;
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Not working properly yet
const checkSyntaxString = async (language, string) => {
  const fileId = uuidv4();
  string = string || ``;
  const filePath = path.join(__dirname, "files", `${fileId}.${language}`);
  try {
    await fs.mkdir(path.join(__dirname, "files"), { recursive: true });

    // Write the code to a temporary file
    await fs.writeFile(filePath, string, "utf8");

    const { stdout, stderr } = await exec(`python3 -m py_compile ${filePath}`);

    if (stderr) {
      return { passed: false, error: stderr };
    }
    return { passed: true, error: null };
  } catch (err) {
    return { passed: false, error: err.message };
  }
};

let sampleCode = "def foo():\n    print('Indented code here')";
checkSyntaxString("py", sampleCode)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
