import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const CustomerDashboard = () => {
  return (
    <div>
      <NavbarStrip role="customer" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>
        {/* Bookings, wallet, and review panels go here */}
      </div>
    </div>
  );
};

export default CustomerDashboard;