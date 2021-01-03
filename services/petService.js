const db = require ('../models')
const Sequelize = require('sequelize')

async function createPet (res, username, petname, petCateg, isV, sex){
    let user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    if(user !== null ) {
        await db.Pet.create({
            petName: petname,
            petCategory: petCateg,
            isVaccinated: isV,
            sex: sex,
            petOwner_id: user.id
        })
    }else {
        res.send('Username Not Found')
    }
}
async function getAllPetsOfOwner (res, username){
    let user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    if(user !== null) {
        return await db.Pet.findAll({
            where: {
                petOwner_id: user.id
            }
        })
    }else{
        res.send('Username Not Found')
    }
}

async function updatePetVStatus (res, username, isV){
    let user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    if(user!== null) {
        return await db.Pet.update({isVaccinated: isV}, {
            where: {
                petOwner_id: user.id
            }
        })
    }else {
        res.send('Username Not Found')
    }
}

async function deletePet (username, pName){
    let user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    return await db.Pet.destroy({
        where: {
            petOwner_id: user.id,
            petName: pName
        }
    })
}

module.exports = {
    createPet, getAllPetsOfOwner, updatePetVStatus, deletePet
}
