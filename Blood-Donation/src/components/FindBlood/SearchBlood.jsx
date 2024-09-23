import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import '../../index.css';

const districts = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Bandarban"],
  Rajshahi: ["Rajshahi", "Pabna", "Natore"],
  Khulna: ["Khulna", "Jessore", "Satkhira"],
  Barishal: ["Barishal", "Bhola", "Patuakhali"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrakona"]
};

function SearchBlood() {

  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [cities, setCities] = useState([]);
  
  const [results, setResults] = useState([]);

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setCities(districts[district] || []);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleBloodGroupChange = (e) => {
    setSelectedBloodGroup(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/donor/search', {
        params: {
          bloodGroup: selectedBloodGroup,
          district: selectedDistrict,
          city: selectedCity
        }
      });

      setResults(response.data.donors);
    
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  return (
    <div className="md:mt-10 bg-[#F9F9F9]">
      <div className="md:container">
      
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#FCFCFC] h-screen">
            <div className="hidden md:col-span-5 md:block md:bg-cover">
              <img src="/Panel.png" alt="My Photo" />
            </div>

            <div className="md:col-span-7 md:mt-[200px]">
              <div className="recep-text font-medium text-center md:mb-[68px] md:font-bold md:mr-10">
                Recipient Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <label
                  htmlFor="bloodGroup"
                  className="mt-4  md:text-right md:col-span-4 md:mr-[41px] text-gray-700"
                >
                  Blood Group
                </label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  className="my-4 py-[10px] px-4 rounded-lg md:col-span-8 md:mr-[63px] border-2 border-[#DADADA] bg-white text-gray-700"
                  value={selectedBloodGroup}
                  onChange={handleBloodGroupChange}
                >
                  <option value="" disabled>
                    Select Blood Group
                  </option>
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="O-">O-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="flex justify-center md:ml-[300px] md:flex-row-reverse md:mt-[47px] md:mr-[123px]">
                <button
                  type="button"
                  className="bg-black text-white py-2 px-4 md:font-black md:px-[48px] md:py-[20px] rounded-lg don-text md:mr-[63px]"
                >
                  Current Location
                </button>
              </div>

              <div className="text-center my-[30px]">
                <span className="bg-white md:ml-[100px]">OR</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <label
                  htmlFor="district"
                  className="mt-4 md:text-right md:col-span-4 md:mr-[41px] text-gray-700"
                >
                  District
                </label>
                <select
                  id="district"
                  name="district"
                  className="my-4 py-[10px] px-4 rounded-lg md:col-span-8 md:mr-[63px] border-2 border-[#DADADA] bg-white text-gray-700"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                >
                  <option value="" disabled>
                    Select a District
                  </option>
                  {Object.keys(districts).map((district, index) => (
                    <option key={index} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <label
                  htmlFor="city"
                  className="mt-4 md:text-right md:col-span-4 md:mr-[41px] text-gray-700"
                >
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  className="my-4 py-[10px] px-4 rounded-lg md:col-span-8 md:mr-[63px] border-2 border-[#DADADA] bg-white text-gray-700"
                  value={selectedCity}
                  onChange={handleCityChange}
                >
                  <option value="" disabled>
                    Select a City
                  </option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex md:flex-row-reverse mt-8 md:mr-[46px] md:mb-[50px]">
                <button
                  type="submit"
                  className="bg-white group hover:bg-black hover:text-white flex font-normal btn-text px-4 py-3 rounded-lg gap-4"
                >
                  Submit
                  <span className="group-hover:text-white">
                    <svg
                      width="37"
                      height="37"
                      viewBox="0 0 37 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.9166 17.0816V18.5C33.9147 21.8244 32.8382 25.0592 30.8476 27.7219C28.8571 30.3846 26.0591 32.3325 22.8711 33.2751C19.683 34.2177 16.2757 34.1045 13.1572 32.9524C10.0388 31.8003 7.37626 29.671 5.56682 26.8821C3.75737 24.0932 2.89793 20.7941 3.11667 17.4768C3.33541 14.1595 4.62061 11.0018 6.7806 8.47461C8.94059 5.94743 11.8596 4.18617 15.1024 3.45351C18.3451 2.72086 21.7378 3.05606 24.7745 4.40912"
                        stroke="currentColor"
                        strokeWidth="3.08333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M33.9167 6.16669L18.5 21.5988L13.875 16.9738"
                        stroke="currentColor"
                        strokeWidth="3.08333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Display search results */}
        <div className="p-4">
          {results.length > 0 ? (
            <ul>
              {results.map((donor, index) => (
                <li key={index}>
                  <h3>
                    {donor.firstName} {donor.lastName}
                  </h3>
                  <p>Blood Group: {donor.bloodGroup}</p>
                  <p>District: {donor.district}</p>
                  <p>City: {donor.city}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No donors found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBlood;
