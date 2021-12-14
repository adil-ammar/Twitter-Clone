const mongoose = require("mongoose");
//mongoose.set('useNewUrlParser', true);
//mongoose.set('useUnifiedTopology', true);
//mongoose.set('useFindAndModify', false);

class Database {

    constructor() {
        this.connect();
    }

    connect() { 
        mongoose.connect("mongodb+srv://admin:dbpassword@twitterclonecluster.cwf4t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(() => {
            console.log("Database connection successful");
        })
        .catch((err) => {
            console.log("Database connection error " + err);
        })
    }
}

module.exports = new Database();