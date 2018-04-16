const express = require('express')
const router = express.Router()
const passport = require('passport')
const permit = require('../middleware/permission')

// Controllers
const userController = require('../controllers/users')
const bottleController = require('../controllers/bottles')

// USER ROUTES
// router.route('/users')
//   .all(permit('admin'))
//   .get(userController.getAll)
//   .post(userController.createUser)

router.get('/users/:id', permit('admin', 'user'), userController.getUser)
router.put('/users/:id', permit('admin', 'user'), userController.updateUser)
router.delete('/users/:id', permit('admin', 'user'), userController.deleteUser)
router.get('/users/page/:page/limit/:limit/q', permit('admin', 'user', 'viewer'), userController.getPaginated)

// BOTTLE ROUTES
router.get('/bottles/:id', permit('admin', 'user'), bottleController.getBottle)
router.get('/bottles', permit('admin', 'user'), bottleController.getAll)
router.post('/bottles', permit('user'), bottleController.createBottle)
router.put('/bottles/:id', permit('admin'), bottleController.updateBottle)
router.delete('/bottles/:id', permit('admin'), bottleController.deleteBottle)
router.get('/bottles/:user_id', permit('admin', 'user'), bottleController.getBottlesByUser)

createBottle,
getAll,
getPaginated,
getBottle,
updateBottle,
deleteBottle,
getBottlesByUser

module.exports = router
