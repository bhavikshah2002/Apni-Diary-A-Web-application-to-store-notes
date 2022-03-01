import React,{useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {AlertContext} from "../context/Alert/AlertContext";
import AuthContext from "../context/AuthCheck/AuthContext";

function Signup() {
  const context=useContext(AlertContext);
  const {showAlert}=context;
  const context2=useContext(AuthContext);
  const {setAuth}=context2;

    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response= await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name:credentials.name, email:credentials.email , password:credentials.password}),
          });
          const json = await response.json();
          
          if (json.success) {
              //save auth token and redirect
              localStorage.setItem('token',json.authToken);
              showAlert("Sign-Up done successfully!","success");
              setAuth(true)
              navigate(`/`)
          }
          else{
            showAlert("Invalid Credentials!","danger");
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div>

      <h2 className="d-flex justify-content-center">Sign-Up to Apni-Diary</h2>

      <form onSubmit={handleSubmit} >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={ credentials.name }
            onChange={onChange}
            minLength={2} required
          />
          <label htmlFor="name">Name</label>
        </div>
        
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
            minLength={5} required
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            value={ credentials.cpassword }
            onChange={onChange}
            minLength={5} required
          />
          <label htmlFor="cpassword">Confirm Password</label>
        </div>
        <div className="d-flex justify-content-center">
        <button dtype="submit" className="btn btn-primary ">
          Submit
        </button>

        </div>
      </form>
    </div>
  )
}

export default Signup
