import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

const ProductCard = ({product, key, handleDelete}) => {
  const formatPrice = (price) => {
    return price.toLocaleString('vi-VN');
  };

  return (
    <>
      <div className="w-full sm:w-6/12 lg:w-3/12 mb-5 px-2">
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
          <a href="#" className="block">
            <img
              src={product.image?.url}
              alt="Product"
              className="w-full h-60 object-contain hover:opacity-90 transition-opacity"
            />
          </a>
          <div className="p-4">
            <div className='flex flex-col mb-3'>
              <a href="#" className="block text-lg font-semibold text-gray-800 hover:text-blue-600 truncate">
                {product.name}
              </a>
              <div>
                <span className="text-sm text-gray-600">Loại: {product.categoryName ? product.categoryName : product.category}</span>
              </div>
            </div>
            <div className="text-gray-700 text-base font-medium mb-3">
              <span className="text-red-500 font-bold">
                {product.price ? formatPrice(product.price) : 0} đ
              </span>
            </div>
            <div className="flex gap-2">
              <a
                href={`/addproduct/${product._id}`}
                className="flex-1 flex items-center justify-center text-green-600 border border-green-600 rounded-md py-2 px-3 hover:bg-green-50 hover:text-green-700 transition duration-200 text-sm"
              >
                <FaPen className="mr-2" />
                Edit
              </a>
              <a
                href="#"
                onClick={() => handleDelete(product._id)}
                className="flex-1 flex items-center justify-center text-red-600 border border-red-600 rounded-md py-2 px-3 hover:bg-red-50 hover:text-red-700 transition duration-200 text-sm"
              >
                <FaTrashAlt className="mr-2" />
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard;