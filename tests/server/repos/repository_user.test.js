const userRepo = require('../../../src/server/repository_user');

test('Creating user with username foo should return foo. Also gets the user', () => {

    const username = "foo";
    const password = "super-secret-password";
    const fullName = "FooBar";
    const birthday = "0000000";
    const location = "Oslo";

    let newUser = userRepo.createUser(username, password, fullName, birthday, location);
    let user = userRepo.getUser(username);

    expect(user.id).toBe(username);

});
