const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const modules = require('./modules')
const port = process.env.APP_PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/v1', modules)

app.listen(port, async () => {
  
  await mongoose.connect(`${process.env.APP_MONGODB_URI}`, {
    useNewUrlParser: true,
  });
  console.log(`Example app listening on port ${port}`)
})
