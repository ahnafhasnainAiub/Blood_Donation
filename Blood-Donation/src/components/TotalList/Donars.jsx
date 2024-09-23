import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonor } from '../../redux/slices/donorSlice';

function Donars() {

    const dispatch = useDispatch();
    const { data: donors, isLoading, isError } = useSelector((state) => state.donor); // Make sure you use the correct state slice name
    
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchDonor());
    }, [dispatch]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading donors.</div>;
    }

    return (
        <div className="md:container">
            <div className="md:mt-10 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-lg py-8 px-8">
                    <div className="md:col-span-9">
                        <div>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, illum?
                        </div>
                        <div>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, ipsa.
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="flex md:flex-row-reverse mt-8 md:mt-0">
                            <button className="bg-[#1BA261] px-6 py-3 rounded-lg text-white">
                                <div className="flex gap-2">
                                    <p className="font-bold">Auto Call</p>
                                    <img src="/call.svg" alt="Logo" />
                                </div>
                            </button>
                        </div>

                        <div className="flex md:flex-row-reverse gap-2 mt-6">
                            <p>Use in case of emergency</p>
                            <img src="/care.svg" alt="Logo" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-12 mt-[34px] border-b-2 border-[#B9B8B8]">
                        <div className="md:col-span-10 mt-10">
                            
                          {donors && donors.length > 0 ? (
                                donors.map((donor, index) => (
                                    <div
                                        key={index}
                                        className="w-full md:pb-[40px] rounded-md px-10 mb-8"
                                    >
                                        <div className="flex gap-2">
                                            <span className="h-2 w-2 bg-black rounded-full mt-4"></span>

                                            <div className="text-2xl md:text-3xl">
                                                <p className=''>{donor.firstName}{" "}{donor.lastName}</p>
                                            </div>
                                        </div>

                                        <p className="text-xl md:text-3xl font-normal don-text text-[#666666] mt-2 ml-4">
                                            Contact Number: {donor.phone}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div>No donors available.</div>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex flex-row-reverse px-8">
                                <button className="bg-white px-6 py-3 rounded-lg text-black font-bold mt-8 border border-b-2 mb-4">
                                    <div className="flex gap-2">
                                        <p>Refresh</p>
                                        <img src="/rotate.svg" alt="Logo" />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                 
                 


                    <div className="w-full my-[20px] px-[20px] border-b-4 border-indigo-500">
                       
                        <div
                            className="flex justify-between mb-10 cursor-pointer"
                            onMouseEnter={toggleDropdown}
                        >
                            <div className="flex gap-2">
                                <img src="/alert.svg" alt="Logo" />
                                <p>
                                    Call Main Coordinator if The Above Contacts Are Not Available
                                </p>
                            </div>
                            <img
                                src="/down.svg"
                                alt="Logo"
                                className={`transform ${
                                    isOpen ? "rotate-180" : "rotate-0"
                                } transition-transform duration-500`}
                            />
                        
                        </div>
                        {/* <div>
                            <img src="https://academie.7uptheme.net/wp-content/uploads/2020/11//h1-vd2-500x350.jpg" alt="banner" />
                        </div> */}
                        
                        <div
                            className={`overflow-hidden transition-max-height duration-500 ease-in ${
                                isOpen ? "max-h-40 pb-5" : "max-h-0"
                            }`}
                        >
                            <div className=''>
                                <div className='font-semibold text-3xl'>Julkarnain Elham</div>
                                <div className='font-normal text-xl text-gray-400 mt-4'> Chandgaon, Chittagong</div>
                                <div className='font-normal text-xl text-gray-400'>Contact Number: 01849617838</div>
                            </div>
                        </div>

            
                    </div>
                     
                     
                    
                </div>
            </div>
        </div>
    );
}

export default Donars;
