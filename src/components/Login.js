import React,{useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {AlertContext} from "../context/Alert/AlertContext";
import AuthContext from "../context/AuthCheck/AuthContext";
import 'animate.css';
function Login() {

    const context=useContext(AlertContext);
    const {showAlert}=context;
    const context2=useContext(AuthContext);
    const {setAuth}=context2;
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit=async(e)=>{
      localStorage.setItem('token',null)
        e.preventDefault();
        const response= await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email:credentials.email , password:credentials.password}),
          });
          const json = await response.json();
        
          if (json.success) {
              //save auth token and redirect
              showAlert("LogedIn Successfully!","success")
              localStorage.setItem('token',json.authToken)
              setAuth(true);
              navigate(`/`)
          }
          else{
              showAlert("Invalid Details!","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="mt-4 conatiner">
      <h2 className="d-flex justify-content-center">Login to access your Apni-Diary</h2>
      <form onSubmit={handleSubmit} className="form-floating">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={ credentials.email }
            onChange={onChange}
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={ credentials.password }
            onChange={onChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="d-flex align-items-center justify-content-center">

        <button dtype="submit" className="btn btn-primary ">
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
