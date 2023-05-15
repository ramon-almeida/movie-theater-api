const express = require('express');
const router = express.Router();
const Show = require('../models/Show');

//Get all shows:
router.get('/shows', async (req, res) => {
    try {
      const shows = await Show.findAll();
      res.json(shows);
    } catch (error) {
      console.error(error);
      
    }
  });
  

//Get one show
router.get('/shows/:id', async (req, res) => {
    const showId = req.params.id;
    try {
      const show = await Show.findByPk(showId);
      if (show) {
        res.json(show);
      } else {
        
      }
    } catch (error) {
      console.error(error);
      
    }
  });

//GET shows of a particular genre (genre in req.params)

router.get('/shows/genre/:genre', async (req, res) => {
    const genre = req.params.genre;
    try {
      const shows = await Show.findAll({ where: { genre } });
      res.json(shows);
    } catch (error) {
      console.error(error);
      
    }
  });

//PUT update rating of a show that has been watched
router.put('/shows/:id/rating', async (req, res) => {
    const showId = req.params.id;
    const { rating } = req.body;
  
    try {
      const show = await Show.findByPk(showId);
      if (show) {
        show.rating = rating;
        await show.save();
        res.json(show);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      
    }
  });

//PUT update the status of a show
router.put('/shows/:id/status', async (req, res) => {
    const showId = req.params.id;
    const { status } = req.body;
  
    try {
      const show = await Show.findByPk(showId);
      if (show) {
        show.status = status;
        await show.save();
        res.json(show);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      
    }
  });

//DELETE a show

router.delete('/shows/:id', async (req, res) => {
    const showId = req.params.id;
  
    try {
      const show = await Show.findByPk(showId);
      if (show) {
        await show.destroy();
        res.json({ message: 'Show deleted successfully' });
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
      
    }
  });
  
module.exports = router;