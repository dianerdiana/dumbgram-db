'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      tb_followers.belongsTo(models.tb_users, {
        as: "user",
        foreignKey: {
          name: "follower_id"
        }
      })
    }
  }
  tb_followers.init({
    user_id: DataTypes.INTEGER,
    follower_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_followers',
  });
  return tb_followers;
};