import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const placeholderData = [
    {
      id: 1,
      image_url: '/images/p1.jpg',
      title: 'Chào mừng đến với trang web của chúng tôi',
      short_desc: 'Khám phá những điều thú vị tại đây.',
    },
    {
      id: 2,
      image_url: '/images/p1.jpg',
      title: 'Sản phẩm chất lượng cao',
      short_desc: 'Chúng tôi cung cấp những sản phẩm tốt nhất.',
    },
    {
      id: 3,
      image_url: '/images/p1.jpg',
      title: 'Sản phẩm chất lượng cao',
      short_desc: 'Chúng tôi cung cấp những sản phẩm tốt nhất.',
    },
    {
      id: 4,
      image_url: '/images/p1.jpg',
      title: 'Sản phẩm chất lượng cao',
      short_desc: 'Chúng tôi cung cấp những sản phẩm tốt nhất.',
    },
  ];

  return (
    <Swiper
      loop={true}
      spaceBetween={0}
      navigation={true}
      pagination={{ clickable: true, el: ".swiper-pagination" }}
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      className="relative"
    >
      {placeholderData.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative h-full w-full">
            <img
              src={slide.image_url}
              alt={`Slide ${slide.id}`}
              className="h-full w-full object-cover"
              style={{ maxHeight: '500px', minHeight: '400px' }}
            />
            <div className="absolute inset-0 grid h-full w-full items-center bg-black/40">
              <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-52">
                <h1 className="mb-4 text-3xl font-black text-white md:text-4xl lg:text-5xl">
                  {slide.title}
                </h1>
                <p className="mb-12 text-white opacity-80">{slide.short_desc}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination !bottom-4 !flex !justify-center !gap-3 [&>.swiper-pagination-bullet]:!w-4 [&>.swiper-pagination-bullet]:!h-4 [&>.swiper-pagination-bullet]:!bg-white [&>.swiper-pagination-bullet-active]:!bg-gray-900"></div>
    </Swiper>
  );
};

export default Banner;