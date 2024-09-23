import React from "react";

function GetBlood() {
  return (
    <div className="bg-[#E5E5E5] relative min-h-[61.438rem]">
      <div className=" md:container md:mx-auto md:mt-[90px] ">
        <div className="font-bold mission-text mb-6 ">How to get blood?</div>

        {/* Step -1 */}
        <div className="absolute top-52 left-1/2 -translate-x-1/2">
          <div className="relative w-[26.25rem] h-[23.125]">
            <div className="absolute -top-5 -left-2 bg-white border-4 border-black h-[6rem] w-[6rem] rounded-full text-center cir-text font-bold">
              1
            </div>
            <div className="bg-white border-4 h-[23.120rem] w-[23.120rem] rounded-full flex flex-col items-center justify-center absolute z-10">
              <div>
                <img
                  src={`/pencil.svg`}
                  alt="Get Blood Illustration"
                  className="h-[6.75rem] w-[6.75rem]"
                />
              </div>
              <div className="text-center step-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                enim?
              </div>
            </div>
          </div>
        </div>
        {/* Step -2 */}
        {/* <div className="absolute top-[520px] left-12">
          <div className="relative w-[26.25rem] h-[23.125]">
            <div className="absolute -top-5 -left-2 bg-white border-4 border-black h-[6rem] w-[6rem] rounded-full text-center cir-text font-bold">
              1
            </div>
            <div className="bg-white border-4 h-[23.120rem] w-[23.120rem] rounded-full flex flex-col items-center justify-center absolute z-10">
              <div>
                <img
                  src={`/pencil.svg`}
                  alt="Get Blood Illustration"
                  className="h-[6.75rem] w-[6.75rem]"
                />
              </div>
              <div className="text-center step-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                enim?
              </div>
            </div>
          </div>
        </div> */}
        {/* Step -3 */}
        {/* <div className="absolute top-[520px] right-0">
          <div className="relative w-[26.25rem] h-[23.125]">
            <div className="absolute -top-5 -left-2 bg-white border-4 border-black h-[6rem] w-[6rem] rounded-full text-center cir-text font-bold">
              1
            </div>
            <div className="bg-white border-4 h-[23.120rem] w-[23.120rem] rounded-full flex flex-col items-center justify-center absolute z-10">
              <div>
                <img
                  src={`/pencil.svg`}
                  alt="Get Blood Illustration"
                  className="h-[6.75rem] w-[6.75rem]"
                />
              </div>
              <div className="text-center step-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                enim?
              </div>
            </div>
          </div>
        </div> */}

        {/* Step -2 */}
        <div className="absolute md:top-[540px] ">
          <div className="flex align-center justify-center">
            <div className="relative">
              <div className="absolute -left-7 bg-white border-4 border-black h-[6rem] w-[6rem] rounded-full text-center cir-text font-bold">
                2
              </div>

              <div className=" relative z-10 bg-white border-4 h-[23.120rem] w-[23.120rem] rounded-full flex flex-col items-center justify-center">
                <div>
                  <img
                    src={`/pencil.svg`}
                    alt="Get Blood Illustration"
                    className="h-[6.75rem] w-[6.75rem]"
                  />
                </div>
                <div className="text-center step-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                  enim?
                </div>
              </div>
            </div>

            {/* Heart Shape SVG */}
            <div className="flex justify-center items-center">
              <img
                src={`/heart.svg`}
                alt="Get Blood Illustration"
                className=""
              />
            </div>

            {/* Step -3 */}
            <div className="relative">
              <div className="absolute -left-7 bg-white border-4 border-black h-[6rem] w-[6rem] rounded-full text-center cir-text font-bold">
                3
              </div>

              <div className="relative z-10 bg-white border-4 h-[23.120rem] w-[23.120rem] rounded-full flex flex-col items-center justify-center">
                <div>
                  <img
                    src={`/pencil.svg`}
                    alt="Get Blood Illustration"
                    className="h-[6.75rem] w-[6.75rem]"
                  />
                </div>
                <div className="text-center step-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                  enim?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetBlood;
