const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://anavik:AnaviK@Kalvium@2024@slashervillains.kvws8y6.mongodb.net/';

MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/', (req, res) => {
  MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      res.send('Database Connection: Disconnected');
    } else {
      res.send('Database Connection: Connected');
    }
  });
});

// Handle undefined routes
// app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
