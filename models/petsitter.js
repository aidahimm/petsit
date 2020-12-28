'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetSitter extends Model {
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
        foreignKey: 'petSitter_id'
      })
    }
  };
  PetSitter.init({
    description: DataTypes.STRING,
    categs: DataTypes.ARRAY(DataTypes.ENUM({ values: ['dog', 'cat', 'turtle', 'bird', 'reptile']})),
  }, {
    sequelize,
    modelName: 'PetSitter',
  });
  return PetSitter;
};
