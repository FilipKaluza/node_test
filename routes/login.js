const express = require("express");
const router = express.Router();
const authUtils = require("../utils/auth");
const passport = require("passport");
const Users = require("../models/users");


// Login
router.get("/login", async (req, res, next) => {
    res.render("login/login");
})


router.post('/login', passport.authenticate('local', 
  { failureRedirect: '/auth/login', 
    failureFlash: 'Wrong username or password'}), (req, res, next) => {
        res.redirect('/myaccount');

});


// Register new user
router.get("/register", (req, res, next) => {
    const messages = req.flash();
    res.render("login/register", { messages, users: new Users()  })
});

router.post("/register", async (req, res, next) => {
    const registrationParams = req.body;
    let user = new Users({
        username: registrationParams.username,
        password: authUtils.hashPassword(registrationParams.password),
    })

    try {
        user = await user.save()
        req.flash("success", "You have been already registered")
        res.redirect("/auth/login")
    } catch (e) {
        console.log(e);
        req.flash("error", "Something went wrong, please try again")
        res.redirect("/auth/register")
    }
})


// Logout
router.get("/logout", (req, res, next) => {
    if(req.session){
        req.session.destroy((error)=>{
           if(error){
             console.log(error);
           }
        });
    }
    res.redirect("/")
})

module.exports = router;