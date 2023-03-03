const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
});

userSchema.set("toJSON", {
  transform: function (doc, retObj) {
    delete retObj.passwordHash;
  }
})

module.exports = mongoose.model("User", userSchema);
