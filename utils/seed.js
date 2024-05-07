// seed.js

const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { getRandomThoughts } = require('./data');

// Importing the uniq function from Lodash
const { uniq } = require('lodash');

// Importing the array of usernames
const { usernames } = require('./data');

// Function to generate unique usernames
const generateUniqueUsernames = (count) => {
  // Shuffling the array to randomize the order
  const shuffledUsernames = usernames.sort(() => Math.random() - 0.5);
  // Selecting unique usernames from the shuffled array
  return uniq(shuffledUsernames.slice(0, count)); // Use uniq instead of unique
};

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

    // Generate unique usernames
    const uniqueUsernames = generateUniqueUsernames(20);

    // Insert users with unique usernames
    const users = uniqueUsernames.map((username, index) => ({
      username,
      email: `user${index + 1}@example.com`, // Generate unique emails
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
