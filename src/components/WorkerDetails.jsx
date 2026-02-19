// WorkerDetails.jsx — Direct booking flow (no Cart, no Stripe)
import React, { useContext, useState } from 'react';
import './WorkerDetails.css';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const TIME_SLOTS = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
];

const today = new Date().toISOString().split('T')[0];

const WorkerDetails = ({ workers }) => {
  const { authToken, currentUser, isAuthenticated } = useContext(AuthContext);

  // Per-worker booking state: { [workerId]: { open, form, loading, success, error } }
  const [bookingState, setBookingState] = useState({});

  if (!workers || workers.length === 0) {
    return <p>No workers available in this category.</p>;
  }

  const getState = (id) =>
    bookingState[id] || {
      open: false,
      form: {
        fullName: currentUser?.username || '',
        mobileNumber: '',
        email: currentUser?.email || '',
        selectedDate: '',
        selectedTimeSlot: TIME_SLOTS[0],
        location: '',
      },
      loading: false,
      success: false,
      error: '',
    };

  const setState = (id, patch) =>
    setBookingState((prev) => ({
      ...prev,
      [id]: { ...getState(id), ...patch },
    }));

  const setForm = (id, patch) =>
    setState(id, { form: { ...getState(id).form, ...patch } });

  const toggleBooking = (id) => {
    const s = getState(id);
    setState(id, { open: !s.open, success: false, error: '' });
  };

  const handleConfirm = async (worker) => {
    if (!isAuthenticated) {
      setState(worker._id, { error: 'Please log in to book a worker.' });
      return;
    }
    const s = getState(worker._id);
    const { fullName, mobileNumber, email, selectedDate, selectedTimeSlot, location } = s.form;
    if (!fullName || !mobileNumber || !email || !selectedDate || !location) {
      setState(worker._id, { error: 'Please fill in all fields.' });
      return;
    }
    setState(worker._id, { loading: true, error: '' });
    try {
      await axios.post(
        'http://localhost:5003/api/orders/direct',
        {
          workerId: worker._id,
          workerName: worker.fullName,
          workerCostPerHour: worker.costPerHour || 1000,
          selectedDate,
          selectedTimeSlot,
          location,
          contactInfo: { fullName, mobileNumber, email },
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      setState(worker._id, { loading: false, success: true });
    } catch (err) {
      const msg = err.response?.data?.error || 'Booking failed. Please try again.';
      setState(worker._id, { loading: false, error: msg });
    }
  };

  // Helper: buffer → base64 image URL
  const bufferToImageUrl = (profileData) => {
    try {
      if (!profileData || !profileData.data) return null;
      if (typeof profileData.data === 'string') {
        return `data:${profileData.contentType || 'image/jpeg'};base64,${profileData.data}`;
      }
      let base64String;
      if (profileData.data.data) {
        base64String = Buffer.from(profileData.data.data).toString('base64');
      } else if (Array.isArray(profileData.data)) {
        base64String = Buffer.from(profileData.data).toString('base64');
      } else {
        return null;
      }
      return `data:${profileData.contentType || 'image/jpeg'};base64,${base64String}`;
    } catch {
      return null;
    }
  };

  const getWorkerRole = (workerTypes) => {
    if (!workerTypes) return 'Service Provider';
    const roles = [];
    if (workerTypes.acRepair) roles.push('AC Repair Technician');
    if (workerTypes.mechanicRepair) roles.push('Mechanic');
    if (workerTypes.electricalRepair) roles.push('Electrician');
    if (workerTypes.electronicRepair) roles.push('Electronics Repair Technician');
    if (workerTypes.plumber) roles.push('Plumber');
    if (workerTypes.packersMovers) roles.push('Packers & Movers');
    return roles.length > 0 ? roles.join(', ') : 'Service Provider';
  };

  return (
    <div className="workers-grid">
      {workers.map((worker, index) => {
        const id = worker._id || index;
        const s = getState(id);
        const imageUrl = worker.profilePhoto ? bufferToImageUrl(worker.profilePhoto) : null;

        return (
          <div key={id} className="worker-card">
            {/* Card Header */}
            <div className="worker-header">
              <div className="worker-photo">
                {imageUrl ? (
                  <img src={imageUrl} alt={worker.fullName} />
                ) : (
                  <div className="placeholder-photo">
                    {worker.fullName ? worker.fullName.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
              </div>
              <div className="worker-basic-info">
                <h3 className="worker-name">{worker.fullName}</h3>
                <div className="worker-role">{getWorkerRole(worker.workerTypes)}</div>
                <div className="worker-rating">
                  <span className="stars">★★★★☆</span>
                  <span className="rating-value">4.0</span>
                </div>
              </div>
            </div>

            {/* Worker Details */}
            <div className="worker-details">
              <div className="detail-item">
                <span className="detail-label">Contact:</span>
                <span className="detail-value">{worker.phoneNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{worker.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{worker.city}, {worker.state}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{worker.address}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Age:</span>
                <span className="detail-value">{worker.age}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gender:</span>
                <span className="detail-value">{worker.gender}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Cost per hour:</span>
                <span className="detail-value">
                  {worker.costPerHour ? `₹${worker.costPerHour}` : 'Not specified'}
                </span>
              </div>
              <div className="detail-item service-schedule">
                <span className="detail-label">Availability:</span>
                <span className="detail-value">Mon-Sat, 9 AM - 6 PM</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="worker-actions">
              <button
                className="action-btn book-btn"
                onClick={() => toggleBooking(id)}
              >
                {s.open ? 'Cancel' : 'Book Now'}
              </button>
              <button className="action-btn contact-btn">Contact</button>
            </div>

            {/* Inline Booking Panel */}
            {s.open && (
              <div className="booking-panel">
                {s.success ? (
                  <div className="booking-success">
                    ✅ Booking confirmed! The worker will contact you soon.
                  </div>
                ) : (
                  <>
                    <h4 className="booking-panel-title">Book {worker.fullName}</h4>

                    <div className="booking-field">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={s.form.fullName}
                        onChange={(e) => setForm(id, { fullName: e.target.value })}
                      />
                    </div>

                    <div className="booking-field">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={s.form.mobileNumber}
                        onChange={(e) => setForm(id, { mobileNumber: e.target.value })}
                      />
                    </div>

                    <div className="booking-field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={s.form.email}
                        onChange={(e) => setForm(id, { email: e.target.value })}
                      />
                    </div>

                    <div className="booking-field">
                      <label>Service Date</label>
                      <input
                        type="date"
                        min={today}
                        value={s.form.selectedDate}
                        onChange={(e) => setForm(id, { selectedDate: e.target.value })}
                      />
                    </div>

                    <div className="booking-field">
                      <label>Time Slot</label>
                      <select
                        value={s.form.selectedTimeSlot}
                        onChange={(e) => setForm(id, { selectedTimeSlot: e.target.value })}
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>

                    <div className="booking-field">
                      <label>Your Location / Address</label>
                      <input
                        type="text"
                        placeholder="e.g. 123 Main St, Chennai"
                        value={s.form.location}
                        onChange={(e) => setForm(id, { location: e.target.value })}
                      />
                    </div>

                    {s.error && <div className="booking-error">{s.error}</div>}

                    <button
                      className="action-btn confirm-booking-btn"
                      onClick={() => handleConfirm(worker)}
                      disabled={s.loading}
                    >
                      {s.loading ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WorkerDetails;
