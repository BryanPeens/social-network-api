// thought-controller.js

const { Thought, User } = require('../models');

const ThoughtController = {
  // Get all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
      res.status(500).json({ error: 'Failed to fetch thoughts' });
    }
  },

  // Get a thought by ID
  getThoughtById: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error('Error fetching thought by ID:', error);
      res.status(500).json({ error: 'Failed to fetch thought' });
    }
  },

  // Create a new thought
  createThought: async (req, res) => {
    const { thoughtText, username } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const newThought = await Thought.create({ thoughtText, username });
      user.thoughts.push(newThought._id);
      await user.save();
      res.status(201).json(newThought);
    } catch (error) {
      console.error('Error creating thought:', error);
      res.status(400).json({ error: 'Failed to create thought' });
    }
  },

  // Update a thought by ID
  updateThought: async (req, res) => {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      console.error('Error updating thought:', error);
      res.status(400).json({ error: 'Failed to update thought' });
    }
  },

  // Delete a thought by ID
  deleteThought: async (req, res) => {
    const { thoughtId } = req.params;
    try {
      const deletedThought = await Thought.findByIdAndDelete(thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      console.error('Error deleting thought:', error);
      res.status(500).json({ error: 'Failed to delete thought' });
    }
  }
};

module.exports = ThoughtController;
