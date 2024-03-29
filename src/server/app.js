const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const ews = require("express-ws")(app);
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const userRepo = require('./repositories/repository_user');
const postRepo = require('./repositories/repository_post');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(session({
    secret: 'SOCIAL_SUPER_SUPERSUPER_SECRET',
    resave: false,
    saveUninitialized: false
}));

userRepo.createAdmin();
postRepo.populatePosts();

// Just a "fun" hello world message
app.get('/api/welcome', (req, res) => {
    res.send({express: 'Welcome 😎 This is your server speaking'});
});

app.get('/profile-image-file', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'img', 'profile-picture.png'));

});

/*
Posts
 */
app.post('/api/posts', (req, res) => {
    const post = req.body;
    const id = postRepo.createPost(post.content, post.author, post.link);


    console.log("Received: " + id);

    res.status(201);
    res.header("location", "/api/posts/" + id);
    res.send();

});

app.ws('/', (ws, req) => {
    console.log('Connected: WebSocket');

    ws.send(JSON.stringify(postRepo.getAllPosts()));

    ws.on('message', fromClient => {
        /*
            what we get from client is a string.
            not only we need to parse it into a JSON object, but
            also want to add a unique id to it (which we would need
            if wanted to handle avoiding sending duplicated msgs)
         */

        //do a broadcast to all existing clients
        ews.getWss().clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(postRepo.getAllPosts()));
            }
            else {
                console.log("Received invalid message: " + dto.message)
            }


        });

    });
});



/*
WebSockets and Chat
 */

let messageId = 0;
const messages = [];

function messageIsValid(input) {
    if (input.length > 0) {
        return true;
    }

    return false;
}

app.ws("/chat_api", function (ws, req) {
    console.log('Connected: WebSocket');

    ws.send(JSON.stringify(messages));
    ws.on('message', fromClient => {
        /*
            what we get from client is a string.
            not only we need to parse it into a JSON object, but
            also want to add a unique id to it (which we would need
            if wanted to handle avoiding sending duplicated msgs)
         */

        const dto = JSON.parse(fromClient);
        const id = messageId++;
        const msg = {id: id, author: dto.author, message: dto.message};

        if (messageIsValid(dto.message)) {
            //add to our current local store
            messages.push(msg);

            //do a broadcast to all existing clients
            ews.getWss().clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([msg]));
                }
            });
        } else {
            console.log("Received invalid message: " + dto.message)
        }


    });
});

// Passport code from:
// https://github.com/arcuri82/web_development_and_api_design/blob/d75fefb867d73ab8c5ecbde2629dc496d1f44644/exercise-solutions/quiz-game/part-08/src/server/app.js

passport.use(new LocalStrategy(
    /*
        Need to tell which fields represent the  "username" and which the "password".
        This fields will be in a Form or JSON data sent by user when authenticating.
     */
    {
        usernameField: 'userId',
        passwordField: 'password'
    },
    function (userId, password, done) {

        const ok = userRepo.verifyUser(userId, password);

        if (!ok) {
            return done(null, false, {message: 'Invalid username/password'});
        }

        const user = userRepo.getUser(userId);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    const user = userRepo.getUser(id);

    if (user !== undefined) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());


//--- Routes -----------
app.use('/api', userRoutes);
// app.use('/api/posts', postsRoutes);


//handling 404
app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;