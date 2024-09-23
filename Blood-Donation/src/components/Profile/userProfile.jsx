import React from 'react';
import { useAuth } from '../../store/auth'; // Adjust import path as necessary

const UserProfile = () => {

  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Profile Information</h1>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
      <p><strong>District:</strong> {user.district}</p>
      <p><strong>City:</strong> {user.city}</p>
      <p><strong>Pincode:</strong> {user.pincode}</p>
      <p><strong>Last Donation:</strong> {user.lastDonationMonth} {user.lastDonationYear}</p>
      <p><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</p>
    </div>
  );
};
  

export default UserProfile;
