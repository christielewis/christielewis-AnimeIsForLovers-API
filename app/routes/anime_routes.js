const express = require('express')
const passport = require('passport')

const Anime = require('../models/anime')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /anime
router.get('/anime', requireToken, (req, res, next) => {
  Anime.find({ owner: req.user.id })
    .then(anime => {
      return anime.map(anime => anime.toObject())
    })
    .then(anime => res.status(200).json({ anime: anime }))
    .catch(next)
})

// SHOW
// GET /anime/:id
router.get('/anime/:id', requireToken, (req, res, next) => {
  Anime.findById(req.params.id)
    .then(handle404)
    .then(anime => res.status(200).json({ anime: anime.toObject() }))
    .catch(next)
})

// CREATE
// POST /anime
router.post('/anime', requireToken, (req, res, next) => {
  req.body.anime.owner = req.user.id

  Anime.create(req.body.anime)
    .then(anime => {
      res.status(201).json({ anime: anime.toObject() })
    })
    .catch(next)
})

// UPDATE
// PATCH /anime/:id
router.patch('/anime/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.anime.owner

  Anime.findById(req.params.id)
    .then(handle404)
    .then(anime => {
      requireOwnership(req, anime)

      return anime.updateOne(req.body.anime)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
// DELETE /anime/:id
router.delete('/anime/:id', requireToken, (req, res, next) => {
  Anime.findById(req.params.id)
    .then(handle404)
    .then(anime => {
      requireOwnership(req, anime)
      anime.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
