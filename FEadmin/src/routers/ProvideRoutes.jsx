import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Layout = lazy(() => import("../layouts/Layout"));
const HomePage = lazy(() => import("../layouts/HomePage"));
const ProductScreen = lazy(() => import("../layouts/product/ProductScreen"));
const AddProduct = lazy(() => import("../layouts/product/AddProduct"));
const ErrorPage = lazy(() => import("../components/ErrorPage404"));;
const Category = lazy(() => import("../layouts/category/category"));
const UserMain = lazy(() => import("../layouts/user/user-main"));
const Login = lazy(() => import("../components/Login"));
const CreateUser = lazy(() => import("../layouts/user/CreateUser"));
const Contact = lazy(() => import("../layouts/contact/contact"));
import ProtectedRoute from "../components/Protected";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/",
    element:  <ProtectedRoute><Layout/></ProtectedRoute>,
    children: [
      { path: "/", element: <HomePage/> },
      { path: "/products", element: <ProductScreen /> },
      { path: "/addproduct/:id?", element: <AddProduct /> },
      { path: "/category/:id?", element: <Category /> },
      { path: "/users", element: <UserMain /> },
      { path: "/users/create/:id?", element: <CreateUser /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <ErrorPage /> },
    ]
  }
])
export default router;