const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://Kojo:Kojo@partyplanner.isb2ed5.mongodb.net/'
);

module.exports = mongoose.connection;
