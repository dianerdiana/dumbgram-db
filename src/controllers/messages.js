const { tb_messages, tb_users } = require('../../models/')
const { Op } = require('sequelize')

exports.addMessage = async (req, res) => {
  const receiver_id = req.params.id
  const { message } = req.body
  const { id } = req.user

  try {
  const newMessage = await tb_messages.create({message, sender_id: id, receiver_id})
  const dataMessage = await tb_messages.findOne({
    where: {
      id: newMessage.id
    },
    include: {
      model: tb_users,
      as: "receiver",
      attributes: {
        exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
      }
    },
    attributes: {
      exclude: ["sender_id", "receiver_id", "createdAt", "updatedAt"]
    }
  })

  res.status(200).send({
    status: "Success",
    data: {
      message: dataMessage
    }
  })

  } catch (error) {
    res.status(500).send({
      status: "Failed"
    })
  }
}

exports.getMessageUser = async (req, res) => {
  const me = req.user.id
  const you = req.params.id

  try {
    const messages = await tb_messages.findAll({
      where: {
        [Op.or]: [
          {
            [Op.and] : [{receiver_id: you}, {sender_id: me}]
          },
          {
            [Op.and] : [{receiver_id: me}, {sender_id: you}]
          }
        ]

        //second way
        // [Op.or] : [
        //   {receiver_id: you, sender_id: me},
        //   {receiver_id: me, sender_id: you}
        // ]

      },
      include: {
        model: tb_users,
        as: "sender",
        attributes: {
          exclude: ["email", "password", "bio", "createdAt", "updatedAt"]
        }
      },
      attributes: {
        exclude: ["sender_id", "receiver_id", "createdAt", "updatedAt"]
      }
    })

    res.send({
      status: "Success",
      data: {
        messages: messages
      }
    })
    
  } catch (error) {
    res.status(500).send({
      status: "failed"
    })
  }
}