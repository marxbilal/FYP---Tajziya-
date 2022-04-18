import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  username: {
    type: String,
    require: true,
    maxlength: 100,
    unique: true,
  },
});

export default mongoose.model("User", userSchema);
