import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";

const port = process.env.PORT || 4000;

const app = express();
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

app.post("/resume/create", upload.single("headShotImage"), async (req, res) => {
  const {
    fullName,
    currentPosition,
    currentLength,
    currentTechnologies,
    workHistory,
  } = req.body;

  console.log(req.body);

  res.json({
    message: "Resume created successfully",
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
