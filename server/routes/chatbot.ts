import express from "express";
import { OpenAI } from "openai";

const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
    const { message, messages = [] } = req.body;

    if (!message && (!messages || messages.length === 0)) {
        return res.status(400).json({ error: "No message provided" });
    }

    try {
        const chatMessages = [
            {
                role: "system",
                content:
                    "You are an assistant for an e-commerce website for buying and selling Self-Driving Systems. Try to answer the user's question as best as you can.",
            },
            ...(messages.length
                ? messages
                : [{ role: "user", content: message }]),
        ];

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            max_tokens: 150,
            messages: chatMessages,
        });

        res.json({
            response: response.choices[0].message.content,
            messages: chatMessages,
        });
    } catch (err) {
        res.status(500).json({ error: "AI service error" });
    }
});

export default router;