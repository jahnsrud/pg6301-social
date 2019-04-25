const express = require('express');
const router = express.Router();
const passport = require('passport/lib');
const UserRepo = require('../repositories/repository_user');

router.get("/users/:id", (req, res) => {

    console.log("Getting user: " + req.params["id"])
    const user = UserRepo.getUser(req.params["id"]);

    if (user === undefined || user === null) {
        res.status(404);
        res.send()
    } else {

        res.json(user);
    }

});

router.get("/users/search/:id", (req, res) => {
    const users = UserRepo.findUsers(req.params["id"]);

    if (users === undefined || users === null) {
        res.status(404);
        res.send()
    } else {

        res.json(users);
    }

});



/*
    The login will apply the Passport filter to check if provided
    username/password are correct.
    See "passport.use(new LocalStrategy" in app.js
 */
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.status(204).send();

});

router.post('/register', function (req, res) {

    const created = UserRepo.createUser(req.body.userId, req.body.password, req.body.fullName, req.body.birthday, req.body.location);

    if (!created) {
        res.status(400).send();
        return;
    }

    /*
        The incoming HTTP request was not authenticated. However, once we
        create a valid new user, we should manually authenticate the request.
        Otherwise, user would need to make a separate "/api/login" call.
     */
    passport.authenticate('local')(req, res, () => {
        req.session.save((err) => {
            if (err) {
                //shouldn't really happen
                res.status(500).send();
            } else {
                res.status(201).send();
            }
        });
    });
});

router.post('/logout', function (req, res) {

    req.logout();
    res.status(204).send();
});


/*
    Provide info on logged in user
 */
router.get("/user", (req, res) => {

    /*
        If a user is logged in by providing the right session cookie,
        then Passport will automatically instantiate a valid User object
        and add it to the incoming "req" object
     */

    if (req.user) {
        res.json({
            userId: req.user.id
        });
        return;
    }

    res.status(401).send();
});


module.exports = router;