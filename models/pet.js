'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
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
  Pet.init({
    petName: DataTypes.STRING,
    petCategory: DataTypes.ENUM({values: ['dog', 'cat', 'turtle', 'bird', 'reptile']}),
    isVaccinated: DataTypes.BOOLEAN,
    sex: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};
