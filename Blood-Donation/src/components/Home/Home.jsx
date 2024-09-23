import React from 'react';
import '../../index.css';
import Footer from '../Footer/Footer';
import Collaboration from './Collaboration';
import GetBlood from './GetBlood';
import Mission from './Mission';
import Navbar from './Navbar';                   

function Home() {
  return (
    <div className='bg-tranparent'>
      <div className="w-full md:h-screen relative">
        <div
          className="bg-hero-pattern bg-no-repeat "
          style={{ height: '100%',
            backgroundSize: 'contain' }}
        >
          <Navbar />

          <div className="grid grid-cols-1 md:grid-cols-12  px-4 py-8 md:px-[3.875rem] md:py-16">
            <div className="md:col-span-7"></div>

            <div className="md:col-span-5 flex flex-col justify-center md:mt-[13.0625rem]">
              <div className="text-center md:text-end">
                <div className="font-bold text-2xl md:text-3xl lg:text-4xl mb-4">
                  Save Life Donate <div>Blood</div>
                </div>
                <div className="text-sm md:text-base mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deserunt laudantium nisi assumenda cupiditate, officiis non?
                  Temporibus praesentium quisquam recusandae quibusdam alias
                  voluptatem fuga. Praesentium sequi illo nihil. re recusandae,
                  voluptatem fuga. Praesentium sequi illo nihil. re recusandae,
                  quis, animi nesciunt nostrum blanditiis dolor modi tempore.
                  blanditiis dolor modi  dignissimos nam vitae at placeat impedit nisi velit
                  cupiditate.
                </div>

                <div className="md:mt-[4.5625rem]">
                  <button className="bg-black text-white px-8 py-4 rounded-lg font-black button-text">
                    Get Blood Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Mission />
      <Collaboration />
      <GetBlood />
      <Footer/>
    </div>
  );
}

export default Home;
