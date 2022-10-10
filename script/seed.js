"use strict";
const axios = require ("axios")
// const REACT_APP_HARVARD_TOKEN = require ("../.env")

const {
  db,
  models: { User, Object, Comment },
} = require("../server/db");


async function fetchObjects(){
  const {data} = await axios.get(`https://api.harvardartmuseums.org/object?primaryimageurl!==null&people!==null&description!==null&title!==null&before=1900&apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100`);
  return data;
}

async function mapObjects(){
  const objectArr = await fetchObjects();
  for(let i = 0; i < objectArr.records.length; i++){
    console.log(objectArr.records[i].people.name)
    await Promise.all([
      Object.create({
        objectid: objectArr.records[i].id,
        primaryimageurl: objectArr.records[i].primaryimageurl,
        title: objectArr.records[i].title,
        description: objectArr.records[i].description,
        artist: objectArr.records[i].people.name,
      })
    ])
  }
}
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
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

  await mapObjects();

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
