import React from 'react';
import NavbarStrip from '../../components/common/NavbarStrip';

const CustomerReviews = () => {
  return (
    <div>
      <NavbarStrip role="customer" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
        {/* Customer reviews and ratings UI goes here */}
      </div>
    </div>
  );
};

export default CustomerReviews;