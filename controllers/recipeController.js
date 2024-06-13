const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const User = require("../models/User")
const Comment = require("../models/Comment")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const recipe = await Recipe.find({ user: req.user.id });
      res.render("profile.ejs", { recipe: recipe, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getHomepage: async (req, res) => {
    try{
        const limitNumber = 10;
        const recentRecipes = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);

        const food = { recentRecipes };
        res.render('homepage', { title: `Let's Get Cookin' - Homepage`, food })
    } catch (error) {
        console.log(error);
    }   
  },
  getAllRecipes: async (req, res) => {
    try {
        let name = req.body.name;
        // let recipeUserId = req.body.user;
        // let user = await User.findOne({recipeUserId})
        const recipe = await Recipe.find({}).sort({name: 1});

        res.render('all-recipes', { title: `Let's Get Cookin' - All Recipes`, recipe });
    } catch (error) {
        console.log(error);
    }
  },
  getRecipe: async (req, res) => {
    try {
      let user = req.user.id;
      let recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
      res.render('recipe', { title: `Let's Get Cookin' - ${recipe.name}`, recipe, user, comments: comments });
    } catch (error) {
        console.log(error);
    }
  },
  getCreateRecipePage: async (req, res) => {
    try {
        res.render('create-recipe', { title: `Let's Get Cookin' - Create A New Recipe` });
    } catch (error) {
        console.log(error);
    }
  },
  postNewRecipe: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // await Recipe.create({
      //   title: req.body.title,
      //   image: result.secure_url,
      //   cloudinaryId: result.public_id,
      //   caption: req.body.caption,
      //   likes: 0,
      //   user: req.user.id,
      // });

      const newRecipe = new Recipe({
        name: req.body.name,
        servings: req.body.servings,
        cookingTime: req.body.cookingTime,
        summary: req.body.summary,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
        createdByUsername: req.user.userName,
      });
      await newRecipe.save();
      // await Recipe.create({
      //   name: req.body.name,
      //   servings: req.body.servings,
      //   cookingTime: req.body.cookingTime,
      //   summary: req.body.summary,
      //   ingredients: req.body.ingredients,
      //   instructions: req.body.instructions,
      //   image: result.secure_url,
      //   cloudinaryId: result.public_id,
      //   user: req.user.id,
      // })
      console.log("Recipe has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  searchRecipe: async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm;
        let recipe = await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true } } );
        // res.json(recipe)
        res.render('search', { title: `Let's Get Cookin' - Search`, recipe, searchTerm } );
    } catch (error) {
        console.log(error);
    }
  },
  deleteRecipe: async (req, res) => {
    try {
      // Find post by id
      let recipe = await Recipe.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(recipe.cloudinaryId);
      // Delete post from db
      await Recipe.remove({ _id: req.params.id });
      console.log("Deleted Recipe");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  }
}