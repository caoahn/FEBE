import CreateCategory from "../../components/category/CreateCategory";
import ListCategory from "../../components/category/ListCategory";
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CategoryApi from '../../apis/categoryApi';
import { useEffect, useState } from "react";
import React from 'react';
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();
  return (
    <div>
     <div className="text-3xl text-center font-bold mb-5">Category</div>
     <div className="bg-white p-4 shadow-md rounded-md flex flex-row space-x-2">
      <div className="w-1/3">
        {
          id ? <CreateCategory id={id}/> : <CreateCategory/>
        }
      </div>
      <div className="w-2/3">
        <ListCategory/>
      </div>
    </div>
    </div>
  );
}

export default Category;