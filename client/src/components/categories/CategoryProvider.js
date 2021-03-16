import React from "react";
import { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    return fetch("http://localhost:8000/categories",{
        headers: {
            Authorization: `Token ${localStorage.getItem("app_user")}`,
          }
    })
      .then((res) => res.json())
      .then((res) => setCategories(res));
  };

  return (
    <CategoryContext.Provider
      value={{ categories, setCategories, getCategories }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
