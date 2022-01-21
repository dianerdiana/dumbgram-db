// import model
const { tb_users } = require("../../models");

// import joi validation
const Joi = require("joi");
// import bcrypt
const bcrypt = require("bcrypt");
//import jsonwebtoken
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    fullName: Joi.string().min(5).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
  return res.status(400).send({
    error: {
      message: error.details[0].message,
    },
  });

  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await tb_users.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
      fullName: req.body.fullName
    });

    const token = jwt.sign({id: tb_users.id}, process.env.TOKEN_KEY)

    res.status(200).send({
      status: 'success',
      data: {
        user: {
          fullName: newUser.fullName,
          username: newUser.username,
          token
        }
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
}

exports.login = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
  email: Joi.string().email().min(6).required(),
  password: Joi.string().min(6).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);

  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await tb_users.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    if (!userExist) {
      return res.send({
        status: 'failed',
        message: 'Email & password not match',
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (isValid == false) {
      return res.send({
        status: 'failed',
        message: 'Email & password not match',
      });
    }

    const tokenData = {
      id: userExist.id,
      name: userExist.fullName,
      email: userExist.email,
    }

    const SECRET_KEY = "MyDumbgramDatabaseB29"

    const token = jwt.sign(tokenData, SECRET_KEY)

    res.status(200).send({
      status: 'success',
      data: {
        user: {
          fullName: userExist.fullName,
          username: userExist.username,
          email: userExist.email,
          token
        }
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
}