import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import path from "path" //module to work with directoy paths
import { fileURLToPath } from "url"//convert file URLs to file paths
import { register } from "./controllers/auth.js"
import multer from "multer"
import bodyParser from "body-parser"


import authRoutes from "./routes/auth.js"


//configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app=express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));

app.use(morgan("common"));

//body parser middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

//file storage
const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload=multer({storage});
//user route
app.post("/auth/register",upload.single("picture"),register);
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, )
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

