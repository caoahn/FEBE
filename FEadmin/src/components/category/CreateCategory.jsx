import React from 'react';
import { FaUpload } from 'react-icons/fa';
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryApi from '../../apis/categoryApi';
import UploadImage from '../../apis/apiUploadImage';
import { useEffect, useState, useRef } from "react";
import { ToastService } from "../../utils/toast";
import { ToastContainer } from 'react-toastify';

const CreateCategory = ({id}) => {

  const queryClient = useQueryClient();
  const [createCategory, setCategory] = useState()
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [display_order, setDisplayOrder] = useState()
  const [images, setImages] = useState([])
  const inputRef = useRef(null);

  const createMutation = useMutation({
    mutationFn: CategoryApi.createCategory,
    onSuccess: () => {
      ToastService.showSuccess("Create category successfully")
      queryClient.invalidateQueries('categories')
      setName('')
      setDescription('')
      setDisplayOrder('')
      setImages([])
    },
    onError: (error) =>  {
      if (error.response) {
        ToastService.showError(error.response.data.message)
      }
    }
  })

  const getCategoryIdMutation = useMutation({
    mutationFn: CategoryApi.getCategoryId,
    onSuccess: (data) => {
      setCategory(data)
      setName(data.name)
      setDescription(data.description)
      setDisplayOrder(data.display_order)
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

  const updateCategoryIdMutation = useMutation({
    mutationFn: CategoryApi.updateCategory,
    onSuccess: () => {
      ToastService.showSuccess("Update category successfully")
      queryClient.invalidateQueries('categories')
    },
    onError: (error) => {
      if (error.response) {
        ToastService.showError(error.response.data.message)
      }
    }
  })

  useEffect(() => {
    if (id) {
      getCategoryIdMutation.mutate(id)
    }
    else {
      setCategory(null)
      setName('')
      setDescription('')
      setDisplayOrder('')
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        const request = {
          name: name,
          description: description,
          display_order: display_order,
          image: images[0]
        }
        updateCategoryIdMutation.mutate({id, request})
      }
      catch (error) {
        alert(error.message)
      }
    }
    else {
      try {
        const request = {
          name: name,
          description: description,
          display_order: display_order,
          image: images[0]
        }
        createMutation.mutate(request)
      }
      catch (error) {
        alert(error.message)
      }
    }
  }


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

 return (
  <>
    <ToastContainer />
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="product_name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          placeholder="Type here"
          id="product_name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          placeholder="Type here"
          rows="4"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Display order</label>
        <input
          type="number"
          placeholder="Type here"
          required
          value={display_order}
          onChange={(e) => setDisplayOrder(e.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* Phần upload ảnh */}
      <div className="w-full">
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

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
      >
        Publish now
      </button>
    </form>
  </>
 )
}

export default CreateCategory;