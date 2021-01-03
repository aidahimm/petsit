const db = require ('../models')
const Sequelize = require('sequelize')
const {createRating} = require("../services/ratingService");
const jwt = require ('jsonwebtoken')

//Create
async function authenticateAuth(newAuthUsername, newAuthPassword, res, authUsername, authPassword){
    let auth = await db.Authority.findOne({
        where: {
            [Sequelize.Op.and]: [{authUsername: authUsername}, {authPassword: authPassword}]
        }
    })
    if (auth !== null){
        await createAuthority(newAuthUsername, newAuthPassword, res)
    } else {
        res.send('Authority authentication Failed...')
    }
}
async function createAuthority (newAuthUsername, newAuthPassword, res) {
    let auth = await db.Authority.findOne({
        where:{
            authUsername: newAuthUsername
        }
    })
    if(auth === null){
        db.Authority.create({
            authUsername: newAuthUsername,
            authPassword: newAuthPassword,
            isAuth: true
        })
    } else {
        res.send('This admin account exists!')
    }
}

async function login(res, username, password){
    let user = await db.User.findOne({
        where: {
            [Sequelize.Op.and]: [{username: username}, {password: password}]
        }
    })
    if(user !== null) {
        return token = jwt.sign({user}, 'secretkey');
    } else {
        res.send('Incorrect username or password')
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

async function signUpUserPetSitter (res, username, password, email, firstname, lastname, phone, city, country, desc, categ) {
    const role = 'petsitter'
    let exists = await db.User.findOne({
        where: {
            username: username
        }
    })
    if ( exists === null ) {
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
    } else {
        res.send('Username already exist... Please enter a new one')
    }

}

async function signUpUserPetOwner (res, username, password, email, firstname, lastname, phone, city, country, nop) {
    const role = 'petowner'
    let exists = await db.User.findOne({
        where: {
            username: username
        }
    })
    if ( exists === null ) {
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
    } else {
        res.send('Username already exist... Please enter a new one')
    }
}

//Search
async function getAllUsers (){
    return await db.User.findAll({
        include: [
        { model: db.PetSitter }, { model: db.PetOwner }
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
            [Sequelize.Op.and]: {
                [Sequelize.Op.or]: [{firstname: name}, {lastname: name}],
                role: 'petsitter'
            }
        },
        include: [
            {model: db.PetSitter}
        ]
    })
}

//Simple Update
async function flagUser (res, username) {
    if ( await db.User.update({flag: true}, {
        where: {
            username: username
        }
    }) === 0){
        res.send('Account does not exist! Please enter a correct username...')
    }
}

async function updateUserEmail(res, newEmail, username) {
    if (( await db.User.update({email: newEmail}, {
        where: {
            username: username
        }
    })) === 0) {
        res.send('Account does not exist! Please enter a correct username...')
    }
}

async function updateUserPassword(res, newPassword, username) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if(user !== null){
        if(newPassword === user.password){
            res.send("Your new password can't be the same as your old password")
        } else {
            await user.update({password: newPassword})
        }
    } else {
        res.send('Account does not exist! Please enter a correct username...')
    }
}
async function updateAcceptedCategs(res, username, Categ) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if ( await db.PetSitter.update({categs: Sequelize.fn('array_append', Sequelize.col('categs'), Categ)}, {
        where: {
            user_id: user.id,
            [Sequelize.Op.not]: {
                categs: {
                    [Sequelize.Op.contains]: [Categ]
                }
            }
        }
    }) === 0) {
        res.send('Account does not exist! Please enter a correct username...')
    }
}

//Simple Update with no Controllers
//Unexposed
async function updateUserFirst(username, newFirst) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if(user === null){
       return await db.User.update({firstname: newFirst}, {
            where: {
                username: username
            }
        })
    } else {
        res.send('Account does not exist! Please enter a correct username...')
    }

}
async function updateUserLast(res, newLast, username) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if(user === null){
        db.User.update({lastname: newLast}, {
            where: {
                username: username
            }
        })
    } else {
        res.send('Account does not exist! Please enter a correct username...')
    }
}
async function updateUserPhone(res, newPhone, username) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if(user === null){
        db.User.update({phone: newPhone}, {
            where: {
                username: username
            }
        })
    } else {
        res.send('Account does not exist! Please enter a correct username...')
    }
}

async function updateUserDOB(res, newDB, username) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if(user === null){
        db.User.update({dob: newDB}, {
            where: {
                username: username
            }
        })
    } else {
        res.send('Account does not exist! Please enter a correct username...')
    }
}
async function updateUserCity(res, newCity, username) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if(user === null){
        db.User.update({city: newCity}, {
            where: {
                username: username
            }
        })
    } else {
        res.send('Account does not exist! Please enter a correct username...')
    }
}
async function updateUserCountry(res, newCountry, username) {
    let user = await db.User.findOne({
        where: {
            username: username,
        }
    })
    if(user === null){
        db.User.update({country: newCountry}, {
            where: {
                username: username
            }
        })
    } else {
        res.send('Account does not exist! Please enter a correct username...')
    }
}

//Delete
async function DeleteUser (res, username) {
    try {
        await db.User.destroy({
            where: {
                username: username
            }
        })
    } catch {
        res.send('Could Not Delete!')
    }
}


module.exports = {
    getAllUsers, authenticateAuth, signUpUserPetOwner, signUpUserPetSitter, findAllPetSitters, findAllPetOwners, updateUserPassword, updateUserEmail, findPetSitterByCity, findPetSitterByCateg, findPetSitterByUsername, findPetSitterByName, DeleteUser, flagUser, updateAcceptedCategs, findPetSitterByCategAndCity, login
}
