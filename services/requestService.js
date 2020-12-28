const db = require ('../models')

//Create
async function createRequest(ownerUsername, sitterUsername){
    let owner = await db.User.findOne({where: {username: ownerUsername}})
    let sitter = await db.User.findOne({where: {username: sitterUsername}})
    const requ = await db.Request.create({
        title: "My Request",
        nOfPets: 2,
        petSitter_id: sitter.id,
        petOwner_id: owner.id
    })
    return requ
}

//Search
function findAllRequests() {
    const requests = db.Request.findAll();
    return requests;
}

async function findAllPetSitterRequests(username) {
    let reqs;
    const user = await db.User.findOne({where: {username: username, role: 'petsitter'}})
    if(user != null) {
        reqs = await db.Request.findAll({where: {petSitter_id: user.id}})
        console.log(reqs)
        return reqs
    }
}
async function findAllPetOwnerRequests(username) {
    let reqs;
    const user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    if(user != null) {
        reqs = await db.Request.findAll({where: {petOwner_id: user.id}})
        console.log(reqs)
        return reqs
    }
}

async function acceptRequests(title) {
    const reqs = await db.Request.update({status: 'accepted'}, {where: {title: title, status: 'pending'}})
    return reqs
}

async function rejectRequests(title) {
    const reqs = await db.Request.update({status: 'rejected'}, {where: {title: title, status: 'pending'}})
    return reqs
}

async function findAcceptedRequest(username) {
    let reqs;
    const user = await db.User.findOne({where: {username: username}})
    if(user != null) {
        reqs = await db.Request.findAll({where: {petOwner_id: user.id, status: 'accepted'}})
        console.log(reqs)
        return reqs
    }
}
module.exports = {
    findAllPetSitterRequests, createRequest, findAllRequests, findAllPetOwnerRequests, acceptRequests, rejectRequests, findAcceptedRequest
}
