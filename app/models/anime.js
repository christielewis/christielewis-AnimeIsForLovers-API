const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // comment: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Anime', animeSchema)
