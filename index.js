const express = require("express");
const path = require("path")

// Init app
const app = express();

// Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Routing
app.get("/", (req, res) => {
    res.send("Hello World update")
});

// Start server
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Server started" );

});