const mongoose = require("mongoose");
const validator = require("validator");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  img: {
    type: String,
    trim: true,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("this must be a link");
      }
    },
  },
  categories: {
    type: Array,
    required: true,
  },
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
