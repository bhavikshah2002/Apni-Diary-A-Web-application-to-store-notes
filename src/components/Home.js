import React, { useEffect,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Notes from "./Notes";
import AuthContext from "../context/AuthCheck/AuthContext";

function Home() {
  let navigate = useNavigate();
  const context2=useContext(AuthContext);
  const {auth}=context2;
  useEffect(()=>{
    console.log(localStorage.getItem('token'))
    if (!auth) {
      navigate(`/login`);
    }


//eslint-disable-next-line
  },[])

  return (
    <div className="container">
      <Notes />
    </div>
  );
}

export default Home;
