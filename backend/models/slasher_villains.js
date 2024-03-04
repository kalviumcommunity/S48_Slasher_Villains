const mongoose = require('mongoose');

const SlasherVillainsSchema = new mongoose.Schema({
    name: String,
    movies: Array,
    motivation_background: String,
    kill_count: String,
})

const SlasherVillainsModel = mongoose.model("slasher_villains", SlasherVillainsSchema)
module.exports = SlasherVillainsModel;
