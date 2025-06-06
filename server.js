const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {Groq}= require("groq-sdk"); 

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
      messages: [
        { role: "system", 
          content: "You are a helpful assistant for teaching digital tools,Reply in the same language user uses (English or Hindi)." 
        },
        {
          role : "user",
          content: userMessage
        }
      ],
      model: "llama3-70b-8192"
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
