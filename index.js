const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); // for using delete, put, patch
var logger = require('morgan');

// for admin: 
const passport = require("passport"); // for admin
const Strategy = require("passport-local"); // for admin
const session = require('express-session');  // for admin
const flash = require("connect-flash"); // for admin
const authUtils = require("./utils/auth");



// Database MongoDB
const mongoose = require("mongoose");

// import routes
const blogRouter = require("./routes/blog");
const homeRouter = require("./routes/homepage");
const contactRouter = require("./routes/contact");
const galeryRouter = require("./routes/galery");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/account");
const cookieParser = require("cookie-parser");



// Init app
const app = express();


// init db
mongoose.connect("mongodb://mongo:27017/express-mongo", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));;


// DB
const db = require("./models/users");
const users = db.find();
app.locals.users = users;



// Configure passport
passport.use(new Strategy(
    (username, password, done) => {
        db.findOne( { username }, (err, user ) => {
                if (err) {
                    return done(err);
                }

                if (!user ) {
                    return done(null, false);
                }

                if (user.password != authUtils.hashPassword(password)) {
                    return done(null, false);
                }

                return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id );
});

passport.deserializeUser((id, done) => {
    done(null, { id });
})

// Load view engine
app.set("/views", path.join(__dirname, "/views"));
app.set("view engine", "pug");




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash())

// static folder
app.use("/static", express.static(path.join(__dirname, "/static")));

// pre login -session
app.set('trust proxy', 1) // trust first proxy

app.use(session({
    secret: 'session secret',
    resave: false,
    saveUninitialized: false,
    }
));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// when is somebody looged
app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
});



// for Blog
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));


// Routers
app.use(homeRouter);
app.use("/blog", blogRouter);
app.use("/contact", contactRouter);
app.use("/galery", galeryRouter);
app.use("/myaccount", usersRouter);
app.use("/auth", loginRouter);




// Start server
const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log('Server running...'));

module.exports = app;