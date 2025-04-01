import React from "react";
import { useNavigate } from "react-router-dom";

const CalltoActionSection = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) =>  {
    e.preventDefault();
    navigate("/register");
  }

  return (
    <div className="subscribe-section bg-[linear-gradient(0deg,rgba(0,0,0,0.226),rgba(0,0,0,0.226)),url('https://st3.depositphotos.com/6752174/13086/i/450/depositphotos_130867904-stock-photo-banner-with-two-pairs-of.jpg')] bg-no-repeat bg-center bg-cover py-[100px]">
      <div className="container mx-auto">
        <div className="flex flex-row">
          <div className="w-full">
            <div className="">
              <h2 className="text-white text-[30px] text-center tracking-[0] leading-[30px] mb-[13px] uppercase flex justify-center items-center">
                Do you want to receive sale information?
              </h2>
              <p className="text-white text-center text-lg leading-6 mb-10 flex justify-center items-center pt-2">
                Sign up for free and get the latest sale.
              </p>
              <form className="form-section flex flex-col items-center gap-4 px-4">
                <input
                  placeholder="Your Email..."
                  name="email"
                  type="email"
                  className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  value="Yes. I want!"
                  name="subscribe"
                  className="w-full max-w-md bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 cursor-pointer transition-all"
                  onClick={handleSubmit}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalltoActionSection;