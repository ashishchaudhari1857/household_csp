import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const ServicemanDashboard = () => {
  return (
    <div>
      <NavbarStrip role="serviceman" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Serviceman Dashboard</h1>
        {/* Assigned bookings, work status, and wallet summary go here */}
      </div>
    </div>
  );
};

export default ServicemanDashboard;