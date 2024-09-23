import React from 'react';
import { Link } from 'react-router-dom';
import './../../index.css';

function Successful() {
  return (
    <div className="bg-white w-[280px] h-[500px] md:w-[700px] md:h-[564px] flex items-center justify-center mx-auto mt-[40vh]  md:mt-[50vh]  rounded-lg translate-y-[-50%]">
      <div className="flex flex-col items-center justify-center">
        <div className='bg-white border-2 border-black h-[120px] w-[120px] rounded-full flex items-center justify-center'>
          <img
            src={`/right.svg`}
            alt="Success Illustration"
            className="h-[60px] w-[60px]"
          />
        </div>

        <div className="text-normal mt-[26px] mb-[51px] text-center">
          <p className='font-bold succss-text'>OTP Verification Successful</p>
        </div>
      </div>
    </div>
  );
}

export default Successful;
