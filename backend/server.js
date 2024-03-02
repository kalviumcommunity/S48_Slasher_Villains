const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Joi = require('joi'); // Import Joi for validation
const SlasherVillainsModel = require('./models/slasher_villains');

const app = express();
const port = 3005;
const mongoURI = 'mongodb+srv://anavik:AnaviK%40Kalvium%402024@slashervillains.kvws8y6.mongodb.net/slasher_?retryWrites=true&w=majority&appName=SlasherVillains';

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Joi schema for creating a new entity
const createEntitySchema = Joi.object({
  name: Joi.string().required(),
  movies: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
  weapons: Joi.array().items(Joi.string()).required(),
  modus_operandi: Joi.string().required(),
  motivation_background: Joi.string().required(),
  kill_count: Joi.number().integer().min(0).required(),
  weakness: Joi.string().required()
});

app.get('/slashervillains', async (req, res) => {
  try {
    const slasherVillains = await SlasherVillainsModel.find();
    res.json(slasherVillains);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/slashervillains', async (req, res) => {
  try {
    const newEntity = await SlasherVillainsModel.create(req.body);
    res.status(201).json(newEntity);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.put('/slashervillains', async (req, res) => {
  try {
    const updatedEntity = await SlasherVillainsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntity);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete('/slashervillains', async (req, res) => {
  try {
    await SlasherVillainsModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entity deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Handle other routes or serve frontend files if needed

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
