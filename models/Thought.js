// Thought.js

const mongoose = require('mongoose');
const reactionSchema = require('./Reaction'); // Import ReactionSchema

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema] // Use ReactionSchema
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
