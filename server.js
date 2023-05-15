const app = require('./src/app.js');
const port = 3000;
const { db } = require("./db/connection.js")
const seed = require ("./seed.js")


// Start the server
app.listen(port, async () => {
  await db.sync()
  await seed()
  console.log(`App is listening on port ${port}`);
});
