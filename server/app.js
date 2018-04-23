// load .env config
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path')
const app = express()
const router = require('./routes/api')
const public = require('./routes/public')
const config = require('./config')(process.env.NODE_ENV)
const auth = require('./middleware/auth.js')
const https = require('https')
const fs = require('fs')

/* CONNECT TO MONGODB */
mongoose.connect(config.database, config.options)
mongoose.Promise = global.Promise

// Debugging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
// handle stack trace for unhandledRejection
process.on('unhandledRejection', r => console.log(r));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept')
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

// ROUTES
// Root - API spec for now
app.get('/', (req, res, next) => {
  res.sendFile(path.resolve('index.html'))
})

// public routes
app.use('/public', public)

// Protect 'https://vcm-2849.vm.duke.edu/api/*' route with JWT Auth middleware
app.use('/api', auth)

// keep all api routes in a seperate file - prefix routes with api/ path
app.use('/api', router)

// create admin user
// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') { seed() }

// Initialize Passport.js
app.use(passport.initialize())

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Handle Errors in development
if (app.get('env') === 'development' || app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    // Parse error by name, then type
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000 || err.message.includes('E11000')) {
        err.code = 5
        err.description = 'duplicate key error'
      } else if (err.name === 'ValidationError') {
        err.code = 4
        err.description = 'validation error'
      } else if (err.name === 'Error') {
        console.log(`error: ${err}`)
        if (err.type === 'user not found') {
          console.log('inside backend parser')
          err.code = 3
          err.description = err.type
        } else if (err.type === 'wrong password') {
          err.code = 2
          err.description = err.type
        } else if (err.status == 401 || err.status == 403) {
          err.code = 1
          err.description = 'unauthorized'
        } else if (err.status == 400) {
          err.code = 6
          err.description = 'violating order constraint'
        } else if (err.type === 'ingredient not found'){
          err.code = 7
          err.description = 'Adding ingredients without vendor to ordercart'
        } else if (err.type === 'customized error') {
          err.code = 8
          err.description = err.errors
          console.log('customized errors is: ', err, ' with errors: ', err.errors);
        } else if (err.message.includes('Not enough stock for ingredient')) {
          err.code = 9
          err.description = 'production error'
        } else {
          err.code = 0
          err.description = 'internal server error'
        }
      }

      res.status(err.status || 422)

      res.json({
        type: err.name,
        message: err.message,
        error: err,
        code: err.code,
        description: err.description
      })
    }
  })
}

// Handle errors in production with less information logged
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    name: err.name,
    message: err.message,
    error: {}
  })
})

if(!module.parent){
  // https encryption
  if (process.env.NODE_ENV === 'production') {
    https.createServer({
      cert: fs.readFileSync('/etc/letsencrypt/live/vcm-4000.vm.duke.edu/fullchain.pem'),
      key: fs.readFileSync('/etc/letsencrypt/live/vcm-4000.vm.duke.edu/privkey.pem')
    }, app).listen(443)
  } else {
    app.listen(config.PORT || 3000)
  }
}

module.exports = app
