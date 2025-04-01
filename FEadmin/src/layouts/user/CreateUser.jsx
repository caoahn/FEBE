import React from "react";
import { FaUpload } from "react-icons/fa";
import CategoryApi from "../../apis/categoryApi";
import { useEffect, useState, useRef } from "react";
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UploadImage from "../../apis/apiUploadImage";
import { ToastService } from "../../utils/toast";
import { ToastContainer } from 'react-toastify';
import UserApi from "../../apis/userApi";
import { useParams } from "react-router-dom";

export const CreateUser = () => {
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [images, setImages] = useState([]);
  const queryClient = useQueryClient();
  const {id} = useParams();

  const createUserMutation = useMutation({
    mutationFn: UserApi.createUser,
    onSuccess: () => {
      ToastService.showSuccess("Create user successfully")
      queryClient.invalidateQueries("users")
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        ToastService.showError(error.response.data.message || "Có lỗi xảy ra!");
      } else {
        ToastService.showError("Lỗi không xác định. Vui lòng thử lại!");
      }
    },
  })

  const getUserByIdMutation = useMutation({
    mutationFn: UserApi.getUserById,
    onSuccess: (data) => {
      setName(data.data.name)
      setEmail(data.data.email)
      setIsAdmin(data.data.isAdmin)
      if(data.data.avatar){
        setImages([data.data.avatar])
      }
      else {
        setImages([])
      }
    },
    onError: (error) => {

    }
  })

  useEffect(() => {
    if (id) {
      getUserByIdMutation.mutate(id)
    }
    else {
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setIsAdmin(false)
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

  const updateMutionUser = useMutation({
    mutationFn: UserApi.updateUser,
    onSuccess: () => {
      ToastService.showSuccess("Update user successfully")
      queryClient.invalidateQueries("users")
    },
    onError: (error) => {
      if (error.response && error.response.data) {
        ToastService.showError(error.response.data.message || "Có lỗi xảy ra!");
      } else {
        ToastService.showError("Lỗi không xác định. Vui lòng thử lại!");
      }
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
    if(id){
      try {
        if (password !== confirmPassword)  {
          ToastService.showError("Password do not match")
          return;
        }
        const request = {
          name: name,
          email: email,
          password: password,
          isAdmin: isAdmin,
          avatar: images[0]
        }
        updateMutionUser.mutate({id, request});
      }
      catch (error) {
        alert(error.message)
      }
    }
    else {
      try {
        if (password !== confirmPassword)  {
          ToastService.showError("Password do not match")
          return;
        }
        const request = {
          name: name,
          email: email,
          password: password,
          isAdmin: isAdmin,
          avatar: images[0]
        }
        createUserMutation.mutate(request);
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
            <a href="/users" className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 mb-4 sm:mb-0">
              Go to Users
            </a>
            <h2 className="text-3xl font-semibold text-gray-800 mb-5">Create User</h2>
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
                    Name
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
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="product_price"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="product_countInStock" className="block text-gray-700 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="product_countInStock"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="product_countInStock" className="block text-gray-700 font-medium mb-1">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="product_countInStock"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="mb-4 flex flex-row items-center gap-x-2">
                  <label htmlFor="isAdmin" className="block text-gray-700 font-medium mb-1 mt-2">
                    IsAdmin
                  </label>
                  <input
                    type="checkbox"
                    id="isAdmin"
                    className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring focus:ring-blue-500"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                </div>
              </div>
            </div>

            {/* Phần upload ảnh */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4"> 
                    <>
                      <h3 className="mb-5">Avatar</h3>
                      <label
                        htmlFor="mainImages"
                        className="flex items-center justify-center gap-x-3 w-full text-green-600 border border-green-600 rounded-md py-2 px-4 hover:bg-green-50 cursor-pointer transition duration-200"
                      >
                        Choose Avatar <FaUpload />
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
                          <img src={img?.url} key={idx} alt="uploaded" className="w-28 h-28 object-cover rounded" />
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

export default CreateUser;