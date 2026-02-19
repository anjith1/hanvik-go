// db.js
require("dotenv").config();
const mongoose = require("mongoose");

// Connection options
const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000
};

// Connect to main database for orders and users
const userConnection = mongoose.createConnection(process.env.MONGODB_URI, connectionOptions);

userConnection.on("connected", () => {
  console.log("✅ Main MongoDB connected successfully");
});

userConnection.on("error", (err) => {
  console.error("❌ Main MongoDB connection error:", err);
});

// Connect to "Form" DB for worker data
const workerConnection = mongoose.createConnection(process.env.MONGO_URI_WORKERS, connectionOptions);

workerConnection.on("connected", () => {
  console.log("Worker MongoDB connected (Form DB)");
});

workerConnection.on("error", (err) => {
  console.error("Worker MongoDB connection error:", err);
});

// Create models using the correct connections
const OrderSchema = require('./models/Order');
const Order = userConnection.model('Order', OrderSchema);

module.exports = { userConnection, workerConnection, Order };
