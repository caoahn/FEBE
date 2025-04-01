import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-6">
      <div className="flex justify-center items-center space-x-20">
        <div className="w-16">
          <img
            alt="mastercard"
            className="w-full h-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
          />
        </div>
        <div className="w-16">
          <img
            alt="visa"
            className="w-full h-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          />
        </div>
        <div className="w-16">
          <img
            alt="paypal"
            className="w-full h-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntZEg1Wu9nzK4RtZAgnUMSu5WUSo4RP1ykA&s"
          />
        </div>
        <div className="w-16">
          <img
            alt="express"
            className="w-full h-auto"
            src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
          />
        </div>
        <div className="w-16">
          <img
            alt="discover"
            className="w-full h-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfNSiecPZSCHzp5GRp-tc8x_EqTsEa9k3g&s"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
