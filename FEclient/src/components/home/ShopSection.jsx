import React, { use, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { FaSearch, FaHeart } from "react-icons/fa";
import CategoryApi from "../../apis/categoryApi";
import ProductApi from "../../apis/productApi";
import Pagination from "../Pagination";
import { useMutation } from "@tanstack/react-query";

const ShopSection = () =>  {
  const [sortName] = useState([
    "Latest added",
    "Oldest added",
    "Price: low -> high",
    "Price: hight -> low",
  ]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct ] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [originalProduct, setOriginalProduct] = useState([]);
  const [request, setRequest] = useState({categoryId: ""});

  const fetchCategory = async () => {
    try {
      const data = await CategoryApi.getCategoryProduct();
      setCategories(data.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const getMutationProduct = useMutation({
    mutationFn: ProductApi.getPorductByCategoryId,
    onSuccess: (data) => {
      setProduct(data.data);
      setOriginalProduct(data.data);
    },
    onError: (error) => {
      console.error(error);
    }
  })

  // Search
  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue = e.target.value;
    if(searchValue === "") {
      setProduct(originalProduct);
    }
    else {
      const filterProduct = originalProduct.filter((item) => {
        const itemName = item.name.toLowerCase()
                        .trim()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "");
        const normalizeSearch = searchValue.toLowerCase()
                                  .trim()
                                  .normalize("NFD")
                                  .replace(/[\u0300-\u036f]/g, "");
        return itemName.includes(normalizeSearch);
      })
      setProduct(filterProduct);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCategory();
    getMutationProduct.mutate(request);
  },[]);

  const [selectedSort, setSelectedSort] = useState();
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleCategoryChange = (id) => {
    console.log(id);
    setSelectedCategory(id);
    const request = {categoryId: id};
    getMutationProduct.mutate(request);
  }

  // pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product ? product.slice(indexOfFirstProduct, indexOfLastProduct) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-1/6 p-6 border-r border-gray-200 bg-white mt-10">
        <h2 className="text-2xl font-bold mb-6 mt-2 text-orange-500 uppercase tracking-wide ml-6">
          Các sản phẩm
        </h2>
        <nav className="p-4">
          <ul className="space-y-2 w-full max-w-md mx-auto">
            {/* Tab "Tất cả" */}
            <li
              key=""
              className={`cursor-pointer px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold tracking-wide 
                text-gray-600 hover:bg-gray-100 hover:text-gray-900 
                ${selectedCategory === "" 
                  ? "text-gray-900 shadow-sm ring-1 ring-gray-300 bg-gray-100" 
                  : ""
                }`}
              onClick={() => handleCategoryChange("")}
            >
              Tất cả
            </li>

            {/* Danh sách các danh mục */}
            {categories.map((category) => (
              <li
                key={category._id}
                value={category._id}
                className={`cursor-pointer px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold tracking-wide 
                  text-gray-600 hover:bg-gray-100 hover:text-gray-900 
                  ${selectedCategory === category._id 
                    ? " text-gray-900 shadow-sm ring-1 ring-gray-300 bg-gray-100" 
                    : ""
                  }`}
                onClick={() => handleCategoryChange(category._id)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="w-5/6 p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <header className="p-3 rounded bg-white border border-gray-200 shadow-sm">
            <div className="flex items-center gap-x-4 px-4 py-3">
              <div className="w-full md:w-1/3 flex flex-row gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full text-gray-800 p-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={handleSearch}
                />
                <FaSearch size={20} color="gray" className="mt-2" />
              </div>
            </div>
          </header>
        </div>
  
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <div key={item._id} className="relative">
                <div className="p-4 border border-gray-300 rounded-lg shadow-md">
                    <Link to={`/products/${item._id}`}>
                      <div className="transition-transform duration-300">
                        <img src={item.image.url} alt={item.name} className="w-full h-60 object-cover rounded-md" />
                        <h3 className="mt-4 text-xl font-semibold">{item.name}</h3>
                        <Rating value={3} text={`0 review`} />
                        <p className="text-lg text-green-600 font-bold mt-2">{item.price} VND</p>
                      </div>
                    </Link>
                  </div>
              </div>
            ))
          ) : (
            <p className="text-center w-full text-gray-700 col-span-full">No products found.</p>
          )}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={product.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
export default ShopSection;