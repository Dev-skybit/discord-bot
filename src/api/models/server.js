const express = require('express')
const cors = require('cors')
const https = require('https')
const fs = require('fs')
const path = require('path')
const session = require('express-session')
const passport = require('passport')

require('../strategies/discord-strategy')
require('../strategies/bungie-strategy')

const dbConnection = require('../db/dbConnection');

class Server {

  constructor() {
    this.app = express()
    this.port = process.env.PORT

    this.views()

    this.middlewares()

    this.authRouter = '/api/auth'
    this.indexRouter = '/'
    this.routes()

    this.dbConnection()
  }

  views() {
    this.app.set('view engine', 'ejs')
    this.app.set('views', path.join(__dirname, '../../views'))
  }

  async dbConnection() {
    await dbConnection()
  }

  listen() {
    https.createServer({
      cert: fs.readFileSync(path.join(__dirname, '../certificates/server.crt'), 'utf8'),
      key: fs.readFileSync(path.join(__dirname, '../certificates/key.pem'), 'utf8')
    }, this.app).listen(this.port, () => {
      console.log(`Listening on port ${this.port}`)
    })
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(express.urlencoded({extended: true}))

    this.app.use(session({
      secret: 'keyboard cat hunstman',
      saveUninitialized: false,
      resave: false
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
  }

  routes() {
    this.app.use(this.authRouter, require('../routes/auth'))
    this.app.use(this.indexRouter, require('../routes/index'))
  }
}

module.exports = Server