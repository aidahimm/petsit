'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.PetOwner,{
        foreignKey: 'user_id',
        onDelete: "cascade"
      })
      this.hasOne(models.PetSitter,{
        foreignKey: 'user_id',
        onDelete: "cascade"
      })
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['petsitter', 'petowner', 'admin']},
    flag: {
      type:DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
