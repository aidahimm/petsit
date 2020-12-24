const extendSequelize = require('sequelize-extension');
const {Op} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        UserId:{
            type: DataTypes.INTEGER,
            acceptNull: false,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING,
            required: true,
            enum: ['petowner', 'petsitter']
        },
        username: {
            type: DataTypes.STRING,
            required: true
        },
        password: {
            type: DataTypes.STRING,
            required: true
        },
        email: {
            type: DataTypes.STRING,
            required: true
        },
        firstname: {
            type: DataTypes.STRING,
            required: true
        },
        lastname: {
            type: DataTypes.STRING,
            required: true
        },
        country: {
            type: DataTypes.STRING,
            required: true
        },
        city: {
            type: DataTypes.STRING,
            required: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            required: true
        },
        dob: {
            type: DataTypes.STRING,
            required: true
        }
    }, {
        classMethods: {
            findAllUsers: async function(){
                console.log("I'M INSIDE")
                const users = await this.findAll().catch(  (err) => {
                    console.log(err);
                });
                return users;
            }
        }
    });
            // const u = User.build({UserId: 1});
            // u.save().then(() => {
            //     console.log('      NEW      USER        SAVED     ');
            // });
            //     .finally(() => {
            //     sequelize.close();
            // });
    // User.associate = models =>{
    //     User.belongsTo(models.PetOwner, {
    //         foreignKey: 'UserId',
    //         onDelete: "cascade",
    //     });
    // };
    // User.associate = models =>{
    //     User.belongsTo(models.PetSitter, {
    //         foreignKey: 'UserId',
    //         onDelete: "cascade",
    //     });
    // };
    // function findAllUsers() {
    //     const users = User.findAll({
    //         include: [{model: PetOwner, as: 'PetOwnerUser'}]
    //     });
    //     return users;
    // }
    // function findAllPetSitterUsers() {
    //     const users = User.findAll({
    //         include: [{model: PetSitter, as: 'PetSitterUser'}]
    //     });
    //     return users;
    // }
    // function findUsersByCity(city) {
    //     const users = User.findAll({
    //         where: {
    //             city: city
    //         }
    //     })
    //     return users;
    // }
    // function findUsersByCountry(country) {
    //     const users = User.findAll({
    //         where: {
    //             country: country
    //         }
    //     })
    //     return users;
    // }
    // function findUsersByCountryandCity(country, city) {
    //     const users = User.findAll({
    //         where: {
    //             country: country,
    //             city: city
    //         }
    //     })
    //     return users;
    // }
    // function findUsersByUsername(username) {
    //     const users = User.findAll({
    //         where: {
    //             username: username
    //         }
    //     })
    //     return users;
    // }
    // function findUsersByName(name) {
    //     const users = User.findAll({
    //         where: {
    //             [Op.or]: [{firstname: name}, {lastname: name}]
    //
    //         }
    //     })
    //     return users;
    // }
    // function updateUserFirst(newFirst, username) {
    //     User.update({firstname: newFirst}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    // function updateUserLast(newLast, username) {
    //     User.update({lastname: newLast}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    // function updateUserPhone(newPhone, username) {
    //     User.update({phone: newPhone}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    // function updateUserEmail(newEmail, username) {
    //     User.update({email: newEmail}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    // function updateUserPassword(newPassword, username) {
    //     User.update({password: newPassword}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    // function updateUserDOB(newDB, username) {
    //     User.update({dob: newDB}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    // function updateUserCity(newCity, username) {
    //     User.update({city: newCity}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    // function updateUserCountry(newCountry, username) {
    //     User.update({country: newCountry}, {
    //         where: {
    //             username: username
    //         }
    //     })
    // }
    return User;
};
