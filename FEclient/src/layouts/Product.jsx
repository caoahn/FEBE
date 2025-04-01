import Footer from "../components/Footer";
import ShopSection from "../components/home/ShopSection";
import CalltoActionSection from "../components/home/CalltoActionSection";
import ContactInfo from "../components/home/ContactInfo";
import Header from "../components/Header";
import Banner from "../components/home/Banner";
import BannerProduct from "../components/product/BannerProduct";

function Product() {
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
            <ShopSection/>
            <CalltoActionSection />
            {/* <ContactInfo /> */}
            <Footer />
        </>
    );
}
export default Product;