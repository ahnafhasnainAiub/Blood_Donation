import React from 'react'
import { Link } from 'react-router-dom';
import './../../index.css'

function SendEmail() {
  return (
    <div className="bg-white w-[290px] h-[500px] md:w-[700px] md:h-[564px] flex items-center justify-center mx-auto mt-[40vh] rounded-lg md:mt-[50vh] translate-y-[-50%]">
     
      <div className="flex flex-col">
        
        <div className='text-center font-bold otp-text'>
          <h1>Registration</h1>
        </div>

        <div className="text-normal mt-[26px] mb-[51px] text-center md:text-left">
          <p>An OTP will be sent to your mobile number for verification</p>
        </div>

        
         {/* Registration Email */}
         <div className="">
            <label
              htmlFor="email"
              className=""
            >
             
            </label>
            <div className="mx-3 md:mx-0">
              <input
                type="email"
                id="headOfOrganization"
                className={`mb-4 py-[10px] px-4 rounded-lg w-full border-2 border-black}`}
                placeholder="Name"
                name="email"
                autoComplete="off"
                // value={formValues.email}
                // onChange={handleInputChange}
              />
              
            </div>
         </div>

        <div>
             <p className='lorem-text text-center mx-2 md:mx-0'>Lorem Ipsum is simply dummy printing and typesetting industry</p>
        </div>

        <div className='mt-10 flex align-center justify-center'>
            <Link className='bg-black rounded-xl text-white px-[80px] py-[14px]  history-text font-black'  to={`/verify`}>
                Get OTP
            </Link>
        </div>

      </div>
    
    </div>
  );
}

export default SendEmail
