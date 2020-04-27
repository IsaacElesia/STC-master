const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'handler'
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
      }
    }
  ],
  customerName: {
    type: String,
    required: true
  },
  orderId: {
    type: String
  },
  cancel: {
    type: Boolean,
    default: false
  },
  orderedDate: {
    type: Date,
    default: Date.now
  },
  deliveredDate: {
    type: Date
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
