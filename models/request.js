'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.PetSitter,{
        foreignKey: 'petSitter_id'
      })
      this.belongsTo(models.PetOwner,{
        foreignKey: 'petOwner_id'
      })
    }
  };
  Request.init({
    title: DataTypes.STRING,
    nOfPets: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'accepted', 'rejected'],
      defaultValue: 'pending'
    },
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};
