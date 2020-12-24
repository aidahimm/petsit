module.exports = (sequelize, DataTypes) => {
    const PetOwner = sequelize.define("PetOwner", {
        PetOwnerId: {
            type: DataTypes.INTEGER,
            acceptNull: false,
            primaryKey: true
        },
        UserId: {
            type: DataTypes.INTEGER,
            required: false,
            foreignKey: true,
        },
        RequestId: {
            type: DataTypes.INTEGER,
            required: false,
            foreignKey: true
        },
        PetId:{
            type: DataTypes.INTEGER,
            required: false,
            foreignKey: true
        }
        });
    PetOwner.associate = models => {
        PetOwner.hasMany(models.Pet, {
            foreignKey: 'PetOwnerId',
            onDelete: "cascade"
        });
    };
    PetOwner.associate = models => {
        PetOwner.hasMany(models.Request, {
            foreignKey: 'PetOwnerId',
            onDelete: "cascade"
        });
    };
    PetOwner.associate = models => {
        PetOwner.hasOne(models.User,{
            foreignKey: "PetOwnerId"
        });
    };
    return PetOwner;
};
