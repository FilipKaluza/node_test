const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');


// Contact
router.get("/", (req, res) => {
    res.render("contact/contactme")
});

// Contactpage - contactform
router.post('/contactform', (req, res) => {

    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "#",
        pass: "#"
      }
    })
  
    // Specify what the email will look like
    const mailOpts = {
      from: 'Your sender info here', // This is ignored by Gmail
      to: "°",
      subject: 'Správa z kontaktného formulára cielo',
      text: `Správa od: ${req.body.name}, email: (${req.body.email}) Správa: ${req.body.message}`
    }

    console.log(mailOpts);
  
    // Attempt to seind the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        if (error) {
            res.redirect("fail");
        } else {
            response.send( "Email has been sent")
            }
        }
    )
  })

module.exports = router;




