const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: "../server/.env" });

async function run() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY not found in server/.env");
    process.exit(1);
  }

  console.log("Using API Key:", apiKey.substring(0, 10) + "...");
  const genAI = new GoogleGenerativeAI(apiKey);

  const modelsToTest = [
    "gemini-3.1-flash-lite",
    "gemini-3.5-flash",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b",
    "gemini-2.0-flash-lite",
    "gemini-2.5-flash"
  ];

  for (const modelName of modelsToTest) {
    try {
      console.log(`\nTesting model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, respond in one short sentence.");
      console.log(`Success! Response: ${result.response.text().trim()}`);
    } catch (err) {
      console.error(`Failed for ${modelName}:`, err.message);
    }
  }
}

run();
