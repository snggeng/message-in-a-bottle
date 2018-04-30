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
router.get('/users/page/:page/limit/:limit/q', permit('admin', 'user'), userController.getPaginated)

// BOTTLE ROUTES
router.post('/bottles', permit('admin', 'user'), bottleController.createBottle)
router.delete('/bottles/:id', permit('admin'), bottleController.deleteBottle)
router.get('/bottles/user/:user_id', permit('admin', 'user'), bottleController.getBottlesByUser)

module.exports = router
