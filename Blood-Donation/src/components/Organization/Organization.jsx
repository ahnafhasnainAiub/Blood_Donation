import React, { useState } from 'react';
import "../../index.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function Organization() {

  const initialValues = {
    organizationName: "",
    address: "",
    headOfOrganization: "",
    phoneNumber: "",
    password: "",
    email: ""
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const { storeTokenInLS } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: undefined });
  };

  const validate = () => {
    let errors = {};

    if (!formValues.organizationName.trim()) errors.organizationName = "Organization name is required!";
    
    if (!formValues.address.trim()) errors.address = "Address is required!";

    if (!formValues.headOfOrganization.trim()) errors.headOfOrganization = "Head of organization is required!";
    
    if (!formValues.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required!";
    } else {
      const phoneRegex = /^[0-9\b]+$/;
      if (!phoneRegex.test(formValues.phoneNumber)) errors.phoneNumber = "Invalid phone number format!";
    }

    if (!formValues.email.trim()) {
      errors.email = "Email is required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(formValues.email)) errors.email = "Invalid email format!";
    }

    if (!formValues.password.trim()) {
      errors.password = "Password is required!";
    } else if (formValues.password.length < 6) {
      errors.password = "Password must be at least 6 characters long!";
    }


    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(`http://localhost:8000/organization//orgsignup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        const data = await response.json();

        if (data.data) {
          storeTokenInLS(data.token);
          storeTokenInLS(data.data._id, "_id");

          toast.success(data.message, { position: "top-right" });
          setFormValues(initialValues);
          navigate("/find");
        } else {
          console.log("Registration failed", data);
        }
      } catch (error) {
        console.log("register issue", error);
      }
    }
  };

  return (
    <div className="md:mt-10 px-[1rem] md:px-[4rem]">
      <div className="text-center py-[1.2rem] font-medium md:text-start reg-text bg-custom-gradient  md:py-[2.2rem] md:pl-[2.3125rem] text-white">
        Register As Organization
      </div>
      <div>
        <form onSubmit={handleSubmit} className="bg-[#F9F9F9] p-4 ">
          
          {/* Organization Name */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="organizationName"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Organization Name
            </label>
            
            <div className="md:col-span-5">
              <input
                type="text"
                id="organizationName"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.organizationName ? "border-red-400" : "border-[#DADADA]"
                }`}
                placeholder="Name"
                name="organizationName"
                autoComplete="off"
                value={formValues.organizationName}
                onChange={handleInputChange}
              />
              {formErrors.organizationName && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.organizationName}
                </p>
              )}
            </div>
             
        <div className='md:col-span-5'>
          {/* Head of Organization */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="headOfOrganization"
              className="mt-6 md:pr-[26px] md:col-span-4 md:text-right font-normal"
            >
              Head of Organization
            </label>
            <div className="md:col-span-8">
              <input
                type="text"
                id="headOfOrganization"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.headOfOrganization ? "border-red-400" : "border-[#DADADA]"
                }`}
                placeholder="Name"
                name="headOfOrganization"
                autoComplete="off"
                value={formValues.headOfOrganization}
                onChange={handleInputChange}
              />
              {formErrors.headOfOrganization && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.headOfOrganization}
                </p>
              )}
            </div>
          </div>     
            </div>

            

          </div>

          {/* Email */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="email"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Email
            </label>
            <div className="md:col-span-5 md:mr-5">
              <input
                type="email"
                id="email"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.email ? "border-red-400" : "border-[#DADADA]"
                } md:mr-[63px]`}
                placeholder="Email"
                name="email"
                autoComplete="off"
                value={formValues.email}
                onChange={handleInputChange}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.email}
                </p>
              )}
            </div>
            
            <div className='md:col-span-5'>
          {/* Password */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="password"
              className="mt-6 md:pr-[26px] md:col-span-4 md:text-right font-normal"
            >
              Password
            </label>
            <div className="md:col-span-8">
              <input
                type="text"
                id="password"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.password ? "border-red-400" : "border-[#DADADA]"
                }`}
                placeholder="Password"
                name="password"
                autoComplete="off"
                value={formValues.password}
                onChange={handleInputChange}
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.password}
                </p>
              )}
            </div>
          </div>     
            </div>

            
            
          </div>

          

          {/* Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="phoneNumber"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Phone Number
            </label>
            <div className="md:col-span-5">
              <input
                type="text"
                id="phoneNumber"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.phoneNumber ? "border-red-400" : "border-[#DADADA]"
                }`}
                placeholder="Number"
                name="phoneNumber"
                autoComplete="off"
                value={formValues.phoneNumber}
                onChange={handleInputChange}
              />
              {formErrors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.phoneNumber}
                </p>
              )}
            </div>
          </div>

           {/* Organization Address */}
           <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="address"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Address
            </label>
            <div className="md:col-span-5">
              <textarea
                id="address"
                className={`h-[8rem] my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.address ? "border-red-400" : "border-[#DADADA]"
                } md:h-[15.3125rem]`}
                placeholder="Type Here"
                name="address"
                autoComplete="off"
                value={formValues.address}
                onChange={handleInputChange}
              />
              {formErrors.address && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.address}
                </p>
              )}
            </div>
          </div>

          <div className="flex md:flex-row-reverse mt-8 md:mr-[46px] md:mb-[50px]">
            <button className="bg-white group hover:bg-black hover:text-white flex font-normal btn-text px-4 py-3 rounded-lg gap-4">
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
        </form>
      </div>
    </div>
  );
}

export default Organization;
