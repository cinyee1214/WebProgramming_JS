const express = require('express');
const router = express.Router();
const data = require('../data/users');
const bcrypt = require('bcryptjs');

router.get('/', async(req, res) => {
    if (req.session.AuthCookie) {
        res.redirect('/private');
    } else {
        const title = 'Welcome to Login Page!';
        res.render('login/login', { title: title });
    }

});


router.post('/login', async(req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        const error = '401: You must provide a username and a password!';
        res.status(401).render("login/login", { Error: true, error: error });
        return;
    }

    try {
        let curUser = await data.getUserData(username);

        if (!curUser) {
            const error = '401: User not found! You must provide a valid username!';
            res.status(401).render("login/login", { Error: true, error: error });
            return;
        }

        let match = await bcrypt.compare(password, curUser.hashedPassword);

        if (!match) {
            const error = '401: Password not correct! You must provide a valid password!';
            res.status(401).render("login/login", { Error: true, error: error });
            return;
        }

        req.session.AuthCookie = curUser;
        res.redirect('/private');
    } catch (e) {
        res.status(500).json({ error: e });
    }
    // let curUser = await data.getUserData(username);

    // if (!curUser) {
    //     const error = '401: User not found! You must provide a valid username!';
    //     res.status(401).render("login/login", { Error: true, error: error });
    //     return;
    // }

    // let match = bcrypt.compare(password, curUser.hashedPassword);

    // if (!match) {
    //     const error = '401: Password not correct! You must provide a valid password!';
    //     res.status(401).render("login/login", { Error: true, error: error });
    //     return;
    // }

    // req.session.AuthCookie = curUser;
    // res.redirect('/private');

});

router.get('/private', async(req, res) => {
    const title = 'Welcome to Private Page!';
    try {
        const curUser = req.session.AuthCookie;
        // console.log(curUser);

        res.render('login/private', { title: title, curUser: curUser });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get('/logout', async(req, res) => {
    try {
        const title = "ByeBye!"
        res.clearCookie("AuthCookie");
        req.session.destroy();
        res.render('login/logout', { title: title });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});


module.exports = router;