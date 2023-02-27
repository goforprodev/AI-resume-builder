import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";

const port = process.env.PORT || 4000;
const app = express();
const openai = new OpenAIApi(configuration);
dotenv.config();

// configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const GPTFunction = async (text) => {
  const response = await openai.createCompletion({
    model: "text-davinvi-003",
    prompt: text,
    temperature: 0.6,
    max_tokens: 250,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  return response.data.choices[0].text;
};

app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const trimWorkHistory = (workHistory) => {
  let stringText = "";
  for (let i = 0; i < workHistory.length; i++) {
    stringText += `${workHistory[i].name} as a ${workHistory[i].position}.`;
  }
  return stringText;
};

app.post("/resume/create", upload.single("headShotImage"), async (req, res) => {
  const {
    fullName,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory,
  } = req.body;

  const workHistoryArray = JSON.parse(workHistory);

  const newEntry = {
    id: generateID(),
    fullName,
    image: `http://localhost:4000/uploads/${req.file.filename}`,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory: workHistoryArray,
  };

  //👇🏻 The job description prompt
  const prompt1 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`;

  //👇🏻 The job responsibilities prompt
  const prompt2 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n I write in the technolegies: ${currentTechnologies}. Can you write 10 points for a resume on what I am good at?`;
  //👇🏻 The job achievements prompt
  const prompt3 = `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${currentLength} years). \n During my years I worked at ${
    workArray.length
  } companies. ${remainderText(
    workHistoryArray
  )} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`;

  const objective = await GPTFunction(prompt1);
  const keypoints = await GPTFunction(prompt2);
  const jobResponsibilities = await GPTFunction(prompt3);

  const chatgptData = { objective, keypoints, jobResponsibilities };

  console.log(chatgptData);

  res.json({
    message: "Resume created successfully",
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
