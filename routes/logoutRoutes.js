const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require('../schemas/UserSchema');

//using the pug webframework for templates
app.set("view engine", "pug");
app.set("views", "views");

//app uses the body parser now
app.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    if(req.session) {
        req.session.destroy(() => {
            res.redirect("/login");
        })
    }
})

module.exports = router;