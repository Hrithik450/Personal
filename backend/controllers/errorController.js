import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyC-xTCULiakdFPjzplp4gy4SiquClKx4HU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function processAndFormatError(stackTrace) {
  try {
    const prompt = `${stackTrace}\n
    Error = {
      "fileLocation": "string", // user written code file location, where the error is happened: ex:- C:/Users/User/OneDrive/Desktop/mern-starter-kit/mern-errors/index.js
      "rootCause": "string", // root cause in simple human readable english language (try to keep in 1-3 line max) like ex:- syntax is missing at this line and what is the error name, ex:- TypeError
      "suggestion": "string", // code suggestion of correct code, (try to keep in 1-3 line max) explanation
      "correctSnippet": "string" // doesn't require entire file codebase.
    }
    Return: Object<Error>
    `;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const responseText = response.text();

    const start = responseText.indexOf("{");
    const end = responseText.lastIndexOf("}");

    if (start === -1 || end === -1 || start >= end) {
      return null;
    }

    const jsonString = responseText.substring(start, end + 1);
    const errorData = JSON.parse(jsonString);

    const formattedReport = `
    # 🛠 Error Report:
    **📂 File Location:**  
    \`${errorData.fileLocation}\`\n
    ## ❌ Issue (Root Cause)
    ${errorData.rootCause}\n
    ## ✅ Suggested Solution
    ${errorData.suggestion}\n
    ## 📝 Corrected Code Example
    ${errorData.correctSnippet}`;

    fs.writeFileSync("error.md", formattedReport, "utf-8");

    const yellowColor = "\x1b[33m";
    const redColor = "\x1b[31m";
    const resetColor = "\x1b[0m";

    console.log(
      `${redColor}Error occurred at ${errorData.fileLocation}${resetColor}`
    );
    console.log(`${redColor}Error cause: ${errorData.rootCause}${resetColor}`);
    console.log(
      `${yellowColor}You can see error.md file for more details${resetColor}`
    );
  } catch (error) {
    console.error("Error Occured At:", error);
  }
}

export const analyze = async (req, res) => {
  const { stackTrace } = req.body;

  try {
    const errorData = await processAndFormatError(stackTrace);
    if (errorData) return res.status(200).json(errorData);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server is Busy!" });
  }
};
