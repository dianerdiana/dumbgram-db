'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_messages.belongsTo(models.tb_users, {
        as: "sender",
        foreignKey: {
          name: "sender_id"
        }
      })

      tb_messages.belongsTo(models.tb_users, {
        as: "receiver",
        foreignKey: {
          name: "receiver_id"
        }
      })
    }
  }
  tb_messages.init({
    message: DataTypes.TEXT,
    sender_id: DataTypes.INTEGER,
    receiver_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_messages',
  });
  return tb_messages;
};