# 🚀 Blogify Backend

A backend API for a blogging platform built using Node.js and Express.

---

## 📌 Features

- 📝 Create, Read, Update, Delete blog posts
- 🔐 Authentication & Authorization (JWT)
- 📂 Organized MVC structure
- 🐳 Docker support
- 🌐 RESTful APIs

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- Docker

---

## 📁 Project Structure
blogify-backend/
│── middlewares/ # Authentication & custom middleware
│── models/ # Database schemas
│── routes/ # API endpoints
│── services/ # Business logic
│── views/ # Templates (if used)
│── public/ # Static files
│── .dockerignore
│── Dockerfile
│── index.js
│── package.json

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the repository
```bash
git clone https://github.com/vaibhav051422-collab/blogify-backend.git
cd blogify-backend
```
### 🔹 2. Install dependencies
```bash
npm install
```
### 🔹 3. Setup environment variables
Create a .env file:
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

### 🔹 4. Run the server
npm start

🐳 Run with Docker
docker build -t blogify-backend .
docker run -p 5000:5000 blogify-backend
