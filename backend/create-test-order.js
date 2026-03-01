const axios = require('axios');

async function createTestOrder() {
  try {
    const testOrder = {
      customer: {
        name: 'John Doe',
        phone: '+1-555-123-4567',
        email: 'john.doe@example.com'
      },
      location: '123 Main Street, Downtown, City Center, State 12345',
      date: '2024-12-15',
      timeSlots: ['10:00 AM - 11:00 AM'],
      items: [{ name: 'AC Repair Service', price: 150, quantity: 1 }],
      serviceCategory: 'AC Repair',
      subtotal: 150,
      deliveryFee: 35,
      platformFee: 10,
      tax: 25.35,
      total: 220.35,
      promoCode: 'FIRST10'
    };

    const response = await axios.post('http://localhost:5003/api/orders', testOrder);
    console.log('Test order created successfully:', response.data._id);
  } catch (error) {
    console.error('Error details:', error.response?.data || error.message);
  }
}

createTestOrder();