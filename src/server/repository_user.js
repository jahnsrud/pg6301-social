const users = new Map();

let idCount = 0;

function createAdmin() {
    createUser("Markus", "1234", "Markus Jahnsrud", "05121995", "Oslo");
    createUser("Test", "1234", "Test User", "00000000", "Oslo");
}

function getUser(id) {
    let user = users.get(id);

    // Crashing :(
    // user.delete("password");

    return user;
}

function verifyUser(id, password) {

    const user = getUser(id);

    if(user === undefined){
        return false;
    }

    /*
        WARNING: remember that those passwords should be hashed,
        with salt and pepper...
        But we are not dealing with backend details
        in this course, like secure storage of passwords
     */
    return user.password === password;
}

function createUser(id, password, fullName, birthday, location){

    if(getUser(id) !== undefined ){
        return false;
    }

    const user = {
        id: id,
        fullName: fullName,
        birthday: birthday,
        location: location,
        password: password
    };

    users.set(id, user);
    return true;
}

function findUsers(search) {

    console.log("Searching for: " + search);

    let searchResults = [];

    for (let user of users.values()) {
        console.log(user);
        if (user.id === search) {
            searchResults.push(user);
        }
    }

    return searchResults;
}

module.exports = {getUser, verifyUser, createUser, createAdmin, findUsers};