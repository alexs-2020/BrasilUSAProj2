const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const locationSchema = new Schema(
  {
    title: String,
    img: String,
    location: String
  });

const Location = model("Location", locationSchema);

module.exports = Location;
