const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

const checkAuth = require("./middlewares/checkAuth");
const userRoute = require("./routes/user");
const blogRoute=require('./routes/blogs');
const mongoose = require("mongoose");

const PORT = 5677;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


app.use("/user", userRoute);
app.use('/add',blogRoute);

app.get("/", checkAuth, (req, res) => {
  return res.render("home", {
    user: req.user,
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

start();
