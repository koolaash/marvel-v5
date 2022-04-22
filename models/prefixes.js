const mongoose = require("mongoose"),
    prefixSchema = new mongoose.Schema({
        Prefix: String,
        GuildID: String,
    }),
    prefixModel = module.exports = mongoose.model("prefix", prefixSchema)