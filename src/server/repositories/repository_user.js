const users = new Map();

function createAdmin() {
    createUser("markus", "1234", "Markus Jahnsrud", "05121995", "Oslo");
    createUser("mario", "1234", "Super Mario", "00000000", "Italy");
    createUser("chrome", "1234", "Chrome", "00000000", "USA");
    createUser("westerdals", "1234", "Westerdals", "00000000", "Oslo");
}

function getUser(id) {
    let user = users.get(id.toLowerCase());

    // Crashing :(
    // user.delete("password");

    return user;
}

function verifyUser(id, password) {

    const user = getUser(id.toLowerCase());

    if (user === undefined || user === null) {
        return false;
    }

    // Not an exactly safe solution

    return user.password === password;
}

function createUser(id, password, fullName, birthday, location) {

    id = id.toLowerCase();

    if (getUser(id) !== undefined) {
        return false;
    }

    const user = {
        id: id.toLowerCase(),
        password: password,
        fullName: fullName,
        birthday: birthday,
        location: location,
        dateCreated: Date(),
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

function addFriendForUser(username) {
    // TODO
}

module.exports = {getUser, verifyUser, createUser, createAdmin, findUsers, addFriendForUser};