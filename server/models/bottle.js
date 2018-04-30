const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate')
const { errorMessage, setDateFields } = require('../utils')

const BottleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  message: {
    type: [String],
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  created_at: {
    type: Date
  },
  updated_at: {
    type: Date
  }
})

// Enable pagination using mongoosePaginate
BottleSchema.plugin(mongoosePaginate)

// Check if user is modified/new before saving
// use bcrypt to salt and hash password
BottleSchema.pre('save', function(next) {
  setDateFields(this)
  next()
})

module.exports = mongoose.model('Bottle', BottleSchema)
