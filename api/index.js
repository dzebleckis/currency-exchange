const express = require('express')
const router = require('./router')
const service = require('./service')
const cache = require('./cache')
const exchange = require('./exchange')
const config = require('./config')

const app = express()
const port = 3000 //TODO env variable
const ttl = 10 * 1000 //10 seconds

app.use('/api', router(service(exchange(config.fixer_api), cache(ttl))))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send('Something broke!')
})
