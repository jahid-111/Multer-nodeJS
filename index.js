const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();

const port = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(port, () => console.log(`Server ON at http://localhost:${port}`));
