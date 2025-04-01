import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn, faYoutube, faPinterestP } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <div className="flex items-center gap-6">
          {[
            {
              alt: 'mastercard',
              src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png',
            },
            {
              alt: 'visa',
              src: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
            },
            {
              alt: 'paypal',
              src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQntZEg1Wu9nzK4RtZAgnUMSu5WUSo4RP1ykA&s',
            },
            {
              alt: 'express',
              src: 'https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png',
            },
            {
              alt: 'discover',
              src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTPfNSiecPZSCHzp5GRp-tc8x_EqTsEa9k3g&s',
            },
          ].map((item, index) => (
            <div key={index} className="w-16">
              <img
                alt={item.alt}
                className="w-full h-auto object-contain"
                src={item.src}
              />
            </div>
          ))}
        </div>

        {/* Biểu tượng mạng xã hội */}
        <div className="flex items-center gap-6">
          {[
            { icon: faFacebookF, link: '#' },
            { icon: faInstagram, link: '#' },
            { icon: faLinkedinIn, link: '#' },
            { icon: faYoutube, link: '#' },
            { icon: faPinterestP, link: 'https://github.com/caoahn' },
          ].map((item, index) => (
            <Link key={index} to={item.link}>
              <FontAwesomeIcon
                icon={item.icon}
                className="text-2xl text-black transition-colors duration-300 hover:text-blue-gray-900"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
