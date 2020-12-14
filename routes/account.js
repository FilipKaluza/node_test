const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Article = require("../models/article");
const Users = require("../models/users");



// Configure user account profile edit
// --------------------------------------------------
router.get('/', (req, res, next) => {
  if (!req.isAuthenticated()) { 
    res.redirect('/auth/login');
  }
  const users = req.app.locals.users;
  const _id = ObjectID(req.session.passport.user);

  users.findOne({ _id }, async (err, results) => {
      if (err) {
        throw err;
      } else {
          if (results.username == "admin") {
            res.redirect("/myaccount/admin")
          } else {
            res.render(`users/publicProfile`, { results: results });
        }
      }
  });
});
// admin
router.get('/admin', (req, res, next) => {
  if (!req.isAuthenticated()) { 
    res.redirect('/auth/login');
  }
  const users = req.app.locals.users;
  const _id = ObjectID(req.session.passport.user);

  users.findOne({ _id }, async (err, results) => {
      if (err) {
        throw err;
      } else {
          if (results.username == "admin") {
            const users = await Users.find();
            const articles = await Article.find().sort({ createdAt: "desc" }) //all articles from DB sorted from newest
            res.render("users/adminProfile", { results: results, articles: articles, users: users });
          } else {
            res.send("Nepovolený prístup k admin rozhraniu")
        }
      }
  });
});


// Handle updating user profile data
// --------------------------------------------------
router.post('/', (req, res, next) => {

  const users = req.app.locals.users;
  const { name, surname, email, adress, phone } = req.body;
  const _id = ObjectID(req.session.passport.user);

  users.updateOne({ _id }, { $set: { name, surname, email, adress, phone } }, (err) => {
    if (err) {
      throw err;
    }
    
    res.redirect('/myaccount');
  });
});
// --------------------------------------------------

module.exports = router;