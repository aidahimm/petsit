const db = require ('../models')

//Create
async function createRequest(res, ownerUsername, sitterUsername, title, nofpets){
    let owner = await db.User.findOne({where: {username: ownerUsername, role: 'petowner'}})
    let sitter = await db.User.findOne({where: {username: sitterUsername, role: 'petsitter'}})
    if(owner !== null && sitter !== null) {
        let petOwner = await db.PetOwner.findOne({where: {user_id: owner.id}})
        if(petOwner.ownedPets >= nofpets) {
            const requ = await db.Request.create({
                title: title,
                nOfPets: nofpets,
                petSitter_id: sitter.id,
                petOwner_id: owner.id
            })
            return requ
        } else {
            res.send("Please make sure the number of pets in this request doesn't exceed the number of owned pets on your profile")
        }
    } else {
        res.send('Pet Sitting Request Failed')
    }
}

//Search
function findAllRequests() {
    const requests = db.Request.findAll();
    return requests;
}

async function findAllPetSitterRequests(res, username) {
    let reqs;
    const user = await db.User.findOne({where: {username: username, role: 'petsitter'}})
    if(user !== null) {
        reqs = await db.Request.findAll({where: {petSitter_id: user.id}})
        console.log(reqs)
        return reqs
    } else {
        res.send('Cannot find user with that username')
    }
}
async function findAllPetOwnerRequests(res, username) {
    let reqs;
    const user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    if(user != null) {
        reqs = await db.Request.findAll({where: {petOwner_id: user.id}})
        console.log(reqs)
        return reqs
    } else {
    res.send('Cannot find user with that username')
}
}

async function acceptRequests(res, title, username) {
    const user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    if(user !== null) {
        await db.Request.update({status: 'accepted'}, {
            where: {
                title: title,
                status: 'pending',
                petOwner_id: user.id
            }
        })
    } else {
        res.send('There is no such Pet Owner... Please enter a correct username')
    }

}

async function rejectRequests(res, title, username) {
    const user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    if(user !== null) {
        await db.Request.update({status: 'rejected'}, {
            where: {
                title: title,
                status: 'pending',
                petOwner_id: user.id
            }
        })
    } else {
        res.send('There is no such Pet Owner... Please enter a correct username')
    }
}

async function findAcceptedRequestOwner(res, username) {
    let reqs;
    const user = await db.User.findOne({where: {username: username}})
    if(user != null) {
        reqs = await db.Request.findAll({where: {petOwner_id: user.id, status: 'accepted'}})
        console.log(reqs)
        return reqs
    }
}
module.exports = {
    findAllPetSitterRequests, createRequest, findAllRequests, findAllPetOwnerRequests, acceptRequests, rejectRequests, findAcceptedRequestOwner
}
