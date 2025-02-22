const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const Image = require('./models/image'); // Assuming the model is in the models folder

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', async (req, res) => {
    const image = await Image.findOne();
    return res.status(200).json(image);
});

// POST request to save image and label
app.post('/upload', async (req, res) => {
  const { label, image } = req.body;
  try {
    const newImage = new Image({ label, image });
    await newImage.save();
    res.status(201).send('Image saved successfully');
  } catch (error) {
    res.status(500).send('Error saving image');
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});