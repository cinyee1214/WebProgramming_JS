const express = require('express');
const app = express();
const session = require('express-session');
const exphbs = require("express-handlebars");
const configRoutes = require('./routes');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//middleware function
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true
    }))

// custom middleware functions
// Authentication Middleware:
app.use('/private', async(req, res, next) => {
    if (!req.session.AuthCookie) {
        console.log("You are not logged in!");
        return res.status(403).render("login/error");
    } else {
        next();
    }
});

// Logging Middleware:
// Current Timestamp: new Date().toUTCString()
// Request Method: req.method
// Request Route: req.originalUrl
// Some string/boolean stating if a user is authenticated
app.use(async(req, res, next) => {
    const now = new Date().toUTCString();
    const _method = req.method;
    const route = req.originalUrl;

    if (!req.session.AuthCookie) {
        console.log("[" + now + "]: " + _method + " " + route + " (Non-Authenticated User)");
    } else {
        console.log("[" + now + "]: " + _method + " " + route + " (Authenticated User)");
    }

    next();
});

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});