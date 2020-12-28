'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      this.hasMany(models.Request,{
        foreignKey: 'petOwner_id'
      })
      this.hasMany(models.Pet,{
        foreignKey: 'petOwner_id'
      })
    }
  };
  PetOwner.init({
    ownedPets: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PetOwner',
  });
  return PetOwner;
};
