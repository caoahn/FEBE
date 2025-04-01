import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

const BannerProduct = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0].src);
  const handleSlideChange = (swiper) => {
    setActiveImage(images[swiper.realIndex].src);
  };

  return (
    <section className="relative w-full mx-auto overflow-hidden">
      <div className="flex justify-center w-full mb-2">
        <img
          src={activeImage}
          alt="Active Slide"
          className="w-full h-[400px] object-cover"
        />
      </div>
      <Swiper
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        loop = {true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} onClick={() => setActiveImage(image.src)}>
            <img
              src={image.src}
              alt={image.alt}
              className="w-[500px] h-56 object-cover rounded-sm hover:opacity-80 transition-opacity duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerProduct;
