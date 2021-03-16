import React, { useContext, useEffect } from "react";
import { CategoryContext } from "./CategoryProvider";
import { Link, useHistory } from "react-router-dom";

export const CategoryList = ({ props }) => {
    const { categories, getCategories } = useContext(CategoryContext);
  
    const history = useHistory()
    useEffect(() => {
      getCategories();
    }, []);
    console.log(categories);
    return (
      <>
      <h3>What community would you like to join today?</h3>
      <div className="categoryFlex">
        {categories ? categories.map((c) => {
          return (
            <button key={c.id} onClick={()=>{localStorage.setItem("categoryId", `${c.id}`); history.push("/")}}>
              {c.label}
            </button>
          )
        } ) : <></>}
      </div>
    </>
  );
};