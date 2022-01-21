'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tb_users.hasOne(models.tb_followers, {
        as: "user",
        foreignKey: {
          name: "user_id"
        }
      })

      tb_users.hasOne(models.tb_follows, {
        foreignKey: {
          name: "user_id"
        }
      })

      tb_users.hasMany(models.tb_followers, {
        as: "owner",
        foreignKey: {
          name: "follower_id"
        }
      })

      tb_users.hasMany(models.tb_follows, {
        as: "following",
        foreignKey: {
          name: "following_id"
        }
      })

      tb_users.hasMany(models.tb_feeds, {
        as: "feed",
        foreignKey: {
          name: "user_id"
        }
      })

      tb_users.hasMany(models.tb_comments, {
        as: "comments",
        foreignKey: {
          name: "user_id"
        }
      })

      tb_users.hasMany(models.tb_messages, {
        as: "sentMessages",
        foreignKey: {
          name: "sender_id"
        }
      })

      tb_users.hasMany(models.tb_messages, {
        as: "receivedMessages",
        foreignKey: {
          name: "receiver_id"
        }
      })
    }
  }
  tb_users.init({
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    image: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_users',
  });
  return tb_users;
};