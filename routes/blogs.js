const { Router } = require("express");
const Blog = require("../models/blog");
const checkAuth = require("../middlewares/checkAuth");

const router = Router();
router.get("/blog", checkAuth, (req, res) => {
  res.render("addblog");
});


router.post("/blog", checkAuth, async (req, res, next) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.render("addblog", {
        error: "Title and body are required",
      });
    }

    await Blog.create({
      title,
      body,
      createdBy: req.user._id, 
    });

    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
