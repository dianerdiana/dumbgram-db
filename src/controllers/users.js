const { tb_users } = require("../../models");

exports.getUsers = async (req, res) => {
  try {
    const users = await tb_users.findAll({
     attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: {
        users,
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

exports.editUser = async (req, res) => {
  try {

    const user = await tb_users.update(req.body, {
      where: {
        id: [req.params.id, req.user.id]
      },
    });

    res.send({
      status: "success",
      message: `Edit finished`,
      data: {
        User: user
      }
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await tb_users.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete user id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};