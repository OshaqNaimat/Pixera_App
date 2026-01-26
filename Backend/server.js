import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connect.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import productRoutes from "./routes/productRoutes.js";

// Load environment variables
// dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/products", productRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Pixela API is running",
    status: "success",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("✓ Database connected successfully");
    
    // Start server
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}`);
      console.log(`✓ Health check: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error.message);
    // Still start server even if DB connection fails (for testing)
    app.listen(PORT, () => {
      console.log(`⚠ Server running on port ${PORT} (Database connection failed)`);
      console.log(`⚠ API available at http://localhost:${PORT}`);
    });
  }
};

// Start the server
startServer();
