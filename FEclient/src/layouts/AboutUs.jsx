// src/components/AboutUs.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BannerProduct from '../components/product/BannerProduct';

const AboutUs = () => {
  const images = [
    { src: "/images/bg1.jpg", alt: "g1" },
    { src: "/images/bg2.jpg", alt: "g2" },
    { src: "/images/bg3.png", alt: "g3" },
    { src: "/images/bg4.jpg", alt: "g4" },
    { src: "/images/bg6.jpg", alt: "g6" },
    { src: "/images/bg7.jpg", alt: "g7" },
    { src: "/images/bg8.jpg", alt: "g8" }
  ]
  return (
    <>
      <Header />
      <BannerProduct images={images}/>
      <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="text-center">
          <h2 className="text-4xl mt-10 md:text-5xl font-extrabold text-gray-900 bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
            About Shop Shoe
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-6 font-medium italic">
            Nơi mang đến những đôi giày hoàn hảo cho phong cách của bạn
          </p>
        </div>

        {/* Nội dung */}
        <div className="mt-20 space-y-16">
          {/* Phần 1: Văn bản bên trái - Hình ảnh bên phải */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Chào mừng đến với Shop Shoe
              </h3>
              <p className="mt-4 text-gray-600">
                Shop Shoe được thành lập với niềm đam mê mang đến những đôi giày chất lượng cao, 
                thời thượng và thoải mái nhất cho khách hàng. Chúng tôi tự hào cung cấp đa dạng 
                các mẫu giày từ thể thao, sneaker đến giày công sở, phù hợp với mọi phong cách 
                và nhu cầu.
              </p>
            </div>
            <div className="relative">
              <img
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                src="/images/bg2.jpg"
                alt="Shop Shoe Collection"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
            </div>
          </div>

          {/* Phần 2: Hình ảnh bên trái - Văn bản bên phải */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="relative">
              <img
                className="w-full h-96 object-cover rounded-lg shadow-lg"
                src="/images/bg3.jpg"
                alt="Our Passion for Shoes"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Đam mê và sứ mệnh của chúng tôi
              </h3>
              <p className="mt-4 text-gray-600">
                Tại Shop Shoe, chúng tôi không chỉ bán giày, mà còn lan tỏa niềm đam mê với 
                thời trang và sự thoải mái. Sứ mệnh của chúng tôi là giúp bạn tìm thấy đôi giày 
                lý tưởng, đồng hành cùng bạn trên mọi hành trình, từ những bước đi hàng ngày 
                đến những khoảnh khắc đặc biệt.
              </p>
            </div>
          </div>
        </div>

        {/* Thêm thông tin phụ */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-500">
            Liên hệ với chúng tôi: <span className="font-semibold text-gray-900">contact@shopshoe.com</span>
          </p>
          <p className="mt-2 text-lg text-gray-500">
            Theo dõi chúng tôi trên mạng xã hội để cập nhật những mẫu giày mới nhất!
          </p>
        </div>
      </div>
    </section>
      <Footer />
    </>
  );
};

export default AboutUs;