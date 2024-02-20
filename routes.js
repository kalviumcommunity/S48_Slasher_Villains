const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const MONGODB_URI = 'mongodb+srv://anavik:<password>@slashervillains.kvws8y6.mongodb.net/';

MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
    const db = client.db(); 
    const collection = db.collection('Slasher_Villains'); 

    // CRUD routes
    // Create
    router.post('/resource', (req, res) => {
      // Implementation for creating a resource
    });

    // Read
    router.get('/resource/:id', (req, res) => {
      // Implementation for reading a resource
    });

    // Update
    router.put('/resource/:id', (req, res) => {
      // Implementation for updating a resource
    });

    // Delete
    router.delete('/resource/:id', (req, res) => {
      // Implementation for deleting a resource
    });
  }
});

module.exports = router;
