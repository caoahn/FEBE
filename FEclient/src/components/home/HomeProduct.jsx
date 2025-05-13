import { Button } from "@headlessui/react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState, useEffect } from "react";
import Rating from "./Rating";
import ServiceCard from "./ServiceCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import BenefitCard from "./BenefitCard";
import ProductApi from "../../apis/productApi";


const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    try {
      const response = await ProductApi.getProductAync();
      setProducts(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const fetchService = async () => {
    try {
      const response = await ProductApi.getServiceAsync();
      setServices(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const navigateToProduct = () => {
    navigate('/product')
  }

  const handleNavigate2 = () => {
    navigate('/about-us')
  }

  useEffect(() => {
    fetchProducts();
    fetchService();
  },[])

  const benefits = [ 
    { title: "Giao Hàng Nhanh Chóng", description: "Đảm bảo giao hàng trong vòng 24h tại nội thành." },
    { title: "Đổi Trả Dễ Dàng", description: "Chính sách đổi trả trong vòng 7 ngày nếu sản phẩm lỗi." },
    { title: "Hỗ Trợ 24/7", description: "Đội ngũ tư vấn luôn sẵn sàng hỗ trợ bạn mọi lúc." },
  ];

  return (
    <div className="flex flex-col justify-center">
      <section id="why-choose-us" className="w-full max-w-[1261px] py-20 mx-auto">
      <h2 className="text-4xl mb-10 text-center md:text-5xl font-extrabold text-gray-900 bg-gradient-to-r from-gray-900 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg">
        Shop Shoe
      </h2>
      <p className="text-lg md:text-xl text-center text-gray-700 leading-relaxed px-6 max-w-3xl mx-auto font-medium">
        Chúng tôi không chỉ mang đến các sản phẩm chất lượng mà còn chú trọng đến trải nghiệm khách hàng. Dịch vụ chăm sóc tận tình, giao hàng nhanh chóng và chính sách đổi trả linh hoạt là những gì chúng tôi cam kết.
      </p>
        <div className="flex flex-wrap gap-5 justify-center mt-10">
          {
            benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))
          }
        </div>
        <div className="flex justify-center mt-8">
          <Button onClick={handleNavigate2} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold rounded-full px-10 py-3 shadow-md transition-transform duration-300 hover:scale-105">
            Khám Phá Ngay
          </Button>
        </div>
      </section>
      <section id="about" className="w-full max-w-[1261px] pb-10 mx-auto">
        <h2 className="text-4xl font-extrabold text-sky-700 mb-8 pl-6 decoration-sky-500 decoration-4">
          Service
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed px-6">
          Chào mừng bạn đến với cửa hàng của chúng tôi! Chúng tôi chuyên cung cấp các sản phẩm chất lượng cao với giá cả hợp lý, cam kết mang lại trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
        </p>
        <div className="flex flex-wrap gap-5 justify-center">
          {
           services && services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))
          }
        </div>
      </section>
      
      <section>
      </section>
      {
        products && products.map((product, index) => (
          <section className="w-full max-w-[1261px] mx-auto mb-10">
            <h2 className="text-4xl font-extrabold text-sky-700 mb-8 pl-6">{product.name}</h2>
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
              }}
              modules={[Autoplay, Navigation, Pagination]}
              navigation={{
                nextEl: '.custom-next',
                prevEl: '.custom-prev',
                true : true
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
            >
              {product.products && product.products.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="p-4 border border-gray-300 rounded-lg shadow-md">
                    <Link to={`/products/${item._id}`}>
                      <div className="transition-transform duration-300">
                        <img src={item.image.url} alt={item.name} className="w-full h-60 object-cover rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
                        <Rating value={3} text={`0 review`} />
                        <p className="text-lg text-green-600 font-bold mt-2">
                          {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </p>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>        
              ))}
              <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-white rounded-full shadow-md text-gray-700 text-sm hover:scale-110">◀</button>
              <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 bg-white rounded-full shadow-md text-gray-700 text-sm hover:scale-110">▶</button>
            </Swiper>
            <div className="flex justify-center mt-8">
              <Button onClick={navigateToProduct} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold rounded-full px-10 py-3 shadow-md transition-transform duration-300 hover:scale-105">
                Xem tất cả
              </Button>
            </div>
          </section>
        ))
      }
    </div>
  )
}

export default HomeProduct;