const express = require('express');
const app = express();
const port = 3001;
const middleware = require("./middleware");
const path = require('path');
const bodyParser = require("body-parser");
const session = require("express-session");

// just requiring the database.js file creates instance of the database class
const mongoose = require("./database");

const server = app.listen(port, ()=> {console.log("Listening now at Port - " + port)});

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    //kind of hasing
    secret: "french fries",
    //save the session
    resave: true,
    //Don't save unitialized session
    //saveUnitialized: false
}));

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');
const logoutRoute = require('./routes/logoutRoutes');

// api routes
const postsApiRoute = require('./routes/api/posts');

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/logout", logoutRoute);

app.use("/api/posts", postsApiRoute);

app.get("/", middleware.requireLogin, (req, res, next) => {

    //payload is used to pass information to the webpage
    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }

    res.status(200).render("home", payload);
})