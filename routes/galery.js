const express = require("express");
const router = express.Router();

// Galery
router.get("/", (req, res) =>{
    res.redirect("galery/kolace" )
});

router.get("/kolace", (req, res) => {
    res.render("galery/kolace" )
});

router.get("/dezerty", (req, res) => {
    res.render("galery/dezerty")
});

router.get("/torty", (req, res) => {
    res.render("galery/torty")
});


module.exports = router;