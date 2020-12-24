module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("Rating", {
        RatingId:{
            type: DataTypes.INTEGER,
            acceptNull: false,
            primaryKey: true
        },
        rating: {
            type: DataTypes.INTEGER,
            acceptNull: true
        },
    });
    Rating.associate= models => {
        Rating.belongsTo(models.PetSitter, {
            foreignKey: 'PetSitterId',
        });
    }
    function updateRating(newRating) {
        Rating.update({rating: newRating}, {
            // where: {
            //     User: {username: givenUsername}
            // }
        })
    }

    return Rating;
};
