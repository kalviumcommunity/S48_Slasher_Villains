const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://anavik:<password>@slashervillains.kvws8y6.mongodb.net/';

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.send(`Database Connection Status: ${dbStatus}`);
});

// Middleware for parsing JSON request body
app.use(bodyParser.json());

// Use the combined routes and handlers
app.use('/', routes);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
