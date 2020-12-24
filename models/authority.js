// 'use strict';
module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define("Auth", {
        AuthId:{
            type: DataTypes.INTEGER,
            acceptNull: false,
            primaryKey: true,
        },
        authUsername: {
            type: DataTypes.STRING,
            acceptNull: false
        },
        isAuth: {
            type: DataTypes.BOOLEAN,
            acceptNull: false
        }
    },{
        findAuthByUsername: function (username) {
            return this.findAll({
                where: {
                    authUsername: username
                }
            });
        }
    }
);
    return Auth;
};
