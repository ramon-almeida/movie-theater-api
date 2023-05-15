const { Router } = require('express');
const router = Router();
const Show = require('../../models/Show');

//Get all shows:
router.get('/', async (req, res, next) => {
    
  try {
      const shows = await Show.findAll();
      res.json(shows);
    } catch (error) {
      next(error);
      
    }
  });
  

//Get one show
router.get('/:id', async (req, res, next) => {
    
    try {
      const { id } = req.params;
      const show = await Show.findByPk(id);
      res.json(show);
    } catch (error) {
      next(error);
      
    }
  });

//GET shows of a particular genre (genre in req.params)

router.get('/genre/:genre', async (req, res, next) => {
    const genre = req.params.genre;
    try {
      const shows = await Show.findAll({ where: { genre } });
      res.json(shows);
    } catch (error) {
      next(error);
      
    }
  });

//PUT update rating of a show that has been watched
//ex: http://localhost:3000/shows/rating/8/rating
router.put('/rating/:id/rating', async (req, res, next) => {
    const { id } = req.params;
    const { rating } = req.body;
  
    try {
      const show = await Show.findByPk(id);
      if (show) {
        show.rating = rating;
        await show.save();
        res.json(show);
      } else {
        res.status(404).json({ error: 'Show not found' });
      }
    } catch (error) {
      next(error);
      
    }
  });

//PUT update the status of a show
router.put('/:id/status', async (req, res,next) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const show = await Show.findByPk(id);
      if (show) {
        show.status = status;
        await show.save();
        res.json(show);
      } else {
        res.status(404).json({ error: 'Show not found' });
      }
    } catch (error) {
      next(error);
      
    }
  });

//DELETE a show

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const show = await Show.findByPk(id);
      if (show) {
        await show.destroy();
        res.json({ message: 'Show deleted successfully' });
      } else {
        res.status(404).json({ error: 'Show not found' });
      }
    } catch (error) {
      next(error);
      
    }
  });
  
module.exports = router;