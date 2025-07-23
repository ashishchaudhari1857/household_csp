import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const CustomerWallet = () => {
  return (
    <div>
      <NavbarStrip role="customer" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Wallet</h1>
        {/* Wallet add funds, payment, and cashback/refund UI goes here */}
      </div>
    </div>
  );
};

export default CustomerWallet;