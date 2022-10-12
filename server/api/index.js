const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/objects', require('./objects'))
router.use('/favorites', require('./userObjects'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
