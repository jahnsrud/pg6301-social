const users = new Map();

function createAdmin() {
    createUser("markus", "1234", "Markus Jahnsrud", "05121995", "Oslo");
    createUser("test", "1234", "Test User", "00000000", "Oslo");
    createUser("something", "1234", "Something", "00000000", "Oslo");
    createUser("vivaldi", "1234", "Vivaldi app", "00000000", "Oslo");
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

    id = id.toLowerCase();

    const user = {
        id: id,
        password: password,
        fullName: fullName,
        birthday: birthday,
        location: location,
        friends: []

    };

    users.set(id, user);
    return true;
}

function findUsers(search) {

    console.log("Searching for: " + search);

    let searchResults = [];

    for (let user of users.values()) {
        console.log(user);
        if ((user.id.toLowerCase() === search.toLowerCase()) || (user.fullName.toLowerCase() === search.toLowerCase())) {
            searchResults.push(user);
        }
    }

    return searchResults;
}

module.exports = {getUser, verifyUser, createUser, createAdmin, findUsers};