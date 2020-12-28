const db = require ('../models')
const Sequelize = require('sequelize')
const {createRating} = require("../services/ratingService");

//Create
function createAuthority (username) {
    const count = 0;
    let exists = 'The authority was created'
    try {
        exists = db.Authority.count({ where: { authUsername: username } })
            .then(count => {
                if (count === 0) {
                    db.Authority.create({
                        authUsername: username,
                        isAuth: true
                    })
                } else {
                    const exists = 'The username already exists in the authorities'
                    return exists
                }
            })
        return exists
    }catch(e) {
        throw Error('Error while creating new authority');
    }
}

async function createPetSitter(desc, id, categ){
    return await db.PetSitter.create({
        description: desc,
        categs: [categ],
        user_id: id,
    })
}

async function createPetOwner(n, id){
    return await db.PetOwner.create({
        ownedPets: n,
        user_id: id,
    })
}

async function createNewUserPetSitter (username, password, email, firstname, lastname, phone, city, country, desc, categ) {
    const role = 'petsitter'
    user = await db.User.create({
            username: username,
            password: password,
            email: email,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            city: city,
            country: country,
            role: role,
        })
    sitter = await createPetSitter(desc, user.id, categ);
    await createRating(sitter.id, [], 0)

}

async function createNewUserPetOwner (username, password, email, firstname, lastname, phone, city, country, nop) {
    const role = 'petowner'
    user = await db.User.create({
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        city: city,
        country: country,
        role: role,
    })
    await createPetOwner(nop, user.id);
}

//Search
async function getAllUsers (){
    return await db.User.findAll({
        include: [
        {model: db.PetSitter}, {model: db.PetOwner}
    ]});
}

async function findAllPetSitters() {
    return await db.User.findAll({
        where: {
            role: 'petsitter'
        },
        include: [
            {model: db.PetSitter}
        ]
    })
}

async function findAllPetOwners() {
    return await db.User.findAll({
        where: {
            role: "petowner"
        },
        include: [
            {model: db.PetOwner}
        ]
    })
}

async function findPetSitterByCity(city) {
    return user = await db.User.findAll({
        where: {
            city: city,
            role: 'petsitter'
        },
        include: [
            {model: db.PetSitter}
        ]
    })
}
async function findPetSitterByCateg(categ) {
    return user = await db.PetSitter.findAll({
        where: {
            categs: {[Sequelize.Op.overlap]: [categ]}
        },
        include: [
            {model: db.User}
        ]
    })
}

async function findPetSitterByCategAndCity(city, categ) {
    return petsitters = await db.PetSitter.findAll({
        where: {
            '$User.city$' :city ,
            categs: {[Sequelize.Op.overlap]: [categ]}
        },
        include: [
            {model: db.User}
        ]
    });
}

async function findPetSitterByUsername(username) {
    return await db.User.findAll({
        where: {
            username: username
        },
        include: [
            {model: db.PetSitter}
        ]
    })
}
async function findPetSitterByName(name) {
    return await db.User.findAll({
        where: {
            [Sequelize.Op.or]: [{firstname: name}, {lastname: name}]
        },
        include: [
            {model: db.PetSitter}
        ]
    })
}

//Simple Update
async function updateUserFirst(username, newFirst) {
    console.log(username)
    return await db.User.update({firstname: newFirst}, {
        where: {
            username: username
        }
    })
}

async function flagUser (username) {
    db.User.update({flag: true}, {
        where: {
            username: username
        }
    })
}
async function updateAcceptedCategs(username, Categ) {
    user = await db.User.findOne({ where: { username: username } })
    return await db.PetSitter.update({categs: Sequelize.fn('array_append', Sequelize.col('categs'), Categ)}, {
        where: {
            user_id: user.id,
            [Sequelize.Op.not]: {
                categs: {
                    [Sequelize.Op.contains]: [Categ]
                }
            }
        }
    })
}

//Simple Update with no Controllers
function updateUserLast(newLast, username) {
    db.User.update({lastname: newLast}, {
        where: {
            username: username
        }
    })
}
function updateUserPhone(newPhone, username) {
    db.User.update({phone: newPhone}, {
        where: {
            username: username
        }
    })
}
function updateUserEmail(newEmail, username) {
    db.User.update({email: newEmail}, {
        where: {
            username: username
        }
    })
}
function updateUserPassword(newPassword, username) {
    db.User.update({password: newPassword}, {
        where: {
            username: username
        }
    })
}
function updateUserDOB(newDB, username) {
    db.User.update({dob: newDB}, {
        where: {
            username: username
        }
    })
}
function updateUserCity(newCity, username) {
    db.User.update({city: newCity}, {
        where: {
            username: username
        }
    })
}
function updateUserCountry(newCountry, username) {
    db.User.update({country: newCountry}, {
        where: {
            username: username
        }
    })
}

//Delete
async function DeleteUser (username) {
    db.User.destroy({
        where: {
            username: username
        }
    })
}


module.exports = {
    getAllUsers, createAuthority, createNewUserPetOwner, createNewUserPetSitter, findAllPetSitters, findAllPetOwners, updateUserFirst, findPetSitterByCity, findPetSitterByCateg, findPetSitterByUsername, findPetSitterByName, DeleteUser, flagUser, updateAcceptedCategs, findPetSitterByCategAndCity,
}
