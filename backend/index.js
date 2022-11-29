//imports
const express = require("express");
var cors = require('cors');
const config =  require("./config/config");
const passport = require('passport');
const session = require('express-session');
require('./config/passport');

// express app initialized
const app = express();

// import routes
const userRoute = require("./routes/UserRoute");
const adminRoute = require("./routes/AdminRoute");
const searchRoute = require("./routes/SearchRoute");

// middleware
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    //console.log("middleware");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/search", searchRoute);

// SSO
/*app.get("/useridentity", (req, res) => {
    res.status(200).send({ data: "yooo" });
});*/
app.get("/login", passport.authenticate('saml', config.saml.options, (req, res, next) => {
    console.log("login");
    return res.redirect("http://localhost:3000/sso");
}));
app.post("/login/callback", passport.authenticate('saml', config.saml.options, (req, res, next) => {
    console.log("login");
    return res.redirect("http://localhost:3000/sso");
}));
app.get("/useridentity", (req, res, next) => {
    console.log("useridentity");
    if (!req.isAuthenticated()) {
        console.log("not authenticated");
        return res.status(401).send({ data: "not authenticated" });
    } else {
        console.log("authenticated");
        console.log(req.user);
        res.status(200).send({ user: req.user });
    }
});

// default route
app.get('/', (req, res) => {
    console.log('GET Received')
    res.send('DEFAULT ROUTE!')
});

// listen for requests
const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Backend is running on port ${port}`);
});

module.exports = app;