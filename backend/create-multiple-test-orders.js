const axios = require('axios');

// Dynamic test data for multiple users
const testOrders = [
  {
    customer: { name: 'Alice Johnson', phone: '+1-555-111-2222', email: 'alice@example.com' },
    location: '789 Pine Street, Uptown District, Metro City, State 11111',
    date: '2024-12-20',
    timeSlots: ['9:00 AM - 10:00 AM'],
    items: [{ name: 'Electric Repair Service', price: 120, quantity: 1 }],
    serviceCategory: 'Electric Repair',
    subtotal: 120, deliveryFee: 35, platformFee: 10, tax: 21.45, total: 186.45, promoCode: ''
  },
  {
    customer: { name: 'Bob Wilson', phone: '+1-555-333-4444', email: 'bob@example.com' },
    location: '456 Elm Avenue, Downtown, Business District, State 22222',
    date: '2024-12-21',
    timeSlots: ['2:00 PM - 3:00 PM'],
    items: [{ name: 'Mechanic Repair Service', price: 180, quantity: 1 }],
    serviceCategory: 'Mechanic Repair',
    subtotal: 180, deliveryFee: 35, platformFee: 10, tax: 29.25, total: 254.25, promoCode: 'SAVE20'
  },
  {
    customer: { name: 'Carol Davis', phone: '+1-555-555-6666', email: 'carol@example.com' },
    location: '321 Oak Road, Residential Area, Suburb Heights, State 33333',
    date: '2024-12-22',
    timeSlots: ['11:00 AM - 12:00 PM'],
    items: [{ name: 'Electronics Repair Service', price: 95, quantity: 1 }],
    serviceCategory: 'Electronics Repair',
    subtotal: 95, deliveryFee: 35, platformFee: 10, tax: 18.2, total: 158.2, promoCode: ''
  },
  {
    customer: { name: 'David Brown', phone: '+1-555-777-8888', email: 'david@example.com' },
    location: '654 Maple Lane, Garden District, Green Valley, State 44444',
    date: '2024-12-23',
    timeSlots: ['3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM'],
    items: [{ name: 'Plumber Service', price: 160, quantity: 1 }],
    serviceCategory: 'Plumber',
    subtotal: 160, deliveryFee: 35, platformFee: 10, tax: 26.65, total: 231.65, promoCode: 'FIRST10'
  },
  {
    customer: { name: 'Emma Garcia', phone: '+1-555-999-0000', email: 'emma@example.com' },
    location: '987 Cedar Street, Tech Park, Innovation Hub, State 55555',
    date: '2024-12-24',
    timeSlots: ['10:00 AM - 11:00 AM'],
    items: [{ name: 'AC Repair Service', price: 200, quantity: 1 }],
    serviceCategory: 'AC Repair',
    subtotal: 200, deliveryFee: 35, platformFee: 10, tax: 31.85, total: 276.85, promoCode: ''
  }
];

async function createMultipleOrders() {
  console.log('Creating multiple dynamic test orders...');
  
  for (let i = 0; i < testOrders.length; i++) {
    try {
      const response = await axios.post('http://localhost:5003/api/orders', testOrders[i]);
      console.log(`Order ${i + 1} created: ${response.data._id} for ${testOrders[i].customer.name}`);
    } catch (error) {
      console.error(`Failed to create order ${i + 1}:`, error.response?.data || error.message);
    }
  }
  
  console.log('All test orders created successfully!');
}

createMultipleOrders();