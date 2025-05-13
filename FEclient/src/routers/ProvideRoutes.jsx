import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";


const Layout = lazy(() => import("../layouts/Layout"));
const HomePage = lazy(() => import("../layouts/HomePage"));
const ErrorPage = lazy(() => import("../components/ErrorPage404"));
const Cart = lazy(() => import("../layouts/Cart"));
const ProfilePage = lazy(() => import("../layouts/ProfilePage"));
const ProductPage = lazy(() => import("../layouts/ProductPage"));
const Login = lazy(() => import("../layouts/Login"));
const Register = lazy(() => import("../layouts/Register"));
const ShippingPage = lazy(() => import("../layouts/ShippingPage"));
const Payment = lazy(() => import("../layouts/Payment"));
const PlaceOrderPage = lazy(() => import("../layouts/PlaceOrderPage"));
const Reset = lazy(() => import("../layouts/ResetPassword"));
const EmailOtpForm = lazy(() => import("../layouts/InputEmail"));
const Product = lazy(() => import("../layouts/Product"))
const Contact = lazy(() => import("../layouts/Contact"));
const AboutUs = lazy(() => import("../layouts/AboutUs"));
const AboutUsPage = lazy(() => import("../layouts/AboutUss"));
const CheckoutPage = lazy(() => import("../layouts/CheckOut"));
import PaymentSuccess from "../components/PaymentSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Layout/>,
    children: [
      { path: "/", element: <HomePage/> },
      { path: "/cart/:id?", element: <Cart/> },
      { path: "/profile", element: <ProfilePage/> },
      { path: "/products/:id", element: <ProductPage/> },
      { path: "product", element: <Product/>},
      { path: "/login", element: <Login/> },
      { path: "/register", element: <Register/> },
      { path: "/shipping", element: <ShippingPage/> },
      { path: "/payment", element: <Payment/> },
      { path: "/placeorder", element: <PlaceOrderPage/> },
      { path: "/forgot-password", element: <EmailOtpForm/> },
      { path: "/reset-password", element: <Reset/> },
      { path: "/contact", element: <Contact/> },
      { path: "/about-us", element: <AboutUs/> },
      { path: "checkout", element: <CheckoutPage/> },
      { path: "/payment-success", element: <PaymentSuccess/> },
      { path: "*", element: <ErrorPage /> },
    ]
  }
])
export default router;