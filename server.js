const express = require('express');
const app = express();
const routes = require('./routes'); // Import your routes file

const PORT = process.env.PORT || 3000;

// Use the routes
app.use('/', routes);

// Middleware to handle undefined routes
app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
