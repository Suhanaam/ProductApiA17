const express = require('express');
const mongoose = require('mongoose');
const pRouter = require('./Routers/pRouter');
const userRouter = require('./Routers/userRouter');
const jwt = require('jsonwebtoken');
const cors=require('cors')
require('dotenv').config();
const port=process.env.PORT
const mongourl=process.env.MONGODB_URL ;

const app = express();

// Middleware for parsing JSON
app.use(express.json());

app.use(cors())

// Connect to MongoDB
main()
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));




async function main() {
  await mongoose.connect(mongourl);
}

// Welcome route
app.get('/', (req, res) => {
  res.send("Hello, welcome to the database");
});

// Middleware for product routes
app.use('/products', pRouter);
//to find images
app.use('/images', express.static('public/images'));

// // Login route (authentication)
// app.post('/login', (req, res) => {

//   console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

//   const username = req.body.username;

//   // Validate the input
//   if (!username) {
//     return res.status(400).json({ error: "Username is required" });
//   }

//   // Create a token
//   const user = { name: username };
//   const secretKey = process.env.JWT_SECRET_KEY;

//   if (!secretKey) {
//     return res.status(500).json({ error: "JWT secret key not configured in environment variables" });
//   }

//   const token = jwt.sign(user, secretKey);
//   res.json({ accesstoken: token });
// });
app.use('/users', userRouter);
// Start the server


app.listen(port, () => {
  console.log("Server started on port 3000");
});
