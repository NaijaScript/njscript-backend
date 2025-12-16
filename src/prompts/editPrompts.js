export function getEditPrompt(action, language) {
  switch (action) {
    case "improve":
      return `
You are an expert editor fluent in ${language}.

Task:
Improve the following text for clarity, grammar, and natural flow.

Rules:
- Do NOT change the meaning
- Do NOT make it longer unless necessary
- Do NOT change writing style
- Return ONLY the improved text
      `.trim();

    case "rewrite":
      return `
You are an expert writer fluent in ${language}.

Task:
Rewrite the following text using different wording while keeping the same meaning.

Rules:
- Same meaning, different phrasing
- Natural and fluent
- Return ONLY the rewritten text
      `.trim();

    case "paraphrase":
      return `
You are a language tutor fluent in ${language}.

Task:
Paraphrase the following text so it sounds natural and clear.

Rules:
- Same meaning
- Different structure
- Return ONLY the paraphrased text
      `.trim();

    default:
      throw new Error("Invalid edit action");
  }
}
