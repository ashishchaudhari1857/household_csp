import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const AdminEarnings = () => {
  return (
    <div>
      <NavbarStrip role="admin" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Earnings & Commission</h1>
        {/* Earnings and commission management panels go here */}
      </div>
    </div>
  );
};

export default AdminEarnings;