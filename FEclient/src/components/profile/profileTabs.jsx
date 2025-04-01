import React, { useState, useEffect } from "react";
import UserApi from "../../apis/userApi";
import { useNavigate } from "react-router-dom";
import { ToastService } from "../../utils/toast";
import { ToastContainer } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UploadImage from "../../apis/apiUploadImage";
import { avatar } from "@material-tailwind/react";

const ProfileTabs = () => {
  const user = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const inputRef = React.createRef();
  const fetchUpdateProfile = async () => {
    if(password !== confirmPassword) {
      ToastService.showError("Password and Confirm Password do not match!");
      return
    }

    try {
      const data = await UserApi.updateProfile({
        name: name,
        email: email,
        password: password,
        avatar: images[0]
      });
      if(data.status === 200){
        ToastService.showSuccess("Update Success!");
        localStorage.setItem("userInfo",JSON.stringify(data.data))
        navigate.reload();
      }
    }
    catch(error) {
      console.error("Lỗi khi cập nhật thông tin cá nhân: ", error);
    }
  }
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
    inputRef.current.value = "";
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    fetchUpdateProfile();
  }

return (
  <>
    <ToastContainer />
    <form className="grid grid-col-1 md:grid-cols-2 gap-4 px-10 py-5" onSubmit={handleUpdateProfile}>
      {/* UserName */}
      <div className="flex flex-col">
        <label htmlFor="account-fn" className="mb-1 text-lg font-semibold">UserName</label>
        <input
          className="border rounded-md px-5 py-4 focus:ring focus:ring-blue-300"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="account-email" className="mb-1 text-lg font-semibold">E-mail Address</label>
        <input
          className="border rounded-md px-5 py-4 focus:ring focus:ring-blue-300"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label htmlFor="account-pass" className="mb-1 text-lg font-semibold">New Password</label>
        <input
          className="border rounded-md px-5 py-4 focus:ring focus:ring-blue-300"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col">
        <label htmlFor="account-confirm-pass" className="mb-1 text-lg font-semibold">Confirm Password</label>
        <input
          className="border rounded-md px-5 py-4 focus:ring focus:ring-blue-300"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {/* Phần upload ảnh */}
      <div className="w-full">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4"> 
              <>
                <div>
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
                </div>
              </>
          </div>
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
        </div>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 mt-10">
        <button
          type="submit"
          className="w-full bg-blue-400 hover:bg-blue-600 text-white font-semibold py-4 px-4 transition"
        >
          Update Profile
        </button>
      </div>
    </form>
  </>
);
}

export default ProfileTabs;