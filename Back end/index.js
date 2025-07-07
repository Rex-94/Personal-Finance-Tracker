const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Define a schema for a transaction
const transactionSchema = new mongoose.Schema({
  id: Number,
  amount: Number,
  description: String,
  type: {
    // Type: income or expense
    type: String,
    enum: ["income", "expense"],
    default: "expense",
    required: true,
  },
  category: {
    type: String,
    default: "General", // Default to General category
    required: true,
  },
});

// GET /transactions - fetch all transactions
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ id: -1 }); // Newest first
    res.send(transactions);
    res.json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Create a model from the schema
const Transaction = mongoose.model("Transaction", transactionSchema);


mongoose.connect(process.env.MONGODB_URI, {
  dbName: "personal-finance",
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Connect to MongoDB
app.get("/", (req, res) => {
  res.send("Welcome to the backend!");
});


// POST /transactions - add a new transaction
app.post("/transactions", async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body); // Create document
    const saved = await newTransaction.save(); // Save to DB
    res.json(saved);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE /transactions/:id - delete by MongoDB _id
app.delete("/transactions/:id", async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id); // Remove by _id
    res.json(deleted);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// Start the server
app.listen(5000, (req, res) => {
  console.log(`🚀 Server running at http://localhost:5000`);
});