// Test script to create a sample order for testing the WorkersDashboard
require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.MONGO_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected for testing');
  createTestOrder();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

async function createTestOrder() {
  try {
    // Create a test order
    const testOrder = new Order({
      customer: {
        name: 'John Doe',
        phone: '+1-555-123-4567',
        email: 'john.doe@example.com'
      },
      location: '123 Main Street, Downtown, City Center, State 12345',
      date: '2024-01-15',
      timeSlots: ['10:00 AM - 11:00 AM', '2:00 PM - 3:00 PM'],
      items: [
        {
          name: 'AC Repair Service',
          type: 'AC Repair',
          price: 150,
          quantity: 1
        }
      ],
      serviceCategory: 'AC Repair',
      subtotal: 150,
      deliveryFee: 35,
      platformFee: 10,
      tax: 25.35,
      total: 220.35,
      promoCode: 'FIRST10',
      status: 'pending'
    });

    await testOrder.save();
    console.log('Test order created successfully:', testOrder._id);

    // Create another test order with different service
    const testOrder2 = new Order({
      customer: {
        name: 'Jane Smith',
        phone: '+1-555-987-6543',
        email: 'jane.smith@example.com'
      },
      location: '456 Oak Avenue, Residential Area, Suburb, State 67890',
      date: '2024-01-16',
      timeSlots: ['9:00 AM - 10:00 AM'],
      items: [
        {
          name: 'Plumbing Service',
          type: 'Plumber',
          price: 200,
          quantity: 1
        }
      ],
      serviceCategory: 'Plumber',
      subtotal: 200,
      deliveryFee: 35,
      platformFee: 10,
      tax: 31.85,
      total: 276.85,
      promoCode: '',
      status: 'pending'
    });

    await testOrder2.save();
    console.log('Second test order created successfully:', testOrder2._id);

    process.exit(0);
  } catch (error) {
    console.error('Error creating test order:', error);
    process.exit(1);
  }
}