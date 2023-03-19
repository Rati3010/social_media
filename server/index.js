import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { connection } from "./config/db.js";
import authRoutes from "./routes/auth.js"

// Configuration
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FIle Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

//  Routes with files
app.post('/auth/register', upload.single("picture"), register);

// routes
app.use("/auth", authRoutes)

//  Mongoose setup
const port = process.env.port || 8080;
app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to DB sucessfully")
    } catch (error) {
        console.log(error)
    }
})