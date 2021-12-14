const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require('../schemas/UserSchema');
const bcrypt = require("bcrypt");

//using the pug webframework for templates
app.set("view engine", "pug");
app.set("views", "views");

//app uses the body parser now
app.use(bodyParser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    res.status(200).render("register");
})

router.post("/", async (req, res, next) => {
    //body parser. Used to fetch contents of the form.
    var firstname = req.body.firstName.trim();
    var lastname = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;

    // table = collection, row = document
    if(firstname && lastname && username && email && password){
        // await keyword to make the User.findOne function synchronous from asynchronous
        var user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("register", payload);
        });

        if(user == null){
            // no existing user found, add new user
            var data = req.body;
            
            data.password = await bcrypt.hash(password, 10);

            User.create(data)
            .then((user) => {
                //saving the user in session object
                req.session.user = user;
                res.redirect("/");
            })
        }

        else{
            // user already exists
            if(email == user.email){
                payload.errorMessage = "Account associated with the email already exists."
            }
            else{
                payload.errorMessage = "Username already in use.";
            }
            res.status(200).render("register", payload);
        }
    }

    else{
        payload.errorMessage = "Make sure each entry has a valid value";
        res.status(200).render("register", payload);
    }

    // console.log(req.body);
})

module.exports = router;