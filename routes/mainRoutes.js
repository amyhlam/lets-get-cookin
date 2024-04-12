const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const recipeController = require("../controllers/recipeController");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getLoginSignup);
router.get("/profile", ensureAuth, recipeController.getProfile);
router.get("/homepage", ensureAuth, recipeController.getHomepage);
// router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


router.get('/create-recipe', recipeController.getCreateRecipePage);

module.exports = router;
