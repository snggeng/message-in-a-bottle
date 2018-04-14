const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')
const bcrypt = require('bcryptjs')
const { errorMessage, setDateFields } = require('../utils')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'manager', 'user'],
    required: true
  },
  netId: {
    type: Boolean,
    default: false,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
})

// Enable pagination using mongoosePaginate
UserSchema.plugin(mongoosePaginate)

// Check if user is modified/new before saving
// use bcrypt to salt and hash password
UserSchema.pre('save', function(next) {
  let user = this // need to access this from outside so can't use fat arrow
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        setDateFields(this)
        next()
      })
    })
  } else {
    setDateFields(this)
    return next()
  }
})

// UserSchema.post('save', function(doc) {
//   let user = this
//
//   OrderCart.find({ user_id: user._id }, (err, order_carts) => {
//
//     if(order_carts.length === 0) {
//       OrderCart.create({ user_id: user._id, ingredients: [] }, (err, order_cart) => {
//         if (err) return errorMessage('create order_cart', err)
//         order_cart.save((err, order_cart) => {
//           // console.log('OrderCart successfully created.')
//         })
//       })
//     }
//   })
// })

// UserSchema.post('save', handleE11000)

// Verify user based on salt/hash result
UserSchema.methods.comparePassword = async function(passw) {
  return await bcrypt.compareSync(passw, this.password)
}

module.exports = mongoose.model('User', UserSchema)
