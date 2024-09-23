import React from 'react'
import '../../index.css'

function Footer() {
  return (
    <div className="bg-black ">
      <div>
        <div className="md:container md:mx-auto">
          <div className="flex justify-between md:pt-[50px] border-b border-white">
            <div>
              <img
                src={`/blood.svg`}
                alt="Get Blood Illustration"
                className=""
              />
            </div>
            <div className="flex gap-10">
              <p className="text-white rep-text ">Ready to get started?</p>
              <button className="text-black bg-white px-[3.125rem] py-[0.75rem] font-bold don-text rounded-lg md:mb-10">
                Donate
              </button>
            </div>
          </div>

          <div className="md:flex justify-between md:mt-10 text-white">
            
            <div className="md:w-[290px] ">
              
              <div className="font-normal news-text">
                Subscribe to our <div>newsleter</div>
              </div>
              
              <div className="flex justify-between border-b border-white w-100 mt-10">
                <div className="mt-[10px]">Email address</div>
                <div className="bg-pink-200 p-3 rounded-t-lg ">
                  <img
                    src={`/Path.svg`}
                    alt="Get Blood Illustration"
                    className=""
                  />
                </div>
              </div>
            </div>

            <div className="">
              <div className="mb-5 text-[#FFD2DD] footer-text"> Services</div>
              <div className="mb-5 ">Email Marketing</div>
              <div className="mb-5">Cmapaign</div>
              <div className="mb-5">Branding</div>
              <div className="mb-5">Offline</div>
            </div>
            <div className="">
              <div className="mb-5 text-[#FFD2DD] footer-text"> About</div>
              <div className="mb-5 ">Our Story</div>
              <div className="mb-5 ">Benefits</div>
              <div className="mb-5 ">Team</div>
              <div className="mb-5 ">Career</div>
            </div>
            <div>
              <div className="mb-5 text-[#FFD2DD] footer-text">Help</div>
              <div className="mb-5 ">FAQ</div>
              <div className="mb-5 ">Contact Us</div>
            </div>
          </div>

          <div className="flex justify-between md:mt-[4.375rem] md:pb-[6.25rem]"> 
            <div className="text-white flex gap-10">
              <div>Terms & Conditions</div>
              <div>Privacy Policy</div>
            </div>

            <div className="flex gap-10">
              <img
                src={`/facebook.svg`}
                alt="Get Blood Illustration"
                className=""
              />
              <img
                src={`/twitter.svg`}
                alt="Get Blood Illustration"
                className=""
              />
              <img
                src={`/instagram.svg`}
                alt="Get Blood Illustration"
                className=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer