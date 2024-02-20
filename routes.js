const express = require('express');
const router = express.Router();
const { execFile } = require('child_process');

// CRUD routes

// Create
router.post('/resource', (req, res) => {
  execFile('bruno', ['docs.bruno/create.bru'], (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing create.bru:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(stdout);
    res.status(200).send('Resource created successfully');
  });
});

// Read
router.get('/resource/:id', (req, res) => {
  execFile('bruno', ['docs.bruno/read.bru'], (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing read.bru:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(stdout);
    res.status(200).send('Resource retrieved successfully');
  });
});

// Update
router.put('/resource/:id', (req, res) => {
  execFile('bruno', ['docs.bruno/update.bru'], (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing update.bru:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(stdout);
    res.status(200).send('Resource updated successfully');
  });
});

// Delete
router.delete('/resource/:id', (req, res) => {
  execFile('bruno', ['docs.bruno/delete.bru'], (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing delete.bru:', error);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log(stdout);
    res.status(200).send('Resource deleted successfully');
  });
});

module.exports = router;
