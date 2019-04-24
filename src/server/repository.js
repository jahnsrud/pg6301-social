const users = new Map();


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

function createUser(id, password){

    if(getUser(id) !== undefined ){
        return false;
    }

    const user = {
        id: id,
        balance: 1000,
        password: password
    };

    users.set(id, user);
    return true;
}


function sendBook(senderId, receiverId, amount){

    amount = parseInt(amount);

    if(isNaN(amount) || amount <= 0 || senderId === receiverId){
        return false;
    }

    const sender = users.get(senderId);
    const receiver = users.get(receiverId);

    if(sender === undefined || receiver === undefined){
        return false;
    }

    if(sender.balance < amount){
        return false;
    }

    sender.balance -= amount;
    receiver.balance += amount;

    return true;
}

module.exports = {getUser, verifyUser, createUser};