const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const recipeController = require("../controllers/recipeController");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now

// GET all recipes
router.get('/all-recipes', ensureAuth, recipeController.getAllRecipes);

// GET recipe by id
router.get('/:id', ensureAuth, recipeController.getRecipe);

// GET create recipe page
// router.get('/create-recipe', recipeController.getCreateRecipePage);

// POST new recipe
router.post('/post-new-recipe', upload.single("file"), recipeController.postNewRecipe);

// POST search for recipe
router.post('/search', recipeController.searchRecipe);

// DELETE recipe
router.delete('/deleteRecipe/:id', recipeController.deleteRecipe);












// router.get("/:id", ensureAuth, postsController.getPost);

// router.post("/createPost", upload.single("file"), postsController.createPost);

// router.put("/likePost/:id", postsController.likePost);

// router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
