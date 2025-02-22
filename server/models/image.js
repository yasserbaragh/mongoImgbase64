const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
