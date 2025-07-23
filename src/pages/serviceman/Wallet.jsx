import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const ServicemanWallet = () => {
  return (
    <div>
      <NavbarStrip role="serviceman" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Wallet</h1>
        {/* Wallet summary and payout request UI goes here */}
      </div>
    </div>
  );
};

export default ServicemanWallet;