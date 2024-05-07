# Social Media API

## Description
The Social Media API is a backend application that provides endpoints for managing users, thoughts, reactions, and friendships in a social media platform. It allows users to perform various operations such as creating, updating, deleting users and thoughts, adding and removing reactions, and managing friendships.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation Instructions
To install and run the Social Media API, follow these steps:

1. Clone or download the project repository from GitHub.
2. Navigate to the project directory in your command line interface.
3. Run the following command to install the necessary dependencies:

````
$ npm install
````

4. Set up MongoDB on your local machine or use a cloud-based MongoDB service.
5. Update the MongoDB connection string in the `index.js` file to point to your MongoDB database, and run the following command:

````
$ npm run seed
````

6. Start the server using the following command:

````
$ npm start
````

## Usage Information
The Social Media API provides the following endpoints:

- **Users**
- `GET /api/users`: Get all users
- `GET /api/users/:userId`: Get a user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:userId`: Update a user by ID
- `DELETE /api/users/:userId`: Delete a user by ID
- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user

- **Thoughts**
- `GET /api/thoughts`: Get all thoughts
- `GET /api/thoughts/:thoughtId`: Get a thought by ID
- `POST /api/thoughts`: Create a new thought
- `PUT /api/thoughts/:thoughtId`: Update a thought by ID
- `DELETE /api/thoughts/:thoughtId`: Delete a thought by ID

- **Reactions**
- `POST /api/reactions/:thoughtId`: Add a reaction to a thought
- `DELETE /api/reactions/:thoughtId/:reactionId`: Delete a reaction from a thought

You can use tools like Insomnia or Postman to interact with these endpoints and perform various CRUD operations on users, thoughts, and reactions.

## Contribution Guidelines
If you'd like to contribute to the Social Media API project, please follow these guidelines:

1. Fork the Repository: Start by forking the project repository to your GitHub account.
2. Create a Branch: Make your changes in a new branch to keep them isolated and organized.
3. Commit Changes: Follow best practices for commit messages and maintain code cleanliness.
4. Submit Pull Request: After testing your changes, submit a pull request with a clear description of your contributions.

## Test Instructions
This project has no tests yet.

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

