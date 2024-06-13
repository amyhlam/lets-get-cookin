const cloudinary = require("../middleware/cloudinary");
const Recipe = require("../models/Recipe");
const Comment = require("../models/Comment")

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/recipe/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({_id: req.params.commentid});
      res.redirect("/recipe/"+req.params.recipeid)
    } catch (err) {
      console.log(err)
    }
  },
};
