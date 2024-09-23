import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Donars from "./Donars";
import Organizations from "./Organizations";

function ShowAll() {
  let navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(true);

//   const handleButtonClick = (buttonName) => {
//     setActiveButton(buttonName);
//   };

  const activeItem = {
    inactive: "text-[#000] w-[126px] h-[30px]",
    active: "w-[162px] h-full rounded-[30px] bg-black text-white",
  };

  return (
    <div className="bg-[#F9F9F9] ">
      <div className="md:container md:mx-auto ">
        <div className="md:mt-[46px] mx-auto flex items-center justify-between w-fit h-[50px] border border-200 rounded-[30px]">
          <button
            className={`${
              activeButton ? activeItem.active : activeItem.inactive
            }`}
            onClick={() => setActiveButton(true)}
          >
            Blood Donors
          </button>

          <button
            className={`${
              !activeButton ? activeItem.active : activeItem.inactive
            }`}
            onClick={() => setActiveButton(false)}
          >
            Blood Banks
          </button>
        </div>

        {activeButton ? <Donars /> : <Organizations />}
      </div>
    </div>
  );
}

export default ShowAll;
