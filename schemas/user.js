const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    guildId: String,
    userId: String,
    xp: Number,
    level: Number,
    valUser: { type: String, required: false },
    valTag: { type: String, required: false },
});

module.exports = model("User", userSchema, "users");