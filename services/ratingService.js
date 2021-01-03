const db = require ('../models')
const Sequelize = require('sequelize')

async function calculateRating(newRating, user){
    let sitter = await db.PetSitter.findOne({where: {
        user_id: user.id
        }})
    if(sitter!== null){
        let rating = await db.Rating.findOne({where:{
                petSitter_id: sitter.id
            }})
        if(!(rating.ratings === [])){
            return result = (((rating.ratings.length * rating.average) + parseInt(newRating)) / (rating.ratings.length + 1)).toFixed(2)
        }else{
            return newRating
        }
    }
}

async function createRating (id, newRating, average){
    console.log(newRating)
    await db.Rating.create({ ratings: newRating, petSitter_id: id , average})
}

async function updateRating(res, username, rating) {
    user = await db.User.findOne({where: {
        username : username
        }})
    if (user !== null) {
        let sitter = await db.PetSitter.findOne({where: {
                user_id: user.id
            }})
        let resultRating = await calculateRating(rating, user)
        await db.Rating.update({
            ratings: Sequelize.fn('array_append', Sequelize.col('ratings'), rating),
            average: resultRating
        }, {
            where: {
                [Sequelize.Op.not]: {ratings: null},
                petSitter_id: sitter.id
            }
        })
    }else {
        res.send('Username Not found')
    }
}

module.exports = {
    createRating, updateRating
}
