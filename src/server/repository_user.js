const users = new Map();

function createAdmin() {
    createUser("Markus", "1234", "Markus Jahnsrud", "05121995", "Oslo");
    createUser("Test", "1234", "Test User", "00000000", "Oslo");
}

function getUser(id){

    return users.get(id);
}

function verifyUser(id, password){

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



module.exports = {getUser, verifyUser, createUser, createAdmin};