const express = require("express");
const router = express.Router();
const request = require("request");

// Homepage
router.get("/", (req, res) => {
    res.render("homepage/home.pug", {page_name: 'home'})
});

// Homepage - newsletter signup
router.post("/signup", (req, res) => {
    
    // structure of post data
    const data = {
        members: [
            {
                email_address: req.body.email,
                status: "subscribed",
            }
        ]
    }
    // convert to string, because it required in api
    const postData = JSON.stringify(data);

    // connect with api
    const options = {
        url: "https://us2.api.mailchimp.com/3.0/lists/281e30a0f7",
        method: "POST",
        headers: {
            Authorization: "auth e938ea47616a0531fd7d37fb38138aa4-us2"
        },
        body: postData
    }
    console.log(options);

    // error handling api
    request(options, (err, response, body) => {
        if (err) {
            res.redirect("fail");
        } else {
            if(response.statusCode === 200) {
                //req.flash('info', "Správa odoslanáa");
                res.json( {success: true});
                console.log(response.statusCode);
            } else {
                res.json( { message: "nepodarilo sa prihlásiť"} );
                console.log(response.statusCode);
            }
        }
    });

});

module.exports = router;
