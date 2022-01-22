const express = require('express')
const app = express()
require('dotenv').config()

const PORT = 5000;

app.use(express.json())

// Get routes to the variabel
const router = require("./src/routes")

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.use("/api/v1/", router);

app.use("/uploads", express.static("uploads"))

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))