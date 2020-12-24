const UserModel = require('../models/user');
const AuthorityModel = require('../models/authority');

//Find all Users
exports.getUsers = async function (query, page, limit) {
    try {
        const users = await UserModel.find(query);
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users');
    }
}
exports.createAuthority = async function(username) {
    try {
        if(!await AuthorityModel().findOne({authUsername: username})){
            AuthorityModel().create({
                username: username,
                isAuth: true
            })
        }
    }catch(e) {
        throw Error('Error while doing that auth shit');
    }
}
exports.createUsers = async function (query, page, limit) {
    try {
        console.log('Yeehaw')
        const john = await User.create({
            UserId: 1
        });
        return john;
    } catch (e) {
        // Log Errors
        throw Error('Error while creating Users')
    }
}
