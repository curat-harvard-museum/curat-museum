const router = require('express').Router()
const { models: { User, Object, UserObject }} = require('../db')
module.exports = router

//get all objects by user id , use object id to call api?
//use req.params.id on front end to make api call
router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const objects = await UserObject.findAll({
      where: {
        [{userId: user.id}]
      },
      include: [
        {model: User}
      ]
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