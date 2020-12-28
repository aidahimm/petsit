const db = require ('../models')
const Sequelize = require('sequelize')

async function calculateRating(newRating, user){
    let rating = await db.Rating.findOne({where:{
        petSitter_id: user.id
        }})
    if(!(rating.ratings === [])){
        return result = ((rating.ratings.length * rating.average) + parseInt(newRating)) / (rating.ratings.length + 1)
    }else{
        return newRating
    }
}

async function createRating (id, newRating, average){
    console.log(newRating)
    await db.Rating.create({ ratings: newRating, petSitter_id: id , average})
}

async function updateRating(username, rating) {
    user = await db.User.findOne({where: {
        username : username
        }})
    let resultRating = await calculateRating(rating, user)
    console.log(resultRating)
    return await db.Rating.update({ratings: Sequelize.fn('array_append', Sequelize.col('ratings'), rating), average: resultRating}, {
        where: {
            [Sequelize.Op.not]: {ratings: null}
        }
    })
}

module.exports = {
    createRating, updateRating
}
