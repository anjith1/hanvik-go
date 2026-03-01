const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // User information
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Not required as guest checkout is allowed
  },
  // User contact information
  contactInfo: {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    }
  },
  // Order details
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'items.itemType'
      },
      itemType: {
        type: String,
        required: true,
        enum: ['Worker']
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      },
      fees: Number
    }
  ],
  // Location, date and time details
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlots: [{
    type: String,
    required: true
  }],
  // Payment details
  subtotal: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  platformFee: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  promoCode: {
    type: String,
    default: ''
  },
  // Payment status
  paymentStatus: {
    type: String,
    enum: ['not_required', 'pending', 'completed', 'failed'],
    default: 'not_required'
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'other'],
    default: 'other'
  },
  // Order status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Don't export the model directly - it will be created in db.js
module.exports = OrderSchema;