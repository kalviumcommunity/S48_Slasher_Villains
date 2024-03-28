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
  name: Joi.string().required(), // Validation for entity name
  movies: Joi.array().items(Joi.string()).required(), // Validation for movies array
  motivation_background: Joi.string().required(), // Validation for motivation background
  kill_count: Joi.string().required(),// Validation for kill count
  created_by: Joi.string().required()
});

// Endpoint for landing page
app.get('/landing', (req, res) => {
  res.sendFile(path.join(__dirname, 'landing.jsx')); // Assuming you have a landing.html file
});

// POST endpoint to create a new slasher villain
app.post('/slashervillains', async (req, res) => {
  try {
    // Convert comma-separated string to an array
    req.body.movies = req.body.movies.split(',').map(movie => movie.trim());

    // Validate request body against schema
    const value = await createEntitySchema.validateAsync(req.body);

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
  password: String,
});

const User = mongoose.model('User', userSchema);

// Add a GET endpoint to retrieve all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a GET endpoint to retrieve entities created by a specific user
app.get('/users/:userId/entities', async (req, res) => {
  try {
    const userId = req.params.userId;
    const entities = await SlasherVillainsModel.find({ created_by: userId });
    res.json(entities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT endpoint to update a slasher villain
app.put('/slashervillains/:id', async (req, res) => {
  try {
    const updatedEntity = await SlasherVillainsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntity);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE endpoint to delete a slasher villain
app.delete('/slashervillains/:id', async (req, res) => {
  try {
    await SlasherVillainsModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Entity deleted successfully' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Registration endpoint
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

    const token = jwt.sign({ username: username }, JWT_SECRET);

    // Set token to cookie
    res.cookie("token", token)
    // res.json({
    //   success: true,
    //   token
    // })
    res.json({
      success: true,
      message: "Signup successful",
      username,
      token,
      userId: newUser._id,
    });

    res.status(201).json({ message: 'User created successfully',token });
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
    res.cookie("token", token)
    res.json({
      success: true,
      token
    })
    res.json({
      success: true,
      message: "Login successful",
      username,
      token,
      userId: newUser._id,
    });
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

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decodedToken;
    next();
  });
}

// Protected route example

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
