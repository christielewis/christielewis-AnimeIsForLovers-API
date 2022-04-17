const mongoose = require('mongoose')

const animeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  season: {
    type: Number,
    required: true
  },
  episode: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
  // comment: [commentSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('Anime', animeSchema)
