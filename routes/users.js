const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Show = require('../models/Show')


// GET all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    
  }
});

// GET one user by ID
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (user) {
      res.json(user);
    } else {
      console.error({ error: 'Internal server error' } );
    }
  } catch (error) {
    console.error(error);
    
  }
});

// GET all shows watched by a user (user id in req.params)
router.get('/users/:id/shows', async (req, res) => {
    const userId = req.params.id;
  
    try {
      
      const user = await User.findByPk(userId, );
      if (user) {
        res.json(user.shows);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      
    }
  });
  

// PUT update and add a show if a user has watched it
router.put('/users/:id/shows', async (req, res) => {
  const userId = req.params.id;
  const { showId } = req.body;

  try {
    // Code to update or add a show to the user's watched shows
    
    await User.create({ userId, showId });
    
  } catch (error) {
    console.error(error);
    
  }
});

module.exports = router;
