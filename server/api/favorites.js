const router = require('express').Router()
const { models: { User, Object }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const objects = await Object.findAll({
    })
    res.json(objects)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
    try{
        const object = await Object.findByPk(req.params.id)
        res.send(object)
    } catch (error){
        next(error)
    }
})