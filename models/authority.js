'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.PetOwner,{
        foreignKey: 'petOwner_id'
      })
    }
  };
  Authority.init({
    authUsername: DataTypes.STRING,
    isAuth: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Authority',
  });
  return Authority;
};
