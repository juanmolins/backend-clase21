import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.plugin(passportLocalMongoose);


userSchema.methods.serializeUser = function() {
  return {
    _id: this._id,
    username: this.username,
  };
};

const User = mongoose.model('User', userSchema);

export default User;
