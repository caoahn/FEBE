import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaFax } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-row gap-5">
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4 shadow-lg p-16">
            <div>
              <FaPhoneAlt className="text-5xl text-blue-400 border-2 border-blue-500 rounded-full p-2"/>
            </div>
            <h5 className="text-xl font-semibold">Call Us 24x7</h5>
            <p>0000 000 000</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4 shadow-lg p-16">
            <div>
              <FaMapMarkerAlt className="text-5xl text-blue-400 border-2 border-blue-500 rounded-full p-2" />
            </div>
            <h5 className="text-xl font-semibold">Headquarter</h5>
            <p>Ha Noi, Viet Nam</p>
          </div>
        </div>
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4 shadow-lg p-16">
            <div>
              <FaFax className="text-5xl text-blue-400 border-2 border-blue-500 rounded-full p-2" />
            </div>
            <h5 className="text-xl font-semibold">Fax</h5>
            <p>0000 000 000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo;