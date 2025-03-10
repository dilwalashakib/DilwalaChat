
# Real-Time Chat Application

A real-time chat application built with Next.js, Node.js, Express.js, Socket.io, and MongoDB. This app allows users to send and receive messages in real-time and stores user data and chat history in MongoDB.


## Features

- Real-time messaging using Socket.io.
- User authentication and session management
- MongoDB integration for storing messages and user details.
- Developed a fully functional chat application with Next.js for the front end and Node.js and Express.js for the back-end.
- Light/dark mode availeable.
- Built a fully responsive and intuitive user interface with Next.js, ensuring smooth interaction on both desktop and mobile devices.
- Implemented support for sending images and files in chats.
- Displayed active status, message delivery and read status (sent, delivered, read) to users in real-time, improving chat communication transparency.   
- Implemented JWT-based authentication.


## Prerequisites

- Node.js (>= 16.0.0)
- MongoDB (locally or using MongoDB Atlas)
## Installation

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/dilwalashakib/DilwalaChat.git
cd chat-app
```

### 2. Install Dependencies
Install both the frontend and backend dependencies.

#### For Frontend (Next.js):

```bash
cd frontend
npm install
```
#### For Backend (Node.js + Express.js):

```bash
cd backend
npm install
```

### 3. Set Up MongoDB
- Create a new database in MongoDB (or use MongoDB Atlas).
- Set up a .env file in the backend folder and add the following environment variables:

```bash
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret
PORT=5000
```
- Replace MONGO_URI with your MongoDB connection string if you're using MongoDB Atlas or another remote database.

### 4. Run the Application
#### Start the Backend (Node.js + Express.js + Socket.io):

``` bash
cd backend
npm start
```

#### Start the Frontend (Next.js):
``` bash
cd frontend
npm run dev
```

### 5. Open the Application
Once both frontend and backend are running, open your browser and visit:

```bash
http://localhost:3000
```

## How It Works
### 1. Real-Time Messaging with Socket.io
The backend uses Socket.io to handle real-time communication. When a user sends a message, the server broadcasts it to all other connected users.

### 2. User Authentication
Users can register and log in using JWT authentication. Upon successful login, a token is generated and stored in the browser’s local storage.

### 3. Storing Messages in MongoDB
All messages sent between users are stored in MongoDB. Each message is associated with the sender and recipient and can be retrieved to show the chat history.

### 4. Next.js Frontend
The frontend is built with Next.js for server-side rendering and better SEO performance. It includes chat components, message input forms, and user authentication.

## How to Contribute
- Fork the repository.
- Create a new branch (git checkout -b feature-name).
- Make your changes and commit them (git commit -am 'Add feature').
- Push to the branch (git push origin feature-name).
- Create a new Pull Request.

## Author
- [@dilwalashakib](https://www.github.com/dilwalashakib)


## License
License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the LICENSE file for details.


