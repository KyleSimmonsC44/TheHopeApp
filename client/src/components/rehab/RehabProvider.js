import React from "react";
import { useState } from "react";


export const RehabContext = React.createContext();

export const RehabProvider = (props) => {
  const [rehabs, setRehabs] = useState([]);
  const [rehab, setRehab] = useState({})

  const getRehabs = () => {
    return fetch("http://localhost:8000/rehab")
      .then((res) => res.json())
      .then((res) => setRehabs(res))
      .then(console.log(rehabs))
  };

  const getRehabsById = (id) => {
    return fetch(`http://localhost:8000/rehab/${id}`)
      .then((res) => res.json())
      .then((res) => setRehab(res));
  };
  return (
    <RehabContext.Provider
      value={{ rehabs, rehab, setRehab, setRehabs, getRehabs, getRehabsById }}
    >
      {props.children}
    </RehabContext.Provider>
  );
};
