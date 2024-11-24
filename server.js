const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const FormResponse = require("./models/FormResponse");

const app = express(); // Initialize app first

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Sync database and start the server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced.");
    app.listen(5001, () => {
      console.log("Server is running on http://localhost:5001");
    });
  })
  .catch((err) => {
    console.error("Error syncing the database:", err);
  });

// Endpoint to handle form submissions
app.post("/submit-form", async (req, res) => {
  const {
    email,
    miningTrade,
    emTrade,
    excavationDepartmentalTrade,
    excavationContractualTrade,
    nameOfEmployee,
    designation,
    areaOrProject,
    generalQualification,
    experience,
    basicKnowledgeOfFirstAidAndFireFighting,
    oralTest,
    password,
  } = req.body;

  // Validate required fields
  if (
    !email ||
    !nameOfEmployee ||
    !designation ||
    !areaOrProject ||
    !generalQualification ||
    !experience ||
    !basicKnowledgeOfFirstAidAndFireFighting ||
    !oralTest ||
    !password
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be filled" });
  }

  try {
    const newResponse = await FormResponse.create({
      email,
      miningTrade,
      emTrade,
      excavationDepartmentalTrade,
      excavationContractualTrade,
      nameOfEmployee,
      designation,
      areaOrProject,
      generalQualification,
      experience,
      basicKnowledgeOfFirstAidAndFireFighting,
      oralTest,
      password,
    });
    res
      .status(201)
      .json({ message: "Form submitted successfully!", data: newResponse });
  } catch (error) {
    console.error("Error submitting form:", error);
    res
      .status(500)
      .json({ message: "Failed to submit form", error: error.message });
  }
});
