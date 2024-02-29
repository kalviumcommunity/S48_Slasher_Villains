const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

app.get('/slashervillains', async (req, res) => {
  await SlasherVillainsModel.find()
   .then(slasherVillains => res.json(slasherVillains))
     .catch(err => res.status(500).json(err));
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/frontend/build/index.html'));
// });

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
