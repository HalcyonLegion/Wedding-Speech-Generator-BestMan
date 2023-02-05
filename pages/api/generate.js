import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { modifier, bmname, bridename, groomname, duration, modifier2, modifier3 } = req.body;

  if (!modifier || !bmname || !bridename || !groomname || !duration || !modifier2 || !modifier3) {
    res.status(400).json({
      error: {
        message: "Please enter all required inputs",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model:"davinci:ft-personal:wedding-speech-generator-2023-02-04-16-34-03",
      prompt: generatePrompt(modifier, bmname, bridename, groomname, duration, modifier2, modifier3),
      temperature: 0.8,
      max_tokens: 1900,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(modifier, bmname, bridename, groomname, duration, modifier2, modifier3) {
  return `
  Modifier: ${modifier}
  BMname: ${bmname}
  Bridename: ${bridename}
  Groomname: ${groomname}
  Duration: ${duration}
  Modifier2: ${modifier2}
  Modifier3: ${modifier3}

  SPEECH OUTLINE:
`;
}