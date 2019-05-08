import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  chapters: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  author: String,
  pages: { type: Number, required: true },
  dependencies: [
    {
      story: { type: String, ref: 'Story', required: true },
      requiredProgression: { type: Number, required: true },
    },
  ],
});

// Duplicate the ID field.
storySchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
storySchema.set('toJSON', {
  virtuals: true,
});

const Model = mongoose.model('Story', storySchema);

export default Model;
