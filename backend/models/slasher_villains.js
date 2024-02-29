const mongoose = require('mongoose');

const SlasherVillainsSchema = new mongoose.Schema({
    name: String,
    movies: Array,
    description: String,
    weapons: Array,
    modus_operandi: String,
    motivation_background: String,
    kill_count: Number,
    weakness: String
})

const SlasherVillainsModel = mongoose.model("slasher_villains", SlasherVillainsSchema)
module.exports = SlasherVillainsModel;
