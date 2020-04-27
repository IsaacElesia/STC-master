const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  handler: {
    type: Schema.Types.ObjectId,
    ref: 'handler'
  },
  item: {
    type: Schema.Types.ObjectId,
    ref: 'item',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  comments: [
    {
      handler: {
        type: Schema.Types.ObjectId,
        ref: 'handler'
      },
      item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);
