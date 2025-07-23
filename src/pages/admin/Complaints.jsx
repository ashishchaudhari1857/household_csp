import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const AdminComplaints = () => {
  return (
    <div>
      <NavbarStrip role="admin" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Complaints & Disputes</h1>
        {/* Complaints/disputes management table goes here */}
      </div>
    </div>
  );
};

export default AdminComplaints;