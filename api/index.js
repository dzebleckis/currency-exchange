const express = require('express')
const router = require('./src/router')
const service = require('./src/service')
const cache = require('./src/cache')
const exchange = require('./src/exchange')
const config = require('./src/config')

const app = express()
const port = 3000 //TODO env variable
const ttl = 10 * 1000 //10 seconds

app.use('/api', router(service(exchange(config.fixer_api), cache(ttl))))

app.listen(port, (e, b) => console.log(`App started http://127.0.0.1:${port}`))

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Something broke!')
})
