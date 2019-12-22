const express = require('express')
const router = require('./src/router')
const service = require('./src/service')
const cache = require('./src/cache')
const exchange = require('./src/exchange')
const config = require('./src/config')
const cors = require('cors')

const app = express()

app.use(cors())

app.use('/api', router(service(exchange(config.fixer_api), cache(config.ttl))))

app.listen(config.port, (e, b) => console.log(`App started http://${config.host}:${config.port}`))

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Something went wrong, please try again later')
})
