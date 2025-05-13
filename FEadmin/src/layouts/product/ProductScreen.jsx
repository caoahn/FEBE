import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/product/ProductCard";
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryApi from "../../apis/categoryApi";
import ProductApi from "../../apis/productApi";
import { ToastContainer } from "react-toastify";
import { ToastService } from "../../utils/toast";
import Pagination from "../../components/Pagination";

const ProuctScreen = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortChoose, setSortChoose] = useState([
    "Latest added",
    "Oldest added", 
    "Price: low -> high",
    "Price: high -> low"
  ]);
  const [selectedSort, setSelectedSort] = useState("");

  const { data: category, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryApi.getAllCategories(),
  })

  const { data: product, isLoading: isLoadingProducts, error: errorProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductApi.getAllProducts(),
  })

  const deleteMutationProduct = useMutation({
    mutationFn: ProductApi.deleteProduct,
    onSuccess: () => {
      ToastService.showSuccess("Delete product successfully")
      queryClient.invalidateQueries('products')
    },
    onError: (error) =>  {
      if (error.response) {
      }
    }
  })

  const getProductByCategoryId = useMutation({
    mutationFn: ProductApi.getProductByCategory,
    onSuccess: (data) => {
      setProducts(data);
    },
    onError: (error) =>  {
      if (error.response) {
      }
    }
  })

  useEffect(() => {
    if(category) {
      const filteredCategories = category.filter(item => item.display_order !== 2)
      setCategories(filteredCategories);
    }
    if(product) {
      setProducts(product);
    }
  }, [category, product])

  const handleDelete = (id) => {
    try {
      deleteMutationProduct.mutate(id);
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleCategoryChange = (id) => {
    const request = {
      categoryId : id
    }
    try {
      getProductByCategoryId.mutate(request);
    }
    catch (error) {
      console.log(error);
    }
  }

  // Sorting function
  const sortProducts = (productsToSort, sortType) => {
    if (!productsToSort) return [];

    switch(sortType) {
      case "Latest added":
        return [...productsToSort].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "Oldest added":
        return [...productsToSort].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "Price: low -> high":
        return [...productsToSort].sort((a, b) => a.price - b.price);
      case "Price: high -> low":
        return [...productsToSort].sort((a, b) => b.price - a.price);
      default:
        return productsToSort;
    }
  }

  // Handle sort change
  const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
  }

  // Apply sorting and filtering
  const filteredAndSortedProducts = useMemo(() => {
    let result = product || [];

    // Filter by category if selected
    if (idCategory) {
      result = result.filter(p => p.category === idCategory);
    }

    // Filter by search
    if (searchProduct) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    // Sort products
    result = sortProducts(result, selectedSort);

    return result;
  }, [product, idCategory, searchProduct, selectedSort]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <ToastContainer />
      <section className="">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Link to="/addproduct" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
          Create new
        </Link>
      </div>

      <div className="bg-white shadow-sm mb-4 border border-gray-300">
        <header className="border-b p-4">
          <div className="flex flex-wrap gap-4">
            {/* Search input */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="search"
                placeholder="Search..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchProduct(e.target.value)}
              />
            </div>

            {/* Category dropdown */}
            <div className="min-w-[150px]">
                <select
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    setIdCategory(e.target.value);
                    handleCategoryChange(e.target.value);
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
            </div>

            {/* Sort dropdown */}
            <div className="min-w-[150px]">
              <select
                name="sort"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Select a sort</option>
                {sortChoose.map((sort) => (
                  <option value={sort} key={sort}>
                    {sort}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="p-4">
          <div className="flex flex-row flex-wrap">
            {filteredAndSortedProducts.length ? (
              currentProducts.map((product) => (
                <ProductCard 
                  product={product} 
                  key={product._id} 
                  handleDelete={handleDelete} 
                />
              ))
            ) : (
              <div className="col-span-full text-center">
                <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg">
                  No product, please create new.
                </div>
              </div>
            )}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={filteredAndSortedProducts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
      </section>
    </>
  )
}

export default ProuctScreen;