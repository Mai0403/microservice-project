const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

app.listen(5002, () => console.log("Auth Service running on port 5002"));
