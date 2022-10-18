const router = require('express').Router()
const { models: { User, Object }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async(req, res, next) => {
  try {
      const user = await User.findByPk(req.params.id, {include: Object});
      res.json(user)
  } catch (err){
      next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const artwork = req.body;
    // console.log("user id", user.id)
    // console.log("artwork", artwork)
    const [object, created] = await Object.findOrCreate({
      where: {
        objectid: artwork.objectid,
        primaryimageurl: artwork.primaryimageurl,
        title: artwork.title,
        description: artwork.description,
        artist: artwork.people ? artwork.people[0].name : null,
      },
    });
    const user = await User.findByPk(req.params.id, {include: Object})
    await user.addObject(object)
    await user.reload()
    // console.log("user updated", user)
    res.json(user);
  } catch (error) {
    next(error);
  }
});