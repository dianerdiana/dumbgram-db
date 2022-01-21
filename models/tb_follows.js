'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      tb_follows.belongsTo(models.tb_users, {
        as: "user",
        foreignKey: {
          name: "following_id"
        }
      })
    }
  }
  tb_follows.init({
    user_id: DataTypes.INTEGER,
    following_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_follows',
  });
  return tb_follows;
};