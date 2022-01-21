const { tb_feeds, tb_users } = require("../../models")

exports.addFeed = async (req, res) => {
  const { fileName, caption } = req.body
  const { id } = req.user

  try {
  await tb_feeds.create({ fileName, caption, user_id: id});

  const user = await tb_feeds.findOne({
    where: {
      fileName
    },
    include: {
      model: tb_users,
      as: "uploader",
      attributes: {
        exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
      }
    },
    attributes: {
      exclude: ["like", "user_id", "createdAt", "updatedAt"]
    }
  })

    res.send({
      status: "success",
      message: "Add feed finished",
      user
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
}

exports.getFollowedFeed = async (req, res) => {
  const { id } = req.params

  try {
    const feeds = await tb_feeds.findAll({
      where: {
        user_id: id
      },
      include: {
        model: tb_users,
        as: "uploader",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"]
      }
    })

    res.status(200).send({
      status: "success",
      data: {
        feed: feeds
      }
    })
  } catch (error) {
    res.status(400).send({
      message: "Server error"
    })
  }
}

exports.getFeeds = async (req, res) => {

  try {
    const feeds = await tb_feeds.findAll({
      include: {
        model: tb_users,
        as: "uploader",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["user_id", "createdAt", "updatedAt"]
      }
    })

    res.status(200).send({
      status: "success",
      data: {
        feed: feeds
      }
    })

  } catch (error) {
    res.status(500).send({
      message: "Error loading feeds"
    })
  }
}