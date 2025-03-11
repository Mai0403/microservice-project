const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
dotenv.config({ path: './auth-service/.env' });
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

// app.listen(5002, () => console.log("Auth Service running on port 5002"));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});