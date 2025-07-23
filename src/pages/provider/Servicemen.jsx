import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const ProviderServicemen = () => {
  return (
    <div>
      <NavbarStrip role="provider" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Servicemen</h1>
        {/* Servicemen management table goes here */}
      </div>
    </div>
  );
};

export default ProviderServicemen;