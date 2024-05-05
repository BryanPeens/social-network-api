// reaction-controller.js

const { Thought, Reaction } = require('../models');

const ReactionController = {
  // Create a new reaction for a thought
  createReaction: async (req, res) => {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const newReaction = await Reaction.create({ reactionBody, username });
      thought.reactions.push(newReaction._id);
      await thought.save();
      res.status(201).json(newReaction);
    } catch (error) {
      console.error('Error creating reaction:', error);
      res.status(400).json({ error: 'Failed to create reaction' });
    }
  },

  // Delete a reaction by ID
  deleteReaction: async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: reactionId } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      await Reaction.findByIdAndDelete(reactionId);
      res.json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting reaction:', error);
      res.status(500).json({ error: 'Failed to delete reaction' });
    }
  }
};

module.exports = ReactionController;
