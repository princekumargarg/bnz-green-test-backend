require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

const emissionFactors = {
  car: 0.12,  
  bus: 0.05,  
  train: 0.03, 
  bike: 0.01,  
  walking: 0.00
};

// Carbon footprint calculation logic
const calculateCarbonFootprint = (distance, transport) => {
  const emissionFactor = emissionFactors[transport] || emissionFactors["car"];
  return distance * emissionFactor;
};

// Generate AI recommendations
const generateRecommendations = async (footprint, transport) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o",
        messages: [
          { role: "system", content: "You are an AI that gives personalized tips on reducing carbon footprint based on transport type." },
          { role: "user", content: `My carbon footprint is ${footprint} kg CO₂ and I traveled by ${transport}. Give me 3 specific ways to reduce my emissions.` },
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("🚨 OpenRouter API Error:", error.response?.data || error.message);

    // Default recommendations based on transport type
    const fallbackRecommendations = {
      car: ["Carpool with others.", "Use an electric or hybrid car.", "Drive efficiently to save fuel."],
      bus: ["Use buses with lower emissions.", "Walk or cycle short distances.", "Advocate for green public transport."],
      train: ["Use high-speed electric trains when possible.", "Reduce unnecessary trips.", "Travel during off-peak hours for efficiency."],
      bike: ["Use bike-sharing programs.", "Maintain your bike for efficiency.", "Encourage bike-friendly city policies."],
      walking: ["Use pedestrian-friendly routes.", "Encourage urban planning for walkability.", "Pair walking with public transport."]
    };

    return fallbackRecommendations[transport] || ["Reduce travel where possible.", "Choose eco-friendly options.", "Support sustainable transport policies."];
  }
};

app.get("/", (req, res) => {
  res.send("<h1>🌱 Welcome to the <span style='color: green;'>Carbon Footprint Backend</span> 🚀</h1>");
});

// API Endpoint: Calculate Carbon Footprint
app.post("/calculate", async (req, res) => {
  const { distance, transport } = req.body;
  if (!distance || isNaN(distance) || !transport) {
    return res.status(400).json({ error: "Invalid input. Provide distance and transport type." });
  }

  const footprint = calculateCarbonFootprint(distance, transport);
  const recommendations = await generateRecommendations(footprint, transport);

  res.json({ footprint, recommendations });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
