import React, { use } from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryApi from '../../apis/categoryApi';
import { ToastService } from "../../utils/toast";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ListCategory = () => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState();
  const [isEdit, setIsEdit] = useState(true);
  const dropdownRef = useRef(null);
  const [categories, setCategories] = useState([]);

  const queryClient = useQueryClient();
  const {isPending, data, error} = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryApi.getAllCategories()
  })

  const deleteMutation = useMutation({
    mutationFn: CategoryApi.deleteCategory,
    onSuccess: () => {
      ToastService.showSuccess("Delete category successfully");
      queryClient.invalidateQueries('categories');
    },
    onError: (error) => {
      if (error.response) {
        console.error(error.response.data.message);
      }
    }
  })

  const updateMutation = useMutation({
    mutationFn: CategoryApi.updateCategory,
    onSuccess: () => {
      ToastService.showSuccess("Update category successfully");
      queryClient.invalidateQueries('categories');
    },
    onError: (error) => {
      if (error.response) {
        console.error(error.response.data.message);
      }
    }
  })

  useEffect(() => {
    if(data) {
      setCategories(data);
    }
  }, [data])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  }

  const handleEdit = (id) => {
    navigate(`/category/${id}`);
  }

  return (
    <>
      <div className="w-full">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories && categories.map((item) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3 relative">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded  hover:bg-blue-600"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1  rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListCategory;