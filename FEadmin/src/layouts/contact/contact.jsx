import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ContactApi from '../../apis/contactApi';
import { ToastService } from "../../utils/toast";
import { ToastContainer } from 'react-toastify';

const Contact = () => {
  const [contacts, setContacts] = useState()

  const getContactMuatation = useMutation({
    mutationFn: ContactApi.getContact,
    onSuccess: (data) => {
      setContacts(data)
    },
    onError: (error) => {
      console.error('Error getting contact:', error);
    }
  })

  const deleteContactMutation = useMutation({
    mutationFn: ContactApi.deleteContact,
    onSuccess: (data) => {
      ToastService.showSuccess('Xóa thành công')
      getContactMuatation.mutate()
    },
    onError: (error) => {
      console.error('Error deleting contact:', error);
    }
  })

  useEffect(() => {
    getContactMuatation.mutate()
  }, [])

  const handleDelete = (id) => {
    deleteContactMutation.mutate(id)
  };

  return (
    <>
    <ToastContainer />
    <div className="h-auto w-auto flex flex-col p-6">
      <h1 className="text-3xl font-bold text-black mb-6">Contact</h1>
      <div className="flex-1 bg-white  overflow-auto">
        <table className="w-full h-full border-collapse shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Nội dung</th>
              <th className="p-4 text-center font-semibold">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {contacts && contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-800">{contact.name}</td>
                <td className="p-4 text-gray-600">{contact.description}</td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Contact;