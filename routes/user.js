const { Router } = require("express");
const User = require("../models/users");
const { createTokenForUser } = require("../services/authentication");

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    await User.create({ fullName, email, password });
    return res.redirect("/user/signin");
  } catch {
    return res.render("signup", {
      error: "Registration failed. Try another email.",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("signin", { error: "Invalid credentials" });
  }

  const ok = await user.matchPassword(password);
  if (!ok) {
    return res.render("signin", { error: "Invalid credentials" });
  }

  const token = createTokenForUser(user);

  return res
    .cookie("token", token, { httpOnly: true })
    .redirect("/");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/user/signin");
});

module.exports = router;
