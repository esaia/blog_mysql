import express, { json } from "express";
import authRoute from "./routes/auth.js";
import postsRoute from "./routes/posts.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import usersRoute from "./routes/users.js";

const app = express();

app.use(json());
app.use(cors());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/ /g, ""));
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file?.filename);
});

app.use("/api/auth/", authRoute);
app.use("/api/posts/", postsRoute);
app.use("/api/users/", usersRoute);

app.listen(8800, () => console.log("connected"));
