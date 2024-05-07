// data.js

const usernames = [
  'user123',
  'coolUser',
  'socialLover',
  'thoughtfulMind',
  'creativeSoul',
  'funnyFellow',
  'musicLover',
  'techGeek',
  'codingNinja',
  'happyUser',
  'randomThoughts',
  'coffeeLover',
  'traveler123',
  'bookworm',
  'fitnessFreak',
  'foodie',
  'gamerGirl',
  'movieBuff',
  'artisticSpirit',
  'natureLover',
];

const thoughtTexts = [
  'Just had the best coffee ever!',
  'Feeling motivated to start a new project today.',
  'Excited about the new movie releasing this weekend.',
  'Loving the beautiful weather today.',
  'Trying out a new recipe for dinner tonight.',
  'Feeling grateful for all the blessings in my life.',
  'Feeling inspired after reading a great book.',
  'Missing my friends who live far away.',
  'Just finished a challenging workout session.',
  'Reflecting on the importance of self-care.',
  'Feeling nostalgic listening to old songs.',
  'Looking forward to a relaxing weekend.',
  'Thinking about my goals for the upcoming year.',
  'Feeling proud of myself for accomplishing a difficult task.',
  'Enjoying spending time with family.',
  'Feeling determined to achieve my dreams.',
  'Just watched an amazing TED talk!',
  'Feeling grateful for the support of my friends.',
  'Excited to learn something new today.',
  'Feeling inspired by the beauty of nature.',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate a random username
const getRandomUsername = () => getRandomArrItem(usernames);

// Generate random thoughts
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughtTexts),
      username: getRandomUsername(),
    });
  }
  return results;
};

module.exports = { usernames, getRandomUsername, getRandomThoughts };
