import OpenAI from "openai";
import { getEditPrompt } from "../prompts/editPrompts.js";

const client = new OpenAI({
    baseURL: process.env.NATLAS_BASE_URL,
    apiKey: process.env.NATLAS_API_KEY,
});

export async function generateDraft({
    prompt,
    language,
    type,
}) {
    const systemPrompt = `
You are a professional writer fluent in Yoruba, Igbo, Hausa, and English.

Task:
Write a ${type} in ${language}.

Rules:
- Output strictly in ${language}
- Do not mix languages
- Use natural, culturally appropriate expressions
- Write clearly and coherently

The user prompt may be written in any language.
Understand the intent and respond correctly.
  `.trim();

    const completion = await client.chat.completions.create({
        model: "n-atlas",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 600,
    });

    return completion.choices[0].message.content.trim();
}

export async function autocompleteText({ text, language }) {
    const systemPrompt = `
You are an expert writer fluent in ${language}.

Task:
Continue the given text naturally in ${language}.

Rules:
- Return ONLY the continuation
- Do NOT repeat the existing text
- Do NOT start a new paragraph
- Maximum one short sentence
- Do NOT explain anything
`.trim();

    const completion = await client.chat.completions.create({
        model: "n-atlas",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text }
        ],
        temperature: 0.4,   // lower = more predictable
        max_tokens: 40,     // keep it short
    });

    return completion.choices[0].message.content.trim();
}

export async function editText({ text, language, action }) {
    const systemPrompt = getEditPrompt(action, language);

    const completion = await client.chat.completions.create({
        model: "n-atlas",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: text }
        ],
        temperature: action === "improve" ? 0.2 : 0.5,
        max_tokens: 300,
    });

    return completion.choices[0].message.content.trim();
}