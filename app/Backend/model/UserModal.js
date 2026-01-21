import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    mobile: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: false,
    //   default: null,
    // },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timpestamps: true,
  }
);

export const User = mongoose.model("user", userSchema);
