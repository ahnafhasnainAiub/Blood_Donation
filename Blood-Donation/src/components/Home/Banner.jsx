import React from 'react';
import '../../index.css';

function Banner({ name }) {
  return (
    <div className='border-2 w-90 h-40 md:w-[21.3125rem] md:h-[19.75rem] flex items-center justify-center rounded-lg shadow-slate-300 bg-white'>
      <div className='text-slate-500 font-bold text-center col-text'>{name}</div>
    </div>
  );
}

export default Banner;
