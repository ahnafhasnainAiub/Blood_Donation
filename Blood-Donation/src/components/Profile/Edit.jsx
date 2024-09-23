import { useState } from 'react';
import '../../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../store/auth'; 
import { useNavigate} from 'react-router-dom';

import toast from "react-hot-toast";

const districts = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Bandarban"],
  Khulna: ["Khulna", "Jessore", "Satkhira"],
  Rajshahi: ["Rajshahi", "Pabna", "Natore"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj"]
};

function Edit() {

  

  const { user,  storeTokenInLS } = useAuth();

  console.log(user);

  if (!user) {
    return <p>Loading...</p>;
  }

  const [formValues, setFormValues] = useState(user);
  const [formErrors, setFormErrors] = useState({});
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "age" && (value < 1 || isNaN(value))) {
      setFormErrors({ ...formErrors, age: "Age must be at least 1!" });
    } else {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
    setFormValues({ ...formValues, [name]: value });
  };

  
  const handleDistrictChange = (e) => {
    const { name, value } = e.target; // Fix the destructuring
    setFormValues({ ...formValues, [name]: value, city: '' });
    setCities(districts[value] || []);
  };
  


  const validate = () => {
    let errors = {};
    if (!formValues.firstName.trim()) errors.firstName = "First name is required!";

    if (!formValues.lastName.trim()) errors.lastName = "Last name is required!";
    
    if (!formValues.phone.trim()) errors.phone = "Phone number is required!";
    
    if (!formValues.email.trim()) {
      errors.email = "Email is required!";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(formValues.email)) errors.email = "Invalid email format!";
    }
    
    if (!formValues.address.trim()) errors.address = "Address is required!";
    
    if (!formValues.age) {
      errors.age = "Age is required!";
    } else if (formValues.age < 1) {
      errors.age = "Age must be at least 1!";
    }
    
    if (!formValues.bloodGroup.trim()) errors.bloodGroup = "Blood group is required!";
    
    if (!formValues.district.trim()) errors.district = "District is required!";
    
    if (!formValues.city.trim()) errors.city = "City is required!";
    
    if (!formValues.pincode.trim()) errors.pincode = "Pin code is required!";
    
    if (!formValues.lastDonationMonth.trim()) errors.lastDonationMonth = "Last donation month is required!";
    
    if (!formValues.lastDonationYear.trim()) errors.lastDonationYear = "Last donation year is required!";
    
    if (!formValues.termsAccepted) errors.termsAccepted = "You must accept the terms!";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  const userId = user._id;

          
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   if (validate()) {
  //     try {
  //       const response = await fetch(`http://localhost:8000/donor/update`, {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formValues),
  //       });
  
  //       const data = await response.json();
  //         toast.success(data.message, { position: "top-right" });
  //         setFormValues(user); // Reset the form after a successful update
  //         navigate("/profile"); // Redirect to the profile page or other suitable page

  
  //       // if (response.ok) {
  //       //   // Profile update success
  //       //   toast.success(data.message, { position: "top-right" });
  //       //   setFormValues(user); // Reset the form after a successful update
  //       //   navigate("/profile"); // Redirect to the profile page or other suitable page
  //       // } else {

  //       //   console.log("Profile update failed", data.message);
  //       //   toast.error(data.message, { position: "top-right" });
  //       // }
  //     } catch (error) {
  //       console.log("Profile update issue", error);
  //       toast.error("Server error, please try again later", { position: "top-right" });
  //     }
  //   }
  // };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
    
  //   if (!validate()) {
  //     return; // Don't submit if there are validation errors
  //   }
    
  //   try {
  //     const response = await fetch(`http://localhost:8000/donor/update`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formValues),
  //     });
      
  //     const data = await response.json();

  //     console.log(data);


  //       toast.success(data.message, { position: "top-right" });
  //       setFormValues(initialValues);
  //       navigate("/profile");
  
      
  //     // if (data.data) {
  //     //   storeTokenInLS(data.token);
  //     //   storeTokenInLS(data.data._id, "_id");

  //     //   toast.success(data.message, { position: "top-right" });
  //     //   setFormValues(initialValues);
  //     //   navigate("/profile");
  //     // } else {
  //     //   console.log("Registration failed", data);
  //     // }


  //     // toast.success(data.message, { position: "top-right" });
  //     // setFormValues(user);
  //     // navigate("/profile");
  //   } catch (error) {
  //     toast.error("Server error, please try again later", { position: "top-right" });
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation before submission
    if (!validate()) {
      return; // Don't submit if validation fails
    }

    try {
      const response = await fetch(`http://localhost:8000/donor/update/${userId}`, {
        method: "PATCH", // Changed from PUT to PATCH
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues), // formValues should contain the updated donor data
      });

      // Parse the response
      const data = await response.json();

      // Handle success case
      if (response.ok) {
        toast.success(data.message, { position: "top-right" });

        // Reset form to initial values
        setFormValues(data);

        // Navigate to the profile page after update
        navigate("/profile");

      
      } else {
        // Handle error response (e.g., validation failed or donor not found)
        toast.error(data.message || "Failed to update profile", { position: "top-right" });
      }
    } catch (error) {
      // Handle server or network error
      toast.error("Server error, please try again later", { position: "top-right" });
    }
  };
  


  return (
    <div className="md:mt-10 px-[1rem] md:px-[4rem]">
      <div className="text-center md:text-start reg-text bg-custom-gradient font-medium lg:py-[2.3rem] lg:pl-[2.3125rem] text-white">
        Edit Profile
      </div>
      <div>
        <form onSubmit={handleSubmit} className="bg-[#F9F9F9] p-4">
          {/* Donor Name */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="firstName"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Full Name
            </label>

            <div className="md:col-span-5 md:mr-5">
              <input
                type="text"
                id="firstName"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.firstName ? "border-red-400" : "border-[#DADADA]"
                } md:mr-[95px]`}
                placeholder="First Name"
                name="firstName"
                autoComplete="off"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.firstName}
                </p>
              )}
            </div>

            <div className="md:col-span-5 md:ml-5 md:mr-[63px]">
              <input
                type="text"
                id="lastName"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.lastName ? "border-red-400" : "border-[#DADADA]"
                } md:mr-[63px]`}
                placeholder="Last Name"
                name="lastName"
                autoComplete="off"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="phone"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Phone Number
            </label>
            <div className="md:col-span-10 md:mr-[63px]">
              <input
                type="text"
                id="phone"
                className={`my-4 py-[10px] px-4 rounded-lg w-full  border-2 ${
                  formErrors.phone ? "border-red-400" : "border-[#DADADA]"
                } md:mr-[63px] `}
                placeholder="Phone Number"
                name="phone"
                autoComplete="off"
                value={formValues.phone}
                onChange={handleInputChange}
              />
              {formErrors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.phone}
                </p>
              )}
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
            <div className="md:col-span-10 md:mr-[63px]">
              <input
                type="text"
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
          </div>

          {/* Address */}
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
                className={`my-4 py-[10px] px-4 md:h-[152px] rounded-lg w-full border-2 ${
                  formErrors.address ? "border-red-400" : "border-[#DADADA]"
                }`}
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

            <div className="md:col-span-5">
              <div className="flex flex-col">
                {/* Age */}
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <label
                    htmlFor="age"
                    className="mt-6 md:mr-[41px] md:col-span-4 md:text-right font-normal"
                  >
                    Age
                  </label>
                  <div className="md:col-span-8 md:mr-[63px]">
                    <input
                      type="number"
                      id="age"
                      className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                        formErrors.age ? "border-red-400" : "border-[#DADADA]"
                      } md:mr-[63px]`}
                      placeholder="Age"
                      name="age"
                      autoComplete="off"
                      value={formValues.age}
                      onChange={handleInputChange}
                    />
                    {formErrors.age && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <FontAwesomeIcon
                          icon={faExclamationTriangle}
                          className="text-red-500 mr-1"
                        />
                        {formErrors.age}
                      </p>
                    )}
                  </div>
                </div>

                {/* Blood Group */}
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <label
                    htmlFor="bloodGroup"
                    className="mt-6 md:pr-[26px] md:col-span-4 md:text-right font-normal"
                  >
                    Blood Group
                  </label>
                  <div className="md:col-span-8 md:mr-[63px]">
                    <select
                      id="bloodGroup"
                      className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                        formErrors.bloodGroup
                          ? "border-red-400"
                          : "border-[#DADADA]"
                      } md:mr-[63px]`}
                      name="bloodGroup"
                      autoComplete="off"
                      value={formValues.bloodGroup}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled></option>
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="A-">A-</option>
                      <option value="O-">O-</option>
                      <option value="B-">B-</option>
                      <option value="AB-">AB-</option>
                    </select>
                    {formErrors.bloodGroup && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <FontAwesomeIcon
                          icon={faExclamationTriangle}
                          className="text-red-500 mr-1"
                        />
                        {formErrors.bloodGroup}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* District */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="district"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              District
            </label>
            <div className="md:col-span-5">
              <select
                id="district"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.district ? "border-red-400" : "border-[#DADADA]"
                } md:mr-[63px]`}
                name="district"
                value={formValues.district}
                onChange={handleDistrictChange}
              >
                <option value="">Select District</option>
                {Object.keys(districts).map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {formErrors.district && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.district}
                </p>
              )}
            </div>

            {/* City */}
            <div className="md:col-span-5 md:mr-[63px]">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <label
                  htmlFor="city"
                  className="mt-6 md:pr-[26px] md:col-span-4 md:text-right font-normal"
                >
                  City
                </label>
                <div className="md:col-span-8">
         
                  <select
                    id="city"
                    className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                      formErrors.city ? "border-red-400" : "border-[#DADADA]"
                    }`}
                    name="city"
                    value={formValues.city}
                    onChange={handleInputChange}
                  >
                    <option value="">Select City</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>

                  {formErrors.city && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className="text-red-500 mr-1"
                      />
                      {formErrors.city}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Pin Code */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="pincode"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Pin Code
            </label>
            <div className="md:col-span-5">
              <input
                type="text"
                id="pincode"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.pincode ? "border-red-400" : "border-[#DADADA]"
                } md:mr-[63px]`}
                placeholder="Pin Code"
                name="pincode"
                autoComplete="off"
                value={formValues.pincode}
                onChange={handleInputChange}
              />
              {formErrors.pincode && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.pincode}
                </p>
              )}
            </div>
          </div>

          {/* Last Donation Month */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            <label
              htmlFor="lastDonationMonth"
              className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
            >
              Last Donation
            </label>
            <div className="md:col-span-5">
              <input
                type="text"
                id="lastDonationMonth"
                className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                  formErrors.lastDonationMonth
                    ? "border-red-400"
                    : "border-[#DADADA]"
                } md:mr-[63px]`}
                placeholder="Month"
                name="lastDonationMonth"
                autoComplete="off"
                value={formValues.lastDonationMonth}
                onChange={handleInputChange}
              />
              {formErrors.lastDonationMonth && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.lastDonationMonth}
                </p>
              )}
            </div>

            {/* Last Donation Year */}
            <div className="md:col-span-5 md:mr-[63px]">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <label
                  htmlFor="lastDonationYear"
                  className="mt-6 md:pr-[26px] md:col-span-2 md:text-right font-normal"
                ></label>
                <div className="md:col-span-10">
                  <input
                    type="text"
                    id="lastDonationYear"
                    className={`my-4 py-[10px] px-4 rounded-lg w-full border-2 ${
                      formErrors.lastDonationYear
                        ? "border-red-400"
                        : "border-[#DADADA]"
                    } md:mr-[63px]`}
                    placeholder="Year"
                    name="lastDonationYear"
                    autoComplete="off"
                    value={formValues.lastDonationYear}
                    onChange={handleInputChange}
                  />
                  {formErrors.lastDonationYear && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className="text-red-500 mr-1"
                      />
                      {formErrors.lastDonationYear}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          {/* <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-2"></div>
            <div className="md:col-span-10">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  name="termsAccepted"
                  checked={formValues.termsAccepted}
                  onChange={(e) =>
                    setFormValues({
                      ...formValues,
                      termsAccepted: e.target.checked,
                    })
                  }
                />
                <span className="ml-2">
                  I agree to the terms and conditions
                </span>
              </label>
              {formErrors.termsAccepted && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className="text-red-500 mr-1"
                  />
                  {formErrors.termsAccepted}
                </p>
              )}
            </div>
          </div> */}

          {/* <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded mt-6"
            >
              Submit
            </button>
          </div> */}

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
};

export default Edit;
