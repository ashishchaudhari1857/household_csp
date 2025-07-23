import React from 'react';
import { Link } from 'react-router-dom';

const NavbarStrip = ({ role }) => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="font-bold text-lg">Household Services</div>
      <div className="space-x-4">
        {role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/bookings">Bookings</Link>
            <Link to="/admin/complaints">Complaints</Link>
            <Link to="/admin/earnings">Earnings</Link>
            <Link to="/admin/settings">Settings</Link>
          </>
        )}
        {role === 'provider' && (
          <>
            <Link to="/provider/dashboard">Dashboard</Link>
            <Link to="/provider/servicemen">Servicemen</Link>
            <Link to="/provider/bookings">Bookings</Link>
            <Link to="/provider/payouts">Payouts</Link>
          </>
        )}
        {role === 'serviceman' && (
          <>
            <Link to="/serviceman/dashboard">Dashboard</Link>
            <Link to="/serviceman/bookings">Bookings</Link>
            <Link to="/serviceman/wallet">Wallet</Link>
          </>
        )}
        {role === 'customer' && (
          <>
            <Link to="/customer/dashboard">Dashboard</Link>
            <Link to="/customer/bookings">Bookings</Link>
            <Link to="/customer/wallet">Wallet</Link>
            <Link to="/customer/reviews">Reviews</Link>
          </>
        )}
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
};

export default NavbarStrip;