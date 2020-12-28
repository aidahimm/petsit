'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
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
    }
  };
  Rating.init({
    ratings: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    average: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};
