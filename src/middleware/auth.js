const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')

    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
      return res.status(401).send({
        message: "Access denied"
      })
    }

    const SECRET_KEY = "MyDumbgramDatabaseB29"

    const verified = jwt.verify(token, SECRET_KEY)

    req.user = verified;
    
    next()
  } catch (error) {
    res.status(400).send({
      message: "invalid token"
    })
  }
}