import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const ServicemanBookings = () => {
  return (
    <div>
      <NavbarStrip role="serviceman" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Assigned Bookings</h1>
        {/* Assigned bookings table goes here */}
      </div>
    </div>
  );
};

export default ServicemanBookings;