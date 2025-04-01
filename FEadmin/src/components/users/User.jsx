import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserApi from "../../apis/userApi";
import { ToastService } from "../../utils/toast";
import { ToastContainer } from 'react-toastify'; 

const User = () => {
  const [users, setUsers] = useState([]);

  const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

  const getUsersMuation = useMutation({
    mutationFn: UserApi.getUsers,
    onSuccess: (response) => {
      const users = response.data.filter(user => user.email !== userInfo.email)
      setUsers(users);
    },
    onError: (error) => {

    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: UserApi.deleteUser,
    onSuccess: (response) => {
      ToastService.showSuccess("Delete user successfully")
      getUsersMuation.mutate()
    },
    onError: (error) => {
      ToastService.showError("Delete user failed")
    }
  })

  useEffect(() => {
    getUsersMuation.mutate()
  }, [])

  const handleDeleteUser = (userId) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa user này?");
    if (isConfirmed) {
      deleteUserMutation.mutate(userId);
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Customers</h2>
          <div>
            <Link
              to="/users/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Create new
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-4">
          <header className="p-4 border-b">
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 lg:w-1/3 md:w-1/2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="w-full lg:w-1/6 md:w-1/4">
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Show 20</option>
                  <option>Show 30</option>
                  <option>Show 40</option>
                  <option>Show all</option>
                </select>
              </div>
              <div className="w-full lg:w-1/6 md:w-1/4">
                <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Status: all</option>
                  <option>Active only</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>
          </header>

          {/* Card Body */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {users.map((user) => (
                <div key={user._id} className="col-span-1 relative">
                  {/* Nút X (Delete) */}
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-lg hover:bg-red-700 transition"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    ✕
                  </button>

                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Link to={`/users/create/${user._id}`}>
                      <div className="p-4 flex justify-center bg-gray-50">
                        <img
                          className="w-16 h-16 rounded-full object-cover"
                          src={user.avatar?.url || "/default-avatar.png"}
                          alt="User pic"
                        />
                      </div>
                    </Link>
                    <div className="p-4 text-center">
                      <h5 className="text-lg font-medium mb-2">{user.name}</h5>
                      <div className="text-gray-500">
                        {user.isAdmin ? <p className="m-0">Admin</p> : <p className="m-0">Customer</p>}
                        <p>
                          <a href={`mailto:${user.email}`} className="text-blue-600 hover:underline">
                            {user.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <nav className="flex justify-end mt-4">
              <ul className="flex items-center gap-2">
                <li>
                  <Link to="#" className="px-3 py-1 bg-gray-200 text-gray-500 rounded-md cursor-not-allowed">
                    Previous
                  </Link>
                </li>
                <li>
                  <Link to="#" className="px-3 py-1 bg-blue-600 text-white rounded-md">
                    1
                  </Link>
                </li>
                <li>
                  <Link to="#" className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition">
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default User;