const { Schema } = require('mongoose');

const contributionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: String,
    required: true,
  },
},
{timestamps: true}
);

module.exports = contributionSchema;
