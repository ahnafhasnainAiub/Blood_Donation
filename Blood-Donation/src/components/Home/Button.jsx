import React from 'react'
import '../../index.css'

const Button = (props) => {
  return (
    <button className='  border-2 border-black font-[Poppins] py-2 px-[45px] md:px-[75px]  md:ml-8 hover:bg-indigo-400 
    duration-500 nav-text rounded-lg'>
      {props.children}
    </button>
  )
}

export default Button