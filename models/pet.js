module.exports = (sequelize, DataTypes) => {
    const Pet = sequelize.define("Pet", {
        PetId: {
            type: DataTypes.UUID,
            acceptNull: false,
            primaryKey: true
        },
        petName: {
            type: DataTypes.STRING,
            acceptNull: false
        },
        category: {
            type: DataTypes.STRING,
            acceptNull: false,
            enum: ['dog', 'cat', 'bird', 'turtle', 'reptile']
        },
        isVaccinated: {
            type: DataTypes.BOOLEAN,
            acceptNull: false
        },
        dateOfBirth: {
            type: DataTypes.STRING,
            acceptNull: false
        },
        sex: {
            type: DataTypes.STRING,
            acceptNull: false
        },
        breed: {
            type: DataTypes.STRING,
            acceptNull: false
        }
    });
    Pet.associate = models => {
        Pet.belongsTo(models.PetOwner, {
            foreignKey: 'PetOwnerId',
        });
    };
    Pet.associate = models => {
        Pet.belongsTo(models.Request, {
            foreignKey: 'RequestId',
        });
    };
    function updatePetName(newPname, pcategory, givenUsername) {
        Pet.update({petName: newPname}, {
            where: {
                category : pcategory,
                User: {username: givenUsername}
            },
                include: [Model.User]
        })
    }
    function updatePetCateg(pname, newPcategory, givenUsername) {
        Pet.update({category: newPcategory}, {
            where: {
                petName : pname,
                User: {username: givenUsername}
            }
        })
    }
    function updatePetDOB(pname, newPDB, givenUsername) {
        Pet.update({dateOfBirth: newPDB}, {
            where: {
                petName : pname,
                User: {username: givenUsername}
            }
        })
    }
    function updatePetSex(pname, newPSex, givenUsername) {
        Pet.update({sex: newPSex}, {
            where: {
                petName : pname,
                User: {username: givenUsername}
            }
        })
    }
    function updatePetBreed(pname, newPBreed, givenUsername) {
        Pet.update({breed: newPBreed}, {
            where: {
                petName : pname,
                User: {username: givenUsername}
            }
        })
    }
    function updatePetVStatus(pname, newVStat, givenUsername) {
        Pet.update({isVaccinated: newVStat}, {
            where: {
                petName : pname,
                User: {username: givenUsername}
            }
        })
    }

    return Pet;
};
