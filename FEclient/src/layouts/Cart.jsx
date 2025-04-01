import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import ProductApi from "../apis/productApi";
import { useNavigate } from "react-router-dom";

const Cart = () =>  {
  window.scrollTo(0, 0);
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : [];
    setCartItems(storedCart);
  }, []);

  const fetchProduct = async (id) => {
    try {
      const { data } = await ProductApi.getInfoProduct(id);
      const productWithQty = { ...data, qty };
      setCartItems((prevCartItems) => {
        const updatedCart = updateCartItems(prevCartItems, productWithQty);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      });
      navigate("/cart");
    } catch (error) {
      console.error("Lỗi khi lấy thông tin sản phẩm:", error);
    }
  };

  const updateCartItems = (cart, newItem) => {
    const existItem = cart.find((item) => item._id === newItem._id);
    if (existItem) {
      return cart.map((item) =>
        item._id === newItem._id ? { ...item, qty: item.qty + newItem.qty } : item
      );
    }
    return [...cart, newItem];
  };

  const handleQtyChange = (id, qty) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) =>
        item._id === id ? { ...item, qty: qty } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCartHandler = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, []);

  const total = cartItems.reduce((a, item) => a + item.qty * item.price, 0).toFixed(2);
  
  return (
    <>
      <Header />
      <div className="container mx-auto">
        {cartItems.length === 0 ? (
          <div className="bg-blue-50 text-blue-800 text-center my-2 p-10 rounded-sm">
            Your cart is empty
            <Link 
              to="/"
              className="bg-green-500 text-white px-10 py-4 rounded-md ml-5"
            >SHOPPING NOW
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 text-lg text-green-700 text-center my-2 p-5 rounded-sm">
              Total Cart Products
              <Link className="text-green-800 mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            <div>
            </div>
            {/* Card item */}
            {cartItems &&
              cartItems.map((item,index) => {
                return (
                  <div className="my-10 p-5 flex flex-col md:flex-row bg-white shadow-lg relative gap-4" key={index}>
                    <div className="flex" onClick={() => removeFromCartHandler(item._id)}>
                      <FaTimes className="text-red-500 text-2xl pl-0" />
                    </div>

                    <div className="w-full h-[150px] object-contain md:w-1/4">
                      <img src={item.image.url} alt={item.name} className="w-full h-full object-contain"/>
                    </div>

                    <div className="flex items-center md:w-2/5 mt-[10px] md:mt-0 text-lg font-semibold">
                      <Link to={`/products/${item.product}`}>
                        <h4>
                          {item.name}
                        </h4>
                      </Link>
                    </div>
                    <div className="flex flex-col justify-center mt-3 md:mt-5 sm:w-1/2 md:w-1/6">
                      <h6 className="text-lg font-sans mb-2 text-gray-500 flex justify-start">
                        QUANTITY
                      </h6>
                      <select
                        value={item.qty}
                        onChange={(e) => handleQtyChange(item._id, e.target.value)}
                        className="w-1/2 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mt-3 mx-3 md:mt-0 flex flex-col items-start sm:items-end sm:w-full md:w-1/6 justify-center">
                      <h6 className="text-lg font-semibold mb-2 text-black flex justify-start">
                        PRICE
                      </h6>
                      <h4 className="text-lg font-semibold text-green-700">
                        ${item.price}
                      </h4>
                    </div>
                  </div>
                )
              })
            }

            {/* End of cart item */}
            <div className="mt-[50px] mb-[10px] px-10 flex items-end justify-end">
              <div>
                <span className="text-3xl font-semibold text-gray-800 px-4">
                  Total:
                </span>
                <span className="text-3xl font-semibold text-green-900">
                  {total}$
                </span>
              </div>
            </div>
            <hr className="border border-gray-400"/>
            <div className="flex items-center flex-row justify-center gap-x-16 py-20">
              <Link to="/" className="bg-green-500 text-white px-20 py-4 my-4 w-[350px] flex justify-center">
                <button>
                  Continue To Shopping
                </button>
              </Link>
              {
                2 > 0 && (
                  <div>
                    <button className="bg-blue-500 text-white px-20 py-4 my-4 w-[350px]">
                      Checkout
                    </button>
                  </div>
                )
              }
            </div>
          </>
        )
      }
      </div>
      <Footer />
    </>
  );
}
export default Cart;