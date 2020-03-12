
const express = require('express')
require("dotenv").config()
const app = express()
const port = 3000
const mongoose = require('mongoose')
// TODO
app.listen(port, () => console.log(`Server listening on  localhost:${port}!`))