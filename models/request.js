module.exports = (sequelize, DataTypes) => {
    const Request = sequelize.define("Request", {
        RequestId:{
            type: DataTypes.INTEGER,
            acceptNull: false,
            primaryKey: true
        },
        PetOwnerId: {
            type: DataTypes.INTEGER,
            acceptNull: false,
            foreignKey: true,
        },
        PetSitterId: {
            type: DataTypes.INTEGER,
            acceptNull: false,
            foreignKey: true,
        },
        title: {
            type: DataTypes.STRING,
            acceptNull: false
        },
        nOfPets: {
            type: DataTypes.INTEGER,
            acceptNull: false
        },
        status: {
            type: DataTypes.STRING,
            acceptNull: false,
            enum: ['accepted', 'rejected', 'pending']
        }
    });
    Request.associate = models => {
        Request.belongsTo(models.PetOwner, {
            foreignKey: 'PetOwnerId'
        });
    };
    Request.associate= models => {
        Request.belongsTo(models.PetSitter, {
            foreignKey: 'PetSitterId'
        });
    };
    Request.associate= models => {
        Request.hasMany(models.Pet, {

        });
    };
    function updateTitle(newTitle) {
        Request.update({title: newTitle}, {
            // where: {
            //     User: {username: givenUsername}
            // }
        })
    }
    function updateSitterRating(newNOP) {
        Request.update({nOfPets: newNOP}, {
            // where: {
            //     User: {username: givenUsername}
            // }
        })
    }
    return Request;
};
