module.exports = (sequelize, DataTypes) => {
    const PetSitter = sequelize.define("PetSitter", {
        PetSitterId:{
            type: DataTypes.INTEGER,
            acceptNull: false,
            primaryKey: true
        },
        RequestId: {
            type: DataTypes.INTEGER,
            required: false,
            foreignKey: true,
        },
        RatingId:{
            type: DataTypes.INTEGER,
            acceptNull: false,
        },
        acceptedCategory1: {
            type: DataTypes.STRING,
            acceptNull: false,
        },
        acceptedCategory2: {
            type: DataTypes.STRING,
            acceptNull: true
        },
        acceptedCategory3: {
            type: DataTypes.STRING,
            acceptNull: true
        },
        acceptedCategory4: {
            type: DataTypes.STRING,
            acceptNull: true
        },
        acceptedCategory5: {
            type: DataTypes.STRING,
            acceptNull: true
        },
        description: {
            type: DataTypes.STRING,
            acceptNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            acceptNull: true
        }
    });
    PetSitter.associate = models => {
        PetSitter.hasMany(models.Request, {
            foreignKey: 'PetSitterId',
            onDelete: "cascade"
        });
    };
    PetSitter.associate = models => {
        PetSitter.hasOne(models.User,{
            foreignKey: "PetSitterId"
        });
    };
    function updateSitterDesc(newDesc, givenUsername) {
        PetSitter.update({description: newDesc}, {
            where: {
                User: {username: givenUsername}
            }
        })
    }
    function updateSitterRating(newRating, givenUsername) {
        PetSitter.update({rating: newRating}, {
            where: {
                User: {username: givenUsername}
            }
        })
    }

    return PetSitter;
};
