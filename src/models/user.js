import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// compare the password for the user
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};


const User = mongoose.model("User", userSchema);

export default User;