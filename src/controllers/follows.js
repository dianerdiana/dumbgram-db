const { tb_users, tb_followers, tb_follows } = require('../../models');

exports.getFollowers = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await tb_followers.findAll({
      where: {
        user_id: id,
      },
      include: {
        model: tb_users,
        as: "user",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"]
      }
    });

    res.send({
      status: "success",
      data: {
        Followers: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await tb_follows.findAll({
      where: {
        user_id: id,
      },
      include: {
        model: tb_users,
        as: "user",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"]
      }
    });

    res.send({
      status: "success",
      data: {
        Following: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};