const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const WebSocket = require("ws");
const ews = require("express-ws")(app);
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const userRepo = require('./repository_user');
const postRepo = require('./repository_post');
const userRoutes = require('./routes/user');


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
    res.send({ express: 'Welcome 😎 This is your server speaking' });
});

app.get("/api/users/:id", (req, res) => {
    const user = userRepo.getUser(req.params["id"]);

    if (user === undefined || user === null) {
        res.status(404);
        res.send()
    } else {

        res.json(user);
    }

});

app.get("/api/users/search/:id", (req, res) => {
    const users = userRepo.findUsers(req.params["id"])

    if (users === undefined || users === null) {
        res.status(404);
        res.send()
    } else {

        res.json(users);
    }

});



/*
Posts
 */


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

        postRepo.createPost("COMING SOON", "AUTHOR", "");

        //do a broadcast to all existing clients
        ews.getWss().clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                /*
                    even if a single msg, we will have it in a list of size 1.
                    This does simplify the code on the client, as it does not
                    need to distinguish between the download of all msgs on connection
                    and these following broadcasts, i.e., they ll have the same structure.
                 */
                client.send(JSON.stringify(["TEST"]));

            } else {
                console.log("Received invalid message: " + dto.message)
            }


        });

    });
});

app.post('/api/posts', (req, res) => {
   const post = req.body;
   const id = postRepo.createPost(post.content, post.author, post.link);

   console.log("Received: " + id);

   res.status(201);
   res.header("location", "/api/posts/" + id);
   res.send();

});

/*
WebSockets and Chat
 */

let counter = 0;
const messages = [];

function messageIsValid(input) {
    if (input.length > 0) {
        return true;
    }

    return false;
}

app.ws("/chat_api", function(ws, req) {
    console.log('Connected: WebSocket');

    /*
        new connection, send all existing messages.
        Note: this would not handle the case of a client that already
        had the data from previous connection, and started a new one (will get duplicates)
     */
    
    ws.send(JSON.stringify(messages));
    ws.on('message', fromClient => {
        /*
            what we get from client is a string.
            not only we need to parse it into a JSON object, but
            also want to add a unique id to it (which we would need
            if wanted to handle avoiding sending duplicated msgs)
         */

        const dto = JSON.parse(fromClient);
        const id = counter++;
        const msg = {id: id, author: dto.author, message: dto.message};

        if (messageIsValid(dto.message)) {
            //add to our current local store
            messages.push(msg);

            //do a broadcast to all existing clients
            ews.getWss().clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    /*
                        even if a single msg, we will have it in a list of size 1.
                        This does simplify the code on the client, as it does not
                        need to distinguish between the download of all msgs on connection
                        and these following broadcasts, i.e., they ll have the same structure.
                     */
                    client.send(JSON.stringify([msg]));
                }
            });
        } else {
            console.log("Received invalid message: " + dto.message)
        }


    });
});

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

//handling 404
app.use((req, res, next) => {
    // res.send("Page not found", 404)
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = app;