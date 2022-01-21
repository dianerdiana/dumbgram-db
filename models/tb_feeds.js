'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_feeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_feeds.belongsTo(models.tb_users, {
        as: "uploader",
        foreignKey: {
          name: "user_id"
        }
      })

      tb_feeds.hasMany(models.tb_comments, {
        as: "comments",
        foreignKey: {
          name: "feed_id"
        }
      })
    }
  }
  tb_feeds.init({
    fileName: DataTypes.STRING,
    caption: DataTypes.STRING,
    like: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tb_feeds',
  });
  return tb_feeds;
};