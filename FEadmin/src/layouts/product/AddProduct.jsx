import React from "react";
import { FaUpload } from "react-icons/fa";
import CategoryApi from "../../apis/categoryApi";
import { useEffect, useState, useRef } from "react";
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UploadImage from "../../apis/apiUploadImage";
import { ToastService } from "../../utils/toast";
import { ToastContainer } from 'react-toastify';
import ProductApi from "../../apis/productApi";
import { useParams } from "react-router-dom";

export const AddProduct = () => {
  const inputRef = useRef(null);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const queryClient = useQueryClient();
  const {id} = useParams();
  const {isPending, data, error} = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryApi.getAllCategories()
  })

  useEffect(() => {
    if(data) {
      setCategories(data);
    }
  }, [data])

  const createMutationProduct = useMutation({
    mutationFn: ProductApi.createProduct,
    onSuccess: (data) => {
      ToastService.showSuccess("Create product successfully")
      queryClient.invalidateQueries('products')
      setName('')
      setPrice('')
      setCountInStock('')
      setDescription('')
      setCategory('')
      setImages([])
    },
    onError: (error) =>  {
      if (error.response) {
        ToastService.showError(error.response.data.message)
      }
    }
  })

  const getProductIdMutation = useMutation({
    mutationFn: ProductApi.getProductId,
    onSuccess: (data) => {
      console.log(data)
      setName(data.name)
      setPrice(data.price)
      setCountInStock(data.countInStock)
      setDescription(data.description)
      setCategory(data.category)
      if (data.image) {
        setImages([data.image])
      }
      else {
        setImages([])
      }
    },
    onError: (error) => {
      if (error.response) {
      }
    }
  })

  const updateProductIdMutation = useMutation({
    mutationFn: ProductApi.updateProduct,
    onSuccess: () => {
      ToastService.showSuccess("Update product successfully")
      queryClient.invalidateQueries('products')
    },
    onError: (error) => {
      if (error.response) {
        ToastService.showError(error.response.data.message)
      }
    }
  })

  useEffect(() => {
    if(id) {
      getProductIdMutation.mutate(id)
    }
    else {
      setName('')
      setPrice('')
      setCountInStock('')
      setDescription('')
      setCategory('')
      setImages([])
    }
  }, [id])

  const createMutationImage = useMutation({
    mutationFn: UploadImage.uploadImage,
    onSuccess: (data) => {
      ToastService.showSuccess("Upload image successfully")
      setImages((prev) => [...prev, data])
    }
  })

  const deleteMutationImage = useMutation({
    mutationFn: UploadImage.deleteImage,
    onSuccess: () => {
      ToastService.showSuccess("Delete image successfully")
      resetFileInput()
      setImages([])
    }
  })

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file) {
        return alert("File not exist");
      }
      if (file.size > 1024 * 1024) {
        return alert("Size too large");
      }
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return alert("File fotmat is incorrect");
      }
      let formData = new FormData();
      formData.append("file", file);
      createMutationImage.mutate(formData);
    }
    catch (error) {
      alert(error.message);
    }
  }

  const handleDeleteImage = async (image) => {
    try {
      deleteMutationImage.mutate(image.public_id);
    }
    catch (error) {
      alert(error.message);
    }
  }

  const resetFileInput = () => {
    inputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(id) {
      try {
        const request = {
          name: name,
          price: price,
          countInStock: countInStock,
          description: description,
          category: category,
          image: images[0]
        }
        updateProductIdMutation.mutate({id, request})
      }
      catch (error) {
        alert(error.message)
      }
    }
    else {
      try {
        const request = {
          name: name,
          price: price,
          countInStock: countInStock,
          description: description,
          category: category,
          image: images[0]
        }
        createMutationProduct.mutate(request)
      }
      catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <section className="max-w-6xl mx-auto p-5">
        <form className="" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-6">
            <a href="/products" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 mb-4 sm:mb-0">
              Go to products
            </a>
            <h2 className="text-3xl font-semibold text-gray-800 mb-5">Create product</h2>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Publish now
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-2/3">
              <div className="bg-white shadow-md p-6 border border-gray-300">
                {/* {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
                {loading && <div>Loading...</div>}
                */}
                <div className="mb-4">
                  <label htmlFor="product_title" className="block text-gray-700 font-medium mb-1">
                    Product title
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="product_title"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="product_price" className="block text-gray-700 font-medium mb-1">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="product_price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="product_countInStock" className="block text-gray-700 font-medium mb-1">
                    Count In Stock
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="product_countInStock"
                    required
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-1">Description</label>
                  <textarea
                    placeholder="Type here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-y"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-10">
                  <label className="block text-gray-700 font-medium mb-1">Categories</label>
                    <select
                      name="category"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {categories && categories.map((category) => (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                </div>
              </div>
            </div>

            {/* Phần upload ảnh */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4"> 
                    <>
                      <h3 className="mb-5">Image</h3>
                      <label
                        htmlFor="mainImages"
                        className="flex items-center justify-center gap-x-3 w-full text-green-600 border border-green-600 rounded-md py-2 px-4 hover:bg-green-50 cursor-pointer transition duration-200"
                      >
                        Choose Image <FaUpload />
                      </label>
                      <input
                        id="mainImages"
                        type="file"
                        multiple
                        onChange={handleUpload}
                        ref={inputRef}
                        className="hidden"
                      />
                      {images.map((img, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-4 mb-4 mt-5">
                          <img src={img.url} key={idx} alt="uploaded" className="w-28 h-28 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(img)}
                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default AddProduct;