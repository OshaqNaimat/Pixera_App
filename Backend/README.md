# Pixela Backend API

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory with:
```
MONGO_URL=mongodb://127.0.0.1:27017/pixela
PORT=5000
NODE_ENV=development
```

### 3. Start MongoDB
Make sure MongoDB is running on your system:
- Windows: Start MongoDB service or run `mongod`
- Mac/Linux: `brew services start mongodb-community` or `sudo systemctl start mongod`

### 4. Run the Server

**Option 1: Using npm script (Recommended)**
```bash
npm run server
```

**Option 2: Using dev mode (auto-reload on changes)**
```bash
npm run dev
```

**Option 3: Direct node command**
```bash
node app/Backend/server.js
```

## API Endpoints

### Health Check
- `GET /` - Server health check

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user by ID
- `GET /api/users` - Get all users

### Posts
- `POST /api/posts/:user_id` - Create post
- `GET /api/posts` - Get all posts
- `POST /api/posts/comment/:user_id/:post_id` - Add comment
- `POST /api/posts/like/:user_id/:post_id` - Toggle like
- `GET /api/posts/:id` - Get user's posts

### Messages
- `POST /api/messages/:sender_id/:receiver_id` - Send message
- `GET /api/messages/:sender_id/:receiver_id` - Get messages

### Products
- `POST /api/products/:user_id` - Create product listing
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get user's products

## Server Features

- ✅ Express.js server with ES6 modules
- ✅ MongoDB connection with Mongoose
- ✅ CORS enabled
- ✅ Error handling middleware
- ✅ Password hashing with bcryptjs
- ✅ Environment variable support
- ✅ Graceful database connection handling

## Troubleshooting

### Server won't start
1. Check if port 5000 is available
2. Verify MongoDB is running
3. Check `.env` file exists and has correct MONGO_URL
4. Run `npm install` to ensure all dependencies are installed

### Database connection fails
- The server will still start even if database connection fails
- Check MongoDB is running: `mongosh` or `mongo`
- Verify MONGO_URL in `.env` file

### Module not found errors
- Run `npm install` to install all dependencies
- Make sure `bcryptjs` is installed: `npm install bcryptjs`
