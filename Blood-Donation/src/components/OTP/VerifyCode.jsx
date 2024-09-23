import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../../index.css'
import OtpInput from './OtpInput';


function VerifyCode() {


  const [otp, setOtp] = useState('');

  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    console.log('New OTP:', newOtp);
  };


  return (
    <div className="bg-white w-[290px] h-[500px] md:w-[700px] md:h-[564px] flex items-center justify-center mx-auto mt-[40vh] rounded-lg md:mt-[50vh] translate-y-[-50%]">
     
      <div className="flex flex-col">
        
        <div className='text-center font-bold otp-text '>
          <h1>OTP Verification</h1>
        </div>

        <div className="text-normal mt-[26px] mb-[21px] text-center">
          <p>An OTP has been sent to</p>
          <p>XXX @ gmail.com</p>
        </div>

         
         {/* <div className='flex align-center justify-center gap-2'>
             <input className='h-[43px] w-[43px] border-2 border-black'/>
             <input className='h-[43px] w-[43px] border-2 border-black'/>
             <input className='h-[43px] w-[43px] border-2 border-black'/>
             <input className='h-[43px] w-[43px] border-2 border-black'/>
         </div> */}
          
    <div className="flex items-center justify-center ">
      <OtpInput otpValue={otp} onChange={handleOtpChange} />
    </div>



        <div>
             <p className='lorem-text text-center mt-4 text-green-400'>180 sec</p>
        </div>

        <div className='mt-10 flex align-center justify-center'>
            <Link className='bg-black rounded-xl text-white px-[80px] py-[14px]  history-text font-black' to={`/success`}>
                Get OTP
            </Link>
        </div>

      </div>
    
    </div>
  );
}

export default VerifyCode
