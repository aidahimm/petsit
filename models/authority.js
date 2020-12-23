module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Auth", {
        AuthId: {
            type: DataTypes.UUID,
            acceptNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            acceptNull: false
        },
        isAuth: {
            type: DataTypes.BOOLEAN,
            acceptNull: false
        }
    });
};
