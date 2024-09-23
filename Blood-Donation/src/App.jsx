import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import { AuthProvider } from "./store/auth";

import Home from "./components/Home/Home";
import HomeLayout from "./layouts/HomeLayout";
import Main from "./layouts/Main";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Organization from "./components/Organization/Organization";
import SearchBlood from "./components/FindBlood/SearchBlood";
import ShowAll from "./components/TotalList/ShowAll";
import Donars from "./components/TotalList/Donars";
import Organizations from "./components/TotalList/Organizations";
import Profile from "./components/Profile/Profile";
import Edit from "./components/Profile/Edit";
import SendEmail from "./components/OTP/SendEmail";
import VerifyCode from "./components/OTP/VerifyCode";
import Successful from "./components/OTP/Successful";
import Logout from "./components/Logout/Logout";
import UserProfile from "./components/Profile/userProfile";


function App() {


  return (
    <div>
      <BrowserRouter>
      <AuthProvider>
    
      <Routes>

        <Route path="/" element={<Home />}/>
          
        <Route path="/" element={<Main />}>
          <Route path="registration" element={<Register />} />
          <Route path="login" element={<Login/>} /> 
          <Route path="organization" element={<Organization/>} /> 
          <Route path="find" element={<SearchBlood/>} /> 
          <Route path="list" element={<ShowAll/>} /> 
          <Route path="donor" element={<Donars/>} /> 
          <Route path="org" element={<Organizations/>} /> 
          <Route path="profile" element={<Profile/>} />
          <Route path="/edit" element={<Edit/>} />
          <Route path="/email" element={<SendEmail/>} />
          <Route path="/verify" element={<VerifyCode/>} />
          <Route path="/success" element={<Successful/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/logout" element={<Logout/>} />

          <Route path="/user" element={<UserProfile/>} />

        </Route>

      </Routes>
    
       
      </AuthProvider>
      </BrowserRouter>
    </div>
  //  <div>
  //    <RouterProvider router={router} />
  //  </div>
  )
}

export default App
