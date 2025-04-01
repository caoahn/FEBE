import React from 'react';
import moment from 'moment';
import { useState, useEffect } from 'react';
import ProfileTabs from '../components/profile/profileTabs';
import Orders from '../components/profile/orders';
import Header from '../components/Header';
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UploadImage from '../apis/apiUploadImage';

const ProfilePage = () =>  {
  const [activeTab, setActiveTab] =  useState("profile");
  const [showNotification, setShowNotification] = useState(false);
  const orders = [
    {
      "shippingAddress": {
          address: "ha noi",
          city: "ha noi",
          postalCode: "10020",
          country: "vietnam"
      },
      _id: "67b5e771b3726c34d8e3736f",
      user: "67b08e408b5f80f9140a6b4e",
      orderItems: [
        {
            name: "qweqe",
            qty: 1,
            image: {
                public_id: "ShoeShop/nngql4zbem4be3mh2uer",
                url: "https://res.cloudinary.com/djrnau5bl/image/upload/v1739625353/ShoeShop/nngql4zbem4be3mh2uer.jpg"
            },
            price: 567,
            product: "67b0938b8b5f80f9140a6ba5",
            _id: "67b5e771b3726c34d8e37370"
        }
      ],
      paymentMethod: "Paypal",
      taxPrice: 56.7,
      shippingPrice: 0,
      totalPrice: 623.7,
      isPaid: false,
      isDelivered: false,
      createdAt: "2025-02-19T14:15:13.225Z",
      updatedAt: "2025-02-19T14:15:13.225Z",
      __v: 0
  }
  ]

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  return (
    <>
      <Header />
      <div className='container mx-auto mt-3 lg:mt-20'>
        <div className='flex flex-row justify-start items-start ml-10'>
          <div className="w-full lg:w-2/5 p-0 m-2 shadow-lg">
            {/* Author Card */}
            <div className="pb-0 md:pb-3 relative">
            <div
              className="w-full h-[150px] bg-cover"
              style={{
                backgroundImage:
                  `url(${userInfo.avatar?.url || "/default-avatar.png"})` || "url(/default-avatar.png)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                // backgroundRepeat: "no-repeat",
              }}
            ></div>
              <div className="flex flex-row items-center p-4">
                <div className="">
                  <img
                    src={userInfo.avatar?.url || "/default-avatar.png"}
                    alt="userprofileimage"
                    className="w-[100px] h-[100px] object-cover rounded-full mt-[-60%] shadow-lg mx-5"
                  />
                </div>
                <div className="ml-4">
                  <h5 className="text-lg font-bold mb-1">{userInfo.name}</h5>
                  <span className="text-sm text-gray-600">
                    Joined {moment(userInfo.createdAt).format("LL")}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="pt-3">
              <div className="flex flex-col">
                {/* Profile Settings */}
                <button
                  className={`w-full py-3 px-4 text-left uppercase border-b border-gray-300 
                    ${activeTab === "profile" ? "bg-green-50 font-bold" : "bg-white"} 
                    hover:bg-green-100 transition`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile Settings
                </button>

                <button
                  className={`w-full py-3 px-4 flex justify-between items-center uppercase border-b border-gray-300 
                    ${activeTab === "orders" ? "bg-green-50 font-bold" : "bg-white"} 
                    hover:bg-green-100 transition`}
                  onClick={() => setActiveTab("orders")}
                >
                  <span>Orders List</span>
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {orders ? orders.length : 0}
                  </span>
                </button>
              </div>
            </div>      
          </div>

          <div className="lg:w-2/3 w-full pb-5 lg:pt-0 pt-3">
          {activeTab === "profile" && <ProfileTabs />}
          {activeTab === "orders" && <Orders orders={orders} />}
        </ div>
        </div>
      </div>
    </>
  );
}
export default ProfilePage;