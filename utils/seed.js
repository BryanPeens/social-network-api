// seed.js

const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThoughts } = require('./data');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', async () => {
  console.log('Connected to MongoDB');

  // Delete collections if they exist
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Collections deleted successfully');
  } catch (error) {
    console.error('Error deleting collections:', error);
    process.exit(1);
  }

  // Generate sample data
  try {
    // Insert thoughts first
    const thoughts = await Thought.insertMany(getRandomThoughts(20));
    console.log('Thoughts seeded successfully');

    // Map thought ids for each user
    const users = Array.from({ length: 20 }, () => ({
      username: getRandomUsername(),
      email: `test@email.com`, 
      thoughts: thoughts.splice(0, 2).map(thought => thought._id)
    }));

    // Insert users
    await User.insertMany(users);
    console.log('Users seeded successfully');

    console.log('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});
