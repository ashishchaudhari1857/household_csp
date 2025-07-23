import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const ProviderDashboard = () => {
  return (
    <div>
      <NavbarStrip role="provider" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Provider Dashboard</h1>
        {/* Provider KPIs, servicemen management, and booking panels go here */}
      </div>
    </div>
  );
};

export default ProviderDashboard;