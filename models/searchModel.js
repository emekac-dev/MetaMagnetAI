const { Schema, model } = require("mongoose");

const searchSchema = new Schema(
  {
    topic: {
      type: String,
      required: [true, "A search topic is required."],
    },
    year: {
      type: String, // Store as a range, e.g., "2015-2020"
      required: false,
    },
    field: {
      type: String,
      required: false,
    },
    fromClick: {
      type: Boolean,
      required: false,
      default: false,
    },
    region: {
      type: String,
      required: false,
    },
    activity: {
      type: String,
      required: true,
    },
    responseData: {
      type: Object, // Store the response from SerpApi for future reference
      required: true,
    },
    searchTimestamp: {
      type: Date,
      default: Date.now, // Automatically store the timestamp of the search
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference the User model
      required: [true, "A search must be tied to a user."],
    },
  },
  {
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to Objects
  }
);

const Search = model("Search", searchSchema);

module.exports = Search;
