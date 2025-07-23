import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const ProviderBookings = () => {
  return (
    <div>
      <NavbarStrip role="provider" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
        {/* Bookings management table goes here */}
      </div>
    </div>
  );
};

export default ProviderBookings;