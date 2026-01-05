const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateQuizQuestion = async (req, res) => {
  try {
    const { totalQuestions, prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "system",
          content: `
You are a quiz generator.
Respond ONLY in valid JSON format like this:
[
  {
    "questionText": "",
    "options": ["", "", "", ""],
    "correctAnswer": "",
    "marks": 1
  }
]
Do not add explanation or extra text.
`
        },
        {
          role: "user",
          content: `Generate ${totalQuestions} MCQ questions on: ${prompt}`
        }
      ],
    });

    const quizQuestions = JSON.parse(
      response.choices[0].message.content
    );
    res.status(200).json({
      success: true,
      data: quizQuestions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { generateQuizQuestion };
