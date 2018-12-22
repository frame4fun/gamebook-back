import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  alias: { type: String, required: true },
  stories: [
    {
      progression: { type: String, required: true },
      story: { type: String, ref: 'Story', required: true },
    },
  ],
});

// Duplicate the ID field.
userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true,
});

const Model = mongoose.model('User', userSchema);

export default Model;
