import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const CustomerBookings = () => {
  return (
    <div>
      <NavbarStrip role="customer" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
        {/* Customer bookings table goes here */}
      </div>
    </div>
  );
};

export default CustomerBookings;