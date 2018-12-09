var Post = require('../models/post');
var async = require('async');
// Good validation documentation available at https://express-validator.github.io/docs/
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all posts.
exports.index = function(req, res, next) {
  Post.find({}).exec(function (err, list_posts) {
    if (err) { return next(err); }
    // Successful, so render
    res.send(list_posts);
  });

};

// Handle book create on POST.
exports.create = function(req, res, next) {
  sanitizeBody('*').trim().escape();
  // Create a post object
  // Improve: Use promises with .then()
  var post = new Post(
    req.body
  );

    post.save(function (err) {
      if (err) { return next(err); }
      // Successful - redirect to new book record.
      res.send('success');
    });
  };

  exports.delete = function(req, res, next) {
      // async.parallel({
      //     _id: function(callback) {
      //       Post.findById(req.body.id).exec(callback)
      //     },
      // }, function(err, results) {
      //     if (err) { return next(err); }
      //     // Success
      Post.remove({_id: req.params.id},
	       function(err){
		         if(err) res.json(err);
		         else    res.redirect('/');
	       });
  };

// exports.delete = function(req, res, next) {
//     var id = req.params.id;
//     console.log(id);
//     post.deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
//     });
//
//     res.json({ success: id })
//   };
