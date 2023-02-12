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

  const { tone, bmname, reason, bridename, groomname, duration, modifier2, howmet, modifier3, wishes, advice } = req.body;

  if (!tone || !bmname || !reason || !bridename || !groomname || !duration || !modifier2 || !howmet || !modifier3 || !wishes || !advice) {
    res.status(400).json({
      error: {
        message: "Please enter all required inputs",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model:"text-davinci-002",
      prompt: generatePrompt(tone, bmname, reason, bridename, groomname, duration, modifier2, howmet, modifier3, wishes, advice),
      temperature: 0.8,
      max_tokens: 1500,
      stop:["Cheers!"]
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

function generatePrompt(tone, bmname, reason, bridename, groomname, duration, modifier2, howmet, modifier3, wishes, advice) {
  return `

The Best Man will introduce himself with this: Hello everyone, my name is ${bmname} and I’ve got the honour today of being ${groomname}'s best man, which means that over the next five minutes I’ll be telling you about some of the many wonderful qualities that ${groomname} has. Or lying as it’s also known.

Using British English, write an extremely long, highly detailed, ${tone} Wedding Speech to be given by the Groom's Best Man ${bmname}.
The Best Man will explain ${reason} and his feelings about being Best Man.
The Bride's name is ${bridename} and the Groom's Name is ${groomname}.
The best man has known the Bride and Groom for ${duration} so he will tell a story about ${modifier2} as well as ${howmet}.
The Speech Must include specific references to ${modifier3} and it must also include thanks to everybody who could be there and a nice comment about the Bridesmaids.
Write out the entire Speech in Complete detail, be as ${tone} as possible throughout and end with a heartfelt toast to the newly-wed couple including ${wishes} and and these words of wisdom ${advice}

The speech will end when the best man says "Cheers!"

SPEECH OUTLINE:
`;
}


// OR

// "Good afternoon and thank you to the other speakers today for their brilliant speeches, thank you to ${groomname} and ${bridename} for allowing me to be the best man today and thank you to you for listening. It's an honour to stand here next to ${groomname} and say a few words."

// OR

// "Thank you, I'm the best man. But before I begin I'd like to say that this is not going to be one of those awful best man speeches where I destroy the groom's reputation with disgusting, detailed commentary on his exploits for the next ten minutes. I've rehearsed this many times and I can only get it to eight minutes."

// Using British English, write an extremely long, highly detailed, ${tone} Wedding Speech to be given by the Groom's Best Man ${bmname}.

// The Best Man will explain ${reason} and his feelings about being Best Man.
// The Bride's name is ${bridename} and the Groom's Name is ${groomname}.
// The best man has known the Bride and Groom for ${duration} so he will tell a story about ${modifier2} as well as ${howmet}.
// The Speech Must include specific references to ${modifier3} and it must also include thanks to everybody who could be there and a nice comment about the Bridesmaids.
// Write out the entire Speech in Complete detail, be as ${tone} as possible throughout and end with a heartfelt toast to the newly-wed couple including ${wishes} and and these words of wisdom ${advice}

// Tone: ${tone}
// BMname: ${bmname}
// Reason: ${reason}
// Bridename: ${bridename}
// Groomname: ${groomname}
// Duration: ${duration}
// Modifier2: ${modifier2}
// Howmet: ${howmet}
// Modifier3: ${modifier3}
// Wishes: ${wishes}
// Advice: ${advice}