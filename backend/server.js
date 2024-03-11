const Joi = require('joi');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SlasherVillainsModel = require('./models/slasher_villains');

const app = express();
const port = 3005;
const mongoURI = 'mongodb+srv://anavik:AnaviK%40Kalvium%402024@slashervillains.kvws8y6.mongodb.net/slasher_?retryWrites=true&w=majority&appName=SlasherVillains';

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a secret key for JWT
const JWT_SECRET = '12345';

// Joi schema for creating a new entity
const createEntitySchema = Joi.object({
  name: Joi.string().required(),
  movies: Joi.array().items(Joi.string()).required(),
  motivation_background: Joi.string().required(),
  kill_count: Joi.number().integer().min(0).required()
});

// POST endpoint to create a new slasher villain
app.post('/slashervillains', authenticateToken, async (req, res) => {
  try {
    // Validate request body against schema
    const { error, value } = createEntitySchema.validate(req.body);
    if (error) {
      return res.status(400).json();
    }

    // Create new slasher villain
    const newSlasherVillain = await SlasherVillainsModel.create(value);

    res.status(201).json({ message: 'Slasher villain created successfully', data: newSlasherVillain });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User model schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// PUT endpoint to update a slasher villain
app.put('/slashervillains/:id', authenticateToken, async (req, res) => {
  try {
    const updatedEntity = await SlasherVillainsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntity);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE endpoint to delete a slasher villain
app.delete('/slashervillains/:id', authenticateToken, async (req, res) => {
  try {
    await SlasherVillainsModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entity deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, JWT_SECRET);

    // Set token to cookie
    res.cookie('token', token, { httpOnly: true }).send('Login successful');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Logout endpoint
app.get('/logout', (req, res) => {
  // Clear token from cookie
  res.clearCookie('token').send('Logged out');
});

// Authorization middleware
function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decodedToken;
    next();
  });
}

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// GET endpoint to retrieve all slasher villains
app.get('/slashervillains', async (req, res) => {
  try {
    // Retrieve all slasher villains from the database
    const slasherVillains = await SlasherVillainsModel.find();
    res.json(slasherVillains);
  } catch (err) {
    // Handle any errors that occur during the retrieval process
    res.status(500).json({ message: err.message });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;