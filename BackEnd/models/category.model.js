const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    display_order: {
      type: Number,
      required: true,
    },
    image: {
      type: mongoose.Schema.Types.Mixed,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;
