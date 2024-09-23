import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../store/auth'; // Ensure this path is correct
import toast from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { storeTokenInLS, storeApiPathInLS } = useAuth();

  // Corrected URL to work with either Donor or Organization login
  const URL = "http://localhost:8000/donor/login";

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        console.log('Login successful, data:', data);
        storeTokenInLS(data.token);
        storeTokenInLS(data.data._id, "_id");
        //storeApiPathInLS(data.data.userType); // Store the user type

        toast.success(data.message, { position: "top-right" });
        navigate("/find");
      } else {
        toast.error(data.msg || "Login failed", { position: "top-right" });
      }
    } catch (error) {
      toast.error("An error occurred during login.", { position: "top-right" });
      console.error("Login issue", error);
    }
  };

  return (
    <div className="md:container md:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="mt-5 mr-5 mb-7 ml-5 md:my-[120px] md:mr-6">
          <div className="md:ml-10 bg-slate-200 rounded-lg">
            <div className="text-center font-extrabold text-4xl">
              <h1 className="pt-8">Login Form</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mx-4">
                <div className="flex flex-col md:w-full">
                  <label htmlFor="email" className="mt-4">Enter your Email</label>
                  <input
                    type="email"
                    name="email"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="email"
                    placeholder="Enter Your Email Please"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="flex flex-col md:w-full">
                  <label htmlFor="password" className="mt-4">Enter your Password</label>
                  <input
                    type="password"
                    name="password"
                    className="my-4 py-[10px] px-4 rounded-lg"
                    id="password"
                    placeholder="Enter Your Password Please"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-black text-white rounded-lg py-3 px-4 ml-5 mb-5"
              >
                Login Now
              </button>
            </form>
          </div>
        </div>
        <div className="mx-[20px] mt-[28px] mb-[52px] md:my-[120px] md:ml-6">
          <img src={`/hero.png`} alt="hero Image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
