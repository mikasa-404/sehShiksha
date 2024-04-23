import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; //module to work with directoy paths
import { fileURLToPath } from "url"; //convert file URLs to file paths
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middlewares/auth.js";
import multer from "multer";
import bodyParser from "body-parser";
import { createPost } from "./controllers/posts.js";
import PdfDetails from "./models/PdfDetails.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import forumRoutes from "./routes/forum.js";

//configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(morgan("common"));

//body parser middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


app.use(cors({
  origin: ["https://seh-shiksha.vercel.app/","http://localhost:3000"],
  methods:['GET', 'POST', 'PATCH'],
  credentials: true,
}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
//user route
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

app.post("/upload-files", upload.single("file"), async (req, res) => {
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    const newPdf= new PdfDetails({
      pdf: fileName,
      title: title
    })
    await newPdf.save();
    res.send({status: "ok"});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.get("/get-files", async(req,res)=>{
  try {
    PdfDetails.find({}).sort({ createdAt: -1 }).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
})
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/forum", forumRoutes);

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
