const express = require('express');
const router = express.Router();
const { Candy } = require('../models/Candy');

// Route to display the candy shop page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get all candies
router.get('/candies', async (req, res) => {
  try {
    const candies = await Candy.findAll();
    res.json(candies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching candies from the database.');
  }
});

// Route to add a new candy
router.post('/candies', async (req, res) => {
  const { name, description, price, quantity } = req.body;

  try {
    const newCandy = await Candy.create({
      name,
      description,
      price,
      quantity,
    });
    res.json(newCandy);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding candy to the database.');
  }
});

// Route to buy candies
router.post('/candies/:id/buy', async (req, res) => {
  const candyId = req.params.id;
  const quantityToBuy = req.body.quantityToBuy;

  try {
    const candy = await Candy.findByPk(candyId);
    if (!candy) {
      res.status(404).json({ message: 'Candy not found.' });
      return;
    }

    if (candy.quantity < quantityToBuy) {
      res.status(400).json({ message: 'Not enough candies available to buy.' });
      return;
    }

    candy.quantity -= quantityToBuy;
    await candy.save();
    res.json({ message: 'Candy bought successfully!', updatedCandy: candy });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error buying candy.');
  }
});

// Route to delete a candy
router.delete('/candies/:id', async (req, res) => {
  const candyId = req.params.id;

  try {
    await Candy.destroy({ where: { id: candyId } });
    res.json({ message: 'Candy deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting candy from the database.');
  }
});

module.exports = router;



