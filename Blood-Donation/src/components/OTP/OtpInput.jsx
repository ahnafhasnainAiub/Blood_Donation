import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({ otpValue = '', onChange }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  useEffect(() => {
    // Initialize OTP values based on prop
    if (otpValue.length === 4) {
      setOtp(otpValue.split(''));
    }
  }, [otpValue]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digit values
    if (/^\d$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Notify parent component about the change
      if (onChange) onChange(newOtp.join(''));

      // Move focus to next input
      if (value && index < 3) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputs.current[index + 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex gap-2">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          maxLength="1"
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputs.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
