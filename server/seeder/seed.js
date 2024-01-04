const db = require('../config/connection');
const { User, Event } = require('../models');
const eventData = require('./eventSeeds.json');
const userData = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Event', 'events');
  await cleanDB('User', 'users');

  const events = await Event.create(eventData);
  const users = await User.create(userData);

  for (const newEvent of events) {
    const temp = users[Math.floor(Math.random() * users.length)];

    temp.hostID = temp._id;
    console.log(newEvent);
    await newEvent.save();
  }

  console.log('all done!');
  process.exit(0);
});
