const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  sessions: [
    {
      createdAt: { type: Date, required: true },
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema);