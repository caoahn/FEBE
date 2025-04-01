import Footer from "../components/Footer";
import ShopSection from "../components/home/ShopSection";
import CalltoActionSection from "../components/home/CalltoActionSection";
import ContactInfo from "../components/home/ContactInfo";
import Header from "../components/Header";
import Banner from "../components/home/Banner";
import HomeProduct from "../components/home/HomeProduct";

function HomePage() {
    return (
        <>
            <Header />
            <Banner />
            <HomeProduct />
            <CalltoActionSection />
            <ContactInfo />
            <Footer />
        </>
    );
}
export default HomePage;