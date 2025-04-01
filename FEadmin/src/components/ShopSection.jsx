import React, { useEffect, useState } from "react";
const ShopSection = () =>  {
  const [sortName] = useState([
    "Latest added",
    "Oldest added",
    "Price: low -> high",
    "Price: hight -> low",
  ]);
  const [selectedSort, setSelectedSort] = useState();
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const categories = [
    {
      _id: "1",
      name: "All",
      description: "All products",
    }, 
    {
      _id: "2",
      name: "Electronics",
      description: "Electronics products",
    },
    {
      _id: "3",
      name: "Clothes",
      description: "Clothes products",
    },
  ]

  const products = [
    {
      _id: "1",
      name: "Iphone 12",
      price: 1000,
      category: "Electronics",
    },
    {
      _id: "2",
      name: "Samsung Galaxy S21",
      price: 900,
      category: "Electronics",
    },
    {
      _id: "3",
      name: "T-shirt",
      price: 10,
      category: "Clothes",
    }
  ]

  return (
    <>
      <div className="container mx-auto">
        <div className="w-full pb-6 pt-2">
          <div className="flex flex-col md:flex-row">
            <div className="w-full">
                <div className="p-5 mb-4 mx-6">
                  <header className="p-3 rounded bg-gradient-to-r from-purple-500 to-orange-500 text-white">
                    <div className="flex flex-wrap gap-x-5 px-5 py-6">
                      <div className="w-full md:w-1/2 lg:w-1/3 py-1">
                        <input 
                        type="search"
                        placeholder="Search..."
                        className="w-full text-gray-800 p-2 border rounded-md placeholder-gray-400 focus:placeholder-opacity-50 focus:outline-none focus:ring-2"
                        // onChange={}
                        />
                      </div>
                      <div className="w-full md:w-1/4 lg:w-1/4 py-1 ml-auto">
                        <select 
                        name="category"
                        className="w-full text-gray-800 p-2 border rounded-md placeholder-gray-400 focus:placeholder-opacity-50 focus:outline-none focus:ring-2"
                        // onChange={}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option value={category._id} key={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="w-full md:w-1/4 lg:w-1/6 py-1">
                        <select 
                        name="sort"
                        className="w-full text-gray-800 p-2 border rounded-md placeholder-gray-400 focus:placeholder-opacity-50 focus:outline-none focus:ring-2"
                        onChange={handleSortChange}
                        >
                          <option value="">Select a sort</option>
                          {sortName.map((name) => (
                            <option value={name} key={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </header>
                </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ShopSection;