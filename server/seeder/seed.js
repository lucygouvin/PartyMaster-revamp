const db = require('../config/connection');
const { User } = require('../models');
const modelSeeds = require('./modelSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'modelSeeds');

    await User.create(modelSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});