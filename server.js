require("dotenv").config();

const cors = require("cors");
const express = require("express");

const OpenAI = require("openai");

const app = express();
app.use(cors());

app.use(express.json());

const openai = new OpenAI({

    baseURL: "https://openrouter.ai/api/v1",

    apiKey: process.env.OPENROUTER_API_KEY

});

app.get("/", (req, res) => {

    res.send("AI Chatbot Running");

});

app.post("/chat", async (req, res) => {

    try {

        const userMessage = req.body.message;

        const completion =
            await openai.chat.completions.create({

                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: userMessage
                    }
                ]

            });

        res.json({

            reply:
                completion.choices[0].message.content

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: error.message

        });

    }

});

app.listen(3000, () => {

    console.log("AI Chatbot Running");

});