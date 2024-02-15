const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('pong');
});

// Handle undefined routes
// app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});