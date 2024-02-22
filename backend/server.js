const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("pong");
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
