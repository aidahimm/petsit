const db = require ('../models')
const Sequelize = require('sequelize')

async function createPet (username, petname, petCateg, isV, sex){
    user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    await db.Pet.create({
        petName: petname,
        petCategory: petCateg,
        isVaccinated: isV,
        sex: sex,
        petOwner_id: user.id
    })
}
async function getAllPetsOfOwner (username){
    user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    return await db.Pet.findAll({
        where: {
            petOwner_id: user.id
        }
    })
}

async function updatePetVStatus (username, isV){
    user = await db.User.findOne({where: {username: username, role: 'petowner'}})
    return await db.Pet.update({isVaccinated: isV},{
        where: {
            petOwner_id: user.id
        }
    })
}

async function deletePet (username, pName){
    user = await db.User.findOne({where: {username: username, role: 'petowner'}})
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
