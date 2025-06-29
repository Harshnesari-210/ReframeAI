import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    history: [
      {
        prompt: { type: String },
        response: { type: String }, 
      },
    ],
  },
  {
    timestamps: true, 
  }
);



const User = mongoose.model("User", userSchema);

export default User;
