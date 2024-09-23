import React, { useEffect } from 'react';
import '../../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganization } from '../../redux/slices/organizationSlice'; // Adjust the path as needed

function Organizations() {
  const dispatch = useDispatch();
  
  // Accessing the organization data from the Redux store
  const { data: organizations = [], isLoading = false, isError = false } = useSelector((state) => state.organization || {});

  // Fetch organizations when the component mounts
  useEffect(() => {
    dispatch(fetchOrganization());
  }, [dispatch]);

  // Conditional rendering based on loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading organizations.</div>;
  }

  return (
    <div className="">
      <div className="md:my-10 ">
        <div className="">
          {organizations.length > 0 ? (
            organizations.map((organization, index) => (
              <div
                key={index}
                className="w-full bg-white md:mt-[40px] rounded-md px-5 text-xl md:px-10 py-[30px]"
              >
                <div className='md:flex  justify-between'>
                  <div className='mb-3  md:mb-0 font-bold text-xl reg-text'>
                    <p> {organization.organizationName}</p>
                  </div>
                  <div>
                    <button className='bg-black text-white rounded-lg md:font-extrabold md:view-text px-2 md:px-7 py-3 '>
                      View Location
                    </button>
                  </div>
                </div>    

                <p className='mb-5 mt-6 font-normal don-text text-[#666666]'>
                  Location: {organization.address}
                </p>

                <p className='font-normal don-text text-[#666666]'>
                  Contact Number: {organization.phoneNumber}
                </p>
              </div>
            ))
          ) : (
            <div>No organizations available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Organizations;
