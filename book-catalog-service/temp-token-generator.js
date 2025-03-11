const jwt = require('jsonwebtoken');
const token = jwt.sign(
  { userId: "admin1", role: "admin" },
  "47f55967ad8c205f5ed668f30737b47a8626a4a17cbaf4d3a04cbb0db1b3ece1",  // Must match .env JWT_SECRET
  { expiresIn: "9h" }
);
console.log("ADMIN TOKEN:", token);