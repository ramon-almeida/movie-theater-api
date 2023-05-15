const express = require('express');
const app = express();
const port = 3000;
const { db } = require("./db/connection")
const seed = require ("./seed")

// Import routes
const usersRoutes = require('./routes/users');
const showsRoutes = require('./routes/shows');

// Middleware
app.use(express.json());

// Routes
app.use(usersRoutes);
app.use(showsRoutes);

// Start the server
app.listen(port, async () => {
  await db.sync()
  await seed()
  console.log(`App is listening on port ${port}`);
});
