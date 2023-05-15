const { Router } = require('express');
const router = Router();
const User = require('../../models/User');
const Show = require('../../models/Show');


// GET all users
router.get('/', async (req, res, next) => {
  
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
    
  }
});

// GET one user by ID
//localhost:3000/users/1
router.get('/:id', async (req, res, next) => {
  
  try {
    const { id }  = req.params;
    const user = await User.findByPk(id);
    res.json(user);
  } catch (error) {
    next(error);
    
  }
});

// GET all shows watched by a user (user id in req.params)
router.get('/:id/shows', async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    const shows = await user.getShows();

    res.json(shows);
  } catch (error) {
    next(error);
  }
});


// PUT route to update and add a show if a user has watched it
router.put('/:id/shows', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { showId } = req.body;

    // Find the user by id
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the show by id
    const show = await Show.findByPk(showId);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }


    show.userId = user.id;
    await show.save();
    
    
    res.json(show);
  } catch (error) {
    next(error);
  }
});

  


module.exports = router;


