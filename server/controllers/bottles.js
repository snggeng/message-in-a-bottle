// Models
const Bottle = require('../models/bottle')
const User = require('../models/user')

// Utils
const { mapAsync } = require('../utils')

// CREATE
const createBottle = (req, res, next) => {
  if (!req.body.name || !req.body.message) {
    return next(new Error('Bottle name and message are required'))
  } else {
    let newBottle = new Bottle({
      name: req.body.name,
      message: req.body.message,
      createdBy: req.body.createdBy
    })
    User.findByIdAndUpdate({_id: req.body.createdBy},{ $push: { bottles: newBottle._id }}, )
    // save bottle
    newBottle.save((err) => {
      if (err) return next(err)
      res.json(newBottle)
    })
  }
}

// READ
const getAll = (req, res, next) => {
  Bottle.find((err, bottles) => {
    if (err) return next(err)

    res.send(bottles)
  })
}

// PAGINATION
const getPaginated = async (req, res, next) => {
  let query = {}
  // Add options from query params if they exist
  if (req.query) {
    if (req.query.name) { query['name'] = req.query.name }
    if (req.query.message) { query['message'] = req.query.message }
    if (req.query.createdBy) { query['createdBy'] = req.query.createdBy }
  }
  let limit = parseInt(req.params.limit)
  let page = parseInt(req.params.page)

  // Get number of pages
  let count = await Bottle.count().exec()
  let numPages = Math.ceil(count / limit)

  // search for ingredients based on pagination
  Bottle.paginate(query, { page: page, limit: limit }, (err, result) => {
    if (err) return next(err)
    res.json({
      bottles: result.docs,
      page: result.page,
      numPages: numPages
    })
  })
}

// GET ONE
const getBottle = (req, res, next) => {
  Bottle.findById(req.params.id, (err, bottle) => {
    if (err) return next(err)
    res.json(bottle)
  })
}

// UPDATE
const updateBottle = (req, res, next) => {
  Bottle.findById(req.params.id, (err, bottle) => {
    if (err) return next(err)

    if (req.body.name) bottle.name = req.body.name
    if (req.body.message) bottle.message = req.body.message

    bottle.save((err) => {
      if (err) return next(err)
      res.send(bottle)
    })
  })
}

// DELETE
const deleteBottle = (req, res, next) => {
  Bottle.findById({'_id' : req.params.id}, (err, bottle) => {
    if (err) return next(err)

    bottle.remove((err) => {
      if (err) return next(err)
      res.json(bottle)
    })
  })
}

// GET BOTTLES BY USER
const getBottlesByUser = async (req, res, next) => {
  let usersBottles = await req.user.bottles.mapAsync(async(bottleId) =>
      await Bottle.findById({_id: bottleId}, (err, bottle) => {
    if (err) return next(err)
    return bottle
  }))

  res.json(usersBottles)
}

module.exports = {
  createBottle,
  getAll,
  getPaginated,
  getBottle,
  updateBottle,
  deleteBottle,
  getBottlesByUser
}
