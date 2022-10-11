"use strict";
const axios = require ("axios")
// const HARVARD_TOKEN = require ("../.env")
const { randEmail, randUserName } = require ('@ngneat/falso')
const {
  db,
  models: { User, Object, Comment, userObject },
} = require("../server/db");
if(process.env.NODE_ENV !== 'production') require('../.env')

async function fetchObjects(){
  // console.log("PROCESS.ENV.HARVARD_TOKEN", PROCESS.ENV.HARVARD_TOKEN)
  const {data} = await axios.get(`https://api.harvardartmuseums.org/object?q=peoplecount:1&person?&apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100`);
  return data;
}

async function mapObjects(){
  const objectArr = await fetchObjects();
  for(let i = 0; i < objectArr.records.length; i++){
    // console.log(objectArr.records[i].people[0])
    await Promise.all([
      // if(objectArr.records[i].primaryimageurl !== null && objectArr.records[i].title !== null && objectArr.records[i].description !== null && objectArr.records[i].people.name !== null){
        Object.create({
        objectid: objectArr.records[i].id,
        primaryimageurl: objectArr.records[i].primaryimageurl,
        title: objectArr.records[i].title,
        description: objectArr.records[i].description,
        artist: objectArr.records[i].people[0].name,
      })
    ])
  }}
// }
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

console.log("Object magic methods", Object.prototype)

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");


  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "jordy",
      email: "jordy@email.com",
      password: "123",
    }),
    User.create({
      username: "joyce",
      email: "joyce@email.com",
      password: "123",
    }),
    User.create({
      username: "jasmine",
      email: "jasmine@email.com",
      password: "123",
    }),
  ]);

  for(let i = 0; i < 20; i++){
    await User.create({username: randUserName(), email: randEmail(), password: "123"})
  }

  const users2 = [{
    username: "chihiro",
    email: "Sen.Ogino@gmail.com",
    password: "123"
  },
{
  username: "sophie",
  email: "SHatter@hatshop.net",
  password: "123"
},
{
  username: "shizuku",
  email: "tsukushima_shizuku@daiichu.edu",
  password: "123"
},
{
  username: 'arrietty',
  email: 'borrower@tiktock.com',
  password: "123"
}]

const [user1, user2, user3, user4] = await Promise.all(users2.map(user => {
  return User.create(user)
}))

  await mapObjects();

  const objects2 = [{
    objectid: 12345,
    title: 'Orange boxes',
    primaryimageurl: 'https://secure.img1-cg.wfcdn.com/im/77833012/resize-h445%5Ecompr-r85/2951/29518777/Framed+Painting+Print+on+Canvas+in+Orange.jpg',
    description: 'Fusce accumsan augue eu lacus posuere fermentum. Vestibulum rutrum diam at diam feugiat, eu bibendum mauris sagittis. Morbi vitae suscipit sapien. Donec massa est, tempor quis orci et, aliquet malesuada risus. Vestibulum maximus vestibulum ante ut vehicula. Vestibulum cursus faucibus erat, eget posuere eros pretium ut. Nulla vestibulum purus at suscipit condimentum. Nam ex tellus, ultricies ut massa tincidunt, convallis sollicitudin dolor. Maecenas laoreet quis dolor nec iaculis. Etiam sit amet felis ut nunc imperdiet bibendum vel vestibulum nulla. Curabitur commodo pellentesque dictum. Curabitur gravida tortor metus, in aliquam nisi posuere nec. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ante neque, aliquet vel vestibulum non, mollis at lectus. Maecenas luctus consequat diam, at accumsan lorem. Duis ut mi sit amet turpis sollicitudin condimentum.',
    artist: 'Van Gogh'
  },
  {
    objectid: 12346,
    title: 'Minimalist painting',
    primaryimageurl: 'https://static.greatbigcanvas.com/images/singlecanvas_thick_none/world-art-group/mod-pods-i,2599314.jpg',
    description: 'Praesent luctus urna vitae lorem egestas, et tempor nisi consectetur. Suspendisse rutrum id neque ac rhoncus. Aenean finibus non nisl eget interdum. Vestibulum id magna massa. Suspendisse pretium mi eros. Nam suscipit odio vel tortor tincidunt, id fringilla velit sollicitudin. Etiam varius erat vel sem tempor luctus. Mauris sed arcu lorem. Duis faucibus lacus sit amet mi venenatis, sit amet egestas sapien vehicula. Nulla vitae tellus quis purus condimentum aliquam.',
    artist: 'Picasso'},
  {
    objectid: 12347,
    title: 'Country painting',
    primaryimageurl: 'https://secure.img1-cg.wfcdn.com/im/95367950/resize-h445%5Ecompr-r85/1537/153771844/Cumulus+Landscape+II+by+Emma+Scarvey+-+Picture+Frame+Painting.jpg',
    description: 'Nullam pellentesque tellus sed eros bibendum pharetra. Nullam non sem quis augue hendrerit maximus. Curabitur vel lectus vel lacus faucibus accumsan. Nullam efficitur lectus vitae massa semper, eget consequat dui congue. Aenean interdum, urna nec bibendum feugiat, lectus orci facilisis dolor, eget laoreet magna quam at lacus. Fusce quis congue tellus. Mauris egestas quam sem. Cras pulvinar maximus ex a dictum. Etiam justo lorem, feugiat nec augue id, dapibus scelerisque ligula. Praesent molestie ac metus ut sollicitudin. Aenean quis tortor non eros sodales cursus non sit amet turpis. Aliquam id accumsan sapien.',
    artist: 'Rembrandt'},
    {
      objectid: 12348,
      title: 'Cityscape',
      primaryimageurl: 'https://artivive.com/assets/uploads/2022/01/jaime-byrd_our-city_artwork_image.jpg',
      description: 'In at lacus commodo, imperdiet risus et, efficitur mauris. Phasellus ante nulla, ornare ac augue at, eleifend imperdiet risus. Suspendisse elementum, arcu at fringilla ullamcorper, massa massa porta erat, vel viverra tellus urna vel enim. Sed sollicitudin augue nec pretium accumsan. Donec efficitur sodales gravida. Fusce sed augue sit amet tortor finibus mollis. Quisque gravida aliquet nunc vel dapibus. Donec tellus massa, iaculis ac ornare in, pulvinar sit amet ligula. Morbi gravida urna erat, nec finibus velit facilisis in. Aliquam vulputate consequat purus, vitae euismod arcu facilisis et. Nunc fringilla nunc porttitor, feugiat massa eget, molestie diam. Nulla facilisi. Vestibulum egestas consequat neque et ullamcorper.',
      artist: 'Monet'}
]

const [object1, object2, object3, object4] = await Promise.all(objects2.map(object => {
  return Object.create(object)
}))

await user1.addObject(object2)
await user1.addObject(object3)
await user2.addObject(object4)
await user3.addObject(object1)
await user4.addObject(object3)

  // console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1]
  //   }
  // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
