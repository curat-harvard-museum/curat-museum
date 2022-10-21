"use strict";
const axios = require("axios");
const { randEmail, randUserName } = require("@ngneat/falso");
const {
  db,
  models: { User, Object, Comment },
} = require("../server/db");
// if (process.env.NODE_ENV !== "production") require("../secrets");
if(process.env.NODE_ENV !== 'production') require('../secrets');
// console.log('log my environment variables', process.env);

const API_KEY = process.env.API_KEY
// console.log("API_KEY", API_KEY)

const users2 = [
  {
    username: "jordy",
    email: "jordy@email.com",
    password: "123",
  },
  {
    username: "joyce",
    email: "joyce@email.com",
    password: "123",
  },
  {
    username: "jasmine",
    email: "jasmine@email.com",
    password: "123",
  },
  {
    username: "maxiel",
    email: "maxiel@email.com",
    password: "123",
  },
  {
    username: "olive",
    email: "olive@email.com",
    password: "123",
  },
  {
    username: "cody",
    email: "cody@email.com",
    password: "123",
  },
  {
    username: "prof",
    email: "prof@email.com",
    password: "123",
  },
];

async function fetchObjects() {
  const { data } = await axios.get(
    `https://api.harvardartmuseums.org/object?q=peoplecount:1&person?&apikey=${API_KEY}&size=100`
  );
  return data.records;
}

//create

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
// console.log("User magic methods", User.prototype);
//setObjects(), addObject(), addObjects(), removeObject(), removeObjects()
// console.log("Object magic methods", Object.prototype);
//setUsers(), addUsers(), addUser()


async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  let myPromise = () =>
    new Promise((resolve, reject) => {
      setTimeout(function () {
        resolve("Count");
      }, 100);
    });


  const [user1, user2, user3, user4, user5, user6, user7] = await Promise.all(
    users2.map((user) => {
      return User.create(user);
    })
  );

    for(let i = 0; i < 20; i++){
      await User.create({username: randUserName(), email: randEmail(), password: "123"})
    }

  async function mapObjects() {
    const objectArr = await fetchObjects();
    const artwork = await Promise.all(
      objectArr.map((obj) => {
        return Object.create({
          objectid: obj.id,
          primaryimageurl: obj.primaryimageurl,
          title: obj.title,
          description: obj.description,
          artist: obj.people[0].name
        });
      })
    );

    await user1.addObjects([artwork[0], artwork[8], artwork[9]]);
    await user7.addObjects([artwork[6], artwork[2], artwork[4]]);
    await user2.addObjects([artwork[0], artwork[2], artwork[4]]);
    await user3.addObjects([artwork[1], artwork[5], artwork[4]]);
    await user4.addObjects([artwork[0], artwork[2], artwork[4]]);
    await user6.addObjects([artwork[1], artwork[2], artwork[4]]);
    await user5.addObjects([artwork[3], artwork[2], artwork[4]]);
  }

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
