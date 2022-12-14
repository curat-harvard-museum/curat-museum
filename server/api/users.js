const router = require('express').Router()
const { models: { User, Object, UserObject }} = require('../db')
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
    const [object, created] = await Object.findOrCreate({
      where: {
        objectid: artwork.objectid,
        primaryimageurl: artwork.primaryimageurl,
        title: artwork.title,
        description: artwork.description,
        artist: artwork.people ? artwork.people[0].name : null
      },
    });
    const user = await User.findByPk(req.params.id, {include: Object})
    await user.addObject(object)
    await user.reload()
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/visited/:userId/:artworkId", async(req, res, next) => {
  try {
    const {userId, artworkId} = req.params
    const userObject = await UserObject.findOne({
      where: {
        userId: userId,
        objectId: artworkId
      }
    })
    if(!userObject.isVisited){
      await userObject.update({isVisited : true})
    } 
    else {
      await userObject.update({isVisited: false})
    }
    const user = await User.findByPk(userId, {include: Object})
    res.send(user)
  } catch(error){
    next(error)
  }
})

router.delete("/:userId/:artworkId", async(req, res, next) => {
  try {
    const {userId, artworkId} = req.params
    const user = await User.findByPk(userId, {include: Object})
    const object = await Object.findOne({
      where: {
        objectid: artworkId
      },
    })
    await object.destroy()
    await user.reload()
    res.send(user)
  } catch(error){
    next (error)
  }
})