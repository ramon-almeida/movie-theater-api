const express = require('express');
const app = express();
const userRouter = require('./routes/users');
//const User = require('../models/User');
const showRouter = require('./routes/shows');
//const Show = require('../models/Show.js')
//const { db } = require('../db/connection');




app.use(express.json());
app.use(express.urlencoded({ extended: true}))

// Route. based path
app.use('/users', userRouter);
app.use('/shows', showRouter)


//Error Handling

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

module.exports = app;
