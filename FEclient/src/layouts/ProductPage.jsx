import Rating from "../components/home/Rating"
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductApi from "../apis/productApi";
import { useParams } from "react-router-dom";
import Message from "../components/Message";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();
  const [showNotification, setShowNotification] = useState(false);
  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const fetchProduct = async (id) =>  {
    try {
      const data = await ProductApi.getInfoProduct(id);
      setProduct(data.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const fetchReview= async (id, request) => {
    try {
      const data = await ProductApi.reviewProduct(id, request)
      if(data.data.success){
        alert("Review success")
        setProduct((prev) => ({
          ...prev,
          reviews: data.data.reviews,
          rating: data.data.rating,
        }))
      }
    }
    catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if(id) {
      fetchProduct(id);
    }
  }, [product]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    navigate(`/cart/${product._id}?qty=${qty}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!rating || !comment) {
      alert("Vui lòng chọn rating và nhập bình luận!");
      return;
    }
  
    try {
      await fetchReview(product._id, { rating: Number(rating), comment });
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };
  

  return (
    <>
      <Header />
      {showNotification && (
        <div className="fixed top-8 right-8 bg-green-500 text-white p-4 rounded-lg shadow-lg transition-transform transform translate-x-0">
          Submit successful!
        </div>
      )}
      {product && (
        <div className="container mx-auto my-10 border border-gray-300 rounded-lg">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 p-10">
            <div className="h-[800px] flex items-center justify-center w-full relative overflow-hidden bg-[#f3fbf7]">
              <img src={product.image?.url} alt={product.name} className="max-w-full max-h-full" />
            </div>
          </div>
          
          <div className="w-full md:w-1/3 my-auto mx-auto">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="text-gray-700 text-justify">{product.description}</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <h6 className="text-lg font-medium">Price</h6>
                  <span className="text-lg font-semibold">${product.price}</span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                  <h6 className="text-lg font-medium">Status</h6>
                  <span className={`${product.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                  </span>
                </div>

                <div className="flex justify-between items-center border-b pb-2">
                  <h6 className="text-lg font-medium">Reviews</h6>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </div>

                {product && product.countInStock > 0 && (
                  <>
                    <div className="flex justify-between items-center border-b pb-2">
                      <h6 className="text-lg font-medium">Quantity</h6>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="border p-2 rounded-md"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {
                      userInfo ? (
                        <button
                          onClick={AddToCartHandle}
                          className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                        >
                          Add To Cart
                        </button>
                      ) : (
                        <div className="py-5 flex justify-center items-center">
                          <Link to="/login" className="w-full flex items-center justify-center bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-5 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                            Login to Add To Cart
                          </Link>
                        </div>
                      )
                    }
                  </>
                )}
              </div>
              <div className="pt-20">
                <h6 className="text-lg font-semibold">WRITE A CUSTOMER REVIEW</h6>
                {/* <div className="my-4">
                  {loadingCreateReview && <Loading />}
                  {errorCreateReview && (
                    <Message variant="alert-danger">{errorCreateReview}</Message>
                  )}
                </div> */}
                {userInfo ? (
                  <form onSubmit={handleSubmit}>
                    <div className="my-4">
                      <strong>Rating</strong>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full bg-gray-100 p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-4">
                      <strong>Comment</strong>
                      <textarea
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full bg-gray-100 p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      ></textarea>
                    </div>
                    <div className="my-3">
                      <button
                        // disabled={loadingCreateReview}
                        // onClick={ handleSubmit }
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold border-0 p-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                      >
                        SUBMIT
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3 p-3 bg-yellow-200 text-yellow-900 rounded-md">
                    <Message variant="alert-warning">
                      Please <Link to="/login" className="text-blue-600 font-semibold">Login</Link> to write a review
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex flex-col md:flex-row mb-10 gap-6 mx-10">
          {/* Danh sách đánh giá */}
          <div className="md:w-1/2">
            <h6 className="mb-3 text-lg font-semibold">REVIEWS</h6>
            {product && product.reviews?.length === 0 && (
              <Message variant="alert-info mt-3">No Reviews</Message>
            )}
            {product && product.reviews?.map((review) => (
              <div
                key={review._id}
                className="mb-5 md:mb-3 bg-gray-50 p-4 shadow rounded-md"
              >
                <strong>{review.name}</strong>
                <Rating value={review.rating} />
                <span className="block text-sm text-gray-500 my-2">{moment(review.creareAt).calendar()}</span>
                <div className="mt-3 p-3 bg-blue-50 text-black rounded-md">
                  {review.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
      <Footer />
    </>
  )
}

export default ProductPage