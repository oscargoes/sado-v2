const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    guildId: String,
    userId: String,
    xp: Number,
    level: Number,
});

module.exports = model("User", userSchema, "users");