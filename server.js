// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const Groq  = require("groq-sdk/index.mjs"); // Assuming groq-sdk is installed

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Initialize Groq
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// // ROUTE FOR GROQ AI
// app.post('/chat', async (req, res) => {
//   const userMessage = req.body.message;

//   try {
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         { role: "system", content: "You are a helpful chatbot that assists with digital literacy, especially for WhatsApp, Paytm, and Google Maps." },
//         { role: "user", content: userMessage }
//       ],
//       model: "llama3-70b-8192"
//     });

//     const botReply = chatCompletion.choices[0].message.content;
//     res.json({ reply: botReply });
//   } catch (err) {
//     console.error("Groq API error:", err);
//     res.status(500).json({ reply: "❌ Sorry, something went wrong on the server." });
//   }
// });


// /*
// // ========== SERP API CODE (COMMENTED OUT) ==========
// // const axios = require("axios");

// // app.post('/chat', async (req, res) => {
// //   const userMessage = req.body.message;

// //   try {
// //     const searchRes = await axios.get("https://api.bing.microsoft.com/v7.0/search", {
// //       headers: {
// //         "Ocp-Apim-Subscription-Key": process.env.BING_SEARCH_API_KEY,
// //       },
// //       params: {
// //         q: userMessage,
// //         mkt: "en-IN",
// //       }
// //     });

// //     const result = searchRes.data.webPages.value[0].snippet;
// //     res.json({ reply: result });
// //   } catch (error) {
// //     console.error("Bing Search Error:", error.message);
// //     res.status(500).json({ reply: "❌ Bing Search failed." });
// //   }
// // });
// */

// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Groq = require("groq-sdk"); 

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Initialize the Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "mixtral-8x7b-32768"
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I didn't get that.";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error generating response from Groq API." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
