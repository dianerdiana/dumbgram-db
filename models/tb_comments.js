'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_comments.belongsTo(models.tb_users, {
        as: "commentor",
        foreignKey: {
          name: "user_id"
        }
      })

      tb_comments.belongsTo(models.tb_feeds, {
        as: "feed_comment",
        foreignKey: {
          name: "feed_id"
        }
      })
    }
  }
  tb_comments.init({
    comment: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    feed_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_comments',
  });
  return tb_comments;
};