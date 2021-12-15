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

    res.status(200).render("login");
})

router.post("/", async (req, res, next) => {

    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword){
        //await can only be used in async functions
        var user = await User.findOne({
            $or: [
                // here both are same coz user enters either username or email and we pass that to both username and email and any one find means user exists.
                { username: req.body.logUsername },
                { email: req.body.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });

        if(user != null){
            // req.body.logPassword is the latest entry from the user
            // user.password is what we found from the DB
            // hover over the compare function, says it returns a promise => its an async function. handle it using "await" or ".then"
            var result = await bcrypt.compare(req.body.logPassword, user.password)

            if(result === true){
                req.session.user = user;
                return res.redirect("/");
            }
            
        }

        payload.errorMessage = "Login credentials incorrect, try again!";
        return res.status(200).render("login", payload);
    }

    payload.errorMessage = "Make sure each field has a valid value";
    res.status(200).render("login", payload);
})

module.exports = router;