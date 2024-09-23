import { useState } from "react";
import { Link } from 'react-router-dom';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from '../../store/auth'; 
import "../../index.css";

function Profile() {

  const [date, setDate] = useState(new Date());

  const { user } = useAuth();

  if (!user) {
    return <p>Loading...</p>;
  }

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="md:mt-[50px]  ">
      <div className="mx-6 rounded-lg grid grid-cols-1 md:grid-cols-12 p-5 bg-[#EDEDED] min-h-screen">
        <div className="md:col-span-9 md:mr-5">
          <div className="h-[120px] md:h-[222px] w-full bg-[#FCFCFC] mb-[34px] rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-2">
                <div className="md:h-[162px] md:w-[162px] bg-[#EDEDED] ml-[30px] mt-[22px] rounded-lg">
                  <div className="p-3">hello</div>
                </div>
              </div>

              <div className="container md:col-span-10 p-5 self-end">
                <div className="">
                  <div className="flex justify-between">
                    <div className="name-text ">
                      <p> {user.firstName}{""} {user.lastName}</p>
                    </div>
                    <div className="flex gap-2 ">
                      <img src="/bell.svg" alt="Logo" />
                      <Link className="edit-btn whitespace-nowrap"  to={`/edit`}>
                        Edit Profile
                      </Link>

                     

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="  bg-white rounded-2xl font-normal view-text mt-20 md:mt-1 mb-5">
            <div className="pt-8  don-text sm:text-center md:ml-[350px] mt-5">
              About
            </div>

            <div className="whitespace-nowrap">
              <div class="flex flex-row border-b-2 border-[#E1E1E1] py-[13px]">
                <div class="basis-1/5 text-right">Full Name</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.firstName}{""} {user.lastName}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">Email</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.email}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">District</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.district}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">Phone Number</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.phone}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">Pincode</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.pincode}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">Age</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.age}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">Blood Group</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.bloodGroup}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">Address</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.address}</div>
              </div>

              <div class="flex flex-row py-[13px] border-b-2 border-[#E1E1E1] ">
                <div class="basis-1/5 text-right">Last Donation Date</div>
                <div class="basis-1/10 text-right"></div>
                <div class="basis-7/10">{user.lastDonationMonth} {user.lastDonationYear}</div>
              </div>
            </div>

         
          </div>
        </div>

        <div className="md:col-span-3 md:ml-5">
          <div className=" bg-white   mb-5 pb-7 rounded-2xl">
            <p className="text-center pb-9  pt-8">Donation History</p>
            <div class="flex flex-row py-[13px] px-7 text-[#CBC7C7]">
              <div class="basis-3/5">Date</div>
              <div class="basis-2/5 text-right">Blood Units</div>
            </div>

            <div className="history-text">
              <div class="flex flex-row border-b-2 border-[#E1E1E1] py-[13px] px-7 ">
                <div class="basis-3/5">13 Dec 2020</div>
                <div class="basis-2/5 text-right">120</div>
              </div>

              <div class="flex flex-row border-b-2 border-[#E1E1E1] py-[13px] px-7">
                <div class="basis-3/5">13 Dec 2020</div>
                <div class="basis-2/5 text-right">120</div>
              </div>

              <div class="flex flex-row border-b-2 border-[#E1E1E1] py-[13px] px-7">
                <div class="basis-3/5">13 Dec 2020</div>
                <div class="basis-2/5 text-right">120</div>
              </div>

              <div class="flex flex-row border-b-2 border-[#E1E1E1] py-[13px] px-7">
                <div class="basis-3/5">13 Dec 2020</div>
                <div class="basis-2/5 text-right">120</div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white   rounded-lg ">
            <Calendar
              className="custom-calendar w-full h-full rounded-lg"
              onChange={onChange}
              value={date}
              prevLabel={<button>‹</button>}
              nextLabel={<button>›</button>}
              prev2Label={null}
              next2Label={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
