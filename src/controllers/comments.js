const { tb_feeds, tb_users, tb_comments } = require("../../models")

exports.getComments = async (req, res) => {
  const { id } = req.params

  try {
    const comments = await tb_comments.findAll({
      where: {
        feed_id: id
      },
      include: {
        model: tb_users,
        as: "commentor",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["feed_id", "user_id", "createdAt", "updatedAt"]
      }
    });

    res.status(200).send({
      message: "success",
      data: {
        comments
      }
    })

  } catch (error) {
    res.status(500).send({
      message: "Access denied"
    })
  }
}

exports.addComment = async (req, res) => {
  const { id } = req.user
  const { feed_id, comment } = req.body

  try {
    const newComment = await tb_comments.create({feed_id, comment, user_id: id})
    const dataComment = await tb_comments.findOne({
      where: {
        id: newComment.id
      },
      attributes: {
        exclude: ["feed_id", "comment", "user_id", "updatedAt", "createdAt"]
      }
    })

    res.status(200).send({
      status: "Success",
      data: {
        comment: dataComment
        }
    })

  } catch (error) {
    res.send(500).send({
      message: "Server error"
    })
  }
}