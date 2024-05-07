const { User } = require('../models');

const UserController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  // Get a user by ID
  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    const { username, email } = req.body;
    try {
      const newUser = await User.create({ username, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: 'Failed to create user' });
    }
  },

  // Update a user by ID
  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(400).json({ error: 'Failed to update user' });
    }
  },

  // Delete a user by ID
  deleteUser: async (req, res) => {
    const { userId } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

  // Add a friend to user's friend list
  addFriend: async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends.push(friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      console.error('Error adding friend:', error);
      res.status(400).json({ error: 'Failed to add friend' });
    }
  },

  // Remove a friend from user's friend list
  removeFriend: async (req, res) => {
    const { userId } = req.params;
    const { friendId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.friends = user.friends.filter(id => id !== friendId);
      await user.save();
      res.json(user);
    } catch (error) {
      console.error('Error removing friend:', error);
      res.status(400).json({ error: 'Failed to remove friend' });
    }
  }
};

module.exports = UserController;
