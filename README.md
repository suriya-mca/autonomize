# Autonomize Assignment

A full-stack application to manage GitHub user data, including repositories, followers, and mutual friends, built using **Express** (backend), **React** (frontend), and **PostgreSQL** (database).

---

## **Features**

### Backend
1. Fetch and save GitHub user details to the database.
2. Avoid redundant API calls by caching data in the database.
3. Manage mutual followers and save them as friends.
4. Search users based on username, location, and other fields.
5. Soft delete user records.
6. Update user details like location, blog, and bio.
7. Return a sorted list of users by various fields.

### Frontend
1. Search GitHub users using their username.
2. Display user details, including repositories and followers.
3. Navigate between repositories, followers, and user details.
4. Persist fetched data to avoid redundant API calls.
5. Responsive UI built with React hooks and plain CSS.

---

## **Getting Started**

### Prerequisites
- **Node.js** (v14+)
- **PostgreSQL** (v12+)
- **npm** (v6+)

---

## **Setup**

### Clone the Repository
```bash
git clone https://github.com/your-username/github-user-manager.git
cd github-user-manager
```

### Backend Setup
Navigate to the backend/ directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Configure the database:

Create a PostgreSQL database named github_users.
Update the db.js file with your database credentials.

Start the backend server:
```bash
node app.js
```

API will be running at:
```bash
http://localhost:5000/api
```

### Frontend Setup
Navigate to the frontend/ directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Update the backend URL:

Open src/context/UserProvider.js and set the correct backend URL:
```bash
const BACKEND_URL = 'http://localhost:3000/api';
```

Start the React app:
```bash
npm start
```

Access the app in your browser:
```bash
http://localhost:3000
```

## **API Endpoints**

Base URL: http://localhost:3000/api

1. Save GitHub User: POST /user
2. Get Mutual Friends: POST /user/:username/friends
3. Search Users: GET /users?username=xyz&location=abc
4. Soft Delete User: DELETE /user/:username
5. Update User Details: PUT /user/:username