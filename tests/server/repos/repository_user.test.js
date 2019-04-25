const userRepo = require('../../../src/server/repository_user');

test('Creating user with username foo should return foo. Also gets the user', () => {

    const username = "foo";
    const password = "super-secret-password";
    const fullName = "Foo Bar";
    const birthday = "0000000";
    const location = "Oslo";

    userRepo.createUser(username, password, fullName, birthday, location);
    let user = userRepo.getUser(username);

    expect(user.id).toBe(username);

});

test('Find user by username or full name', () => {

    const username = "foo";
    const password = "super-secret-password";
    const fullName = "Foo Bar";
    const birthday = "0000000";
    const location = "Oslo";

    userRepo.createUser(username, password, fullName, birthday, location);

    // Try both username and full name
    let usersByQueryingUsername = userRepo.findUsers(username);
    let usersByQueryingFullName= userRepo.findUsers(fullName);

    expect(checkIfSearchResultsContainsUsername(usersByQueryingUsername, username)).toBe(true);
    expect(checkIfSearchResultsContainsFullName(usersByQueryingFullName, fullName)).toBe(true);


});

function checkIfSearchResultsContainsUsername(array, username) {
    for(let i = 0; i < array.length; i++) {
        if (array[i].id === username) {
            return true;
            break;
        }
    }

    return false;
}

function checkIfSearchResultsContainsFullName(array, fullName) {
    for(let i = 0; i < array.length; i++) {
        if (array[i].fullName === fullName) {
            return true;
            break;
        }
    }

    return false;
}