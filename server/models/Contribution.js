const { Schema } = require('mongoose');

const contributionSchema = new Schema({
  name: {
    type: String,
  },
  item: {
    type: String,
    required: true,
  },
});

module.exports = contributionSchema;
