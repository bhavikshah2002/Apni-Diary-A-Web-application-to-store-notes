import React,{useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthCheck/AuthContext";
import signupimg from "../images/signup2.PNG"
import "animate.css";
import { useAlert } from "react-alert";

function Signup() {

  const context2=useContext(AuthContext);
  const {setAuth}=context2;
  const [animation,setAnimation]=useState(true);
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})
    let navigate = useNavigate();
    const Alert=useAlert();
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

              Alert.success("Sign-Up done successfully!")
              setAuth(true)
              navigate(`/`)
          }
          else{

            Alert.error("Invalid Credentials!")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <>
      <h1 className="d-flex justify-content-center mb-5 animate__animated animate__backInDown animate__slow "style={{fontFamily:"Bebas Neue",color:"#358297"}} >Sign-Up to Apni-Diary</h1>
      <div className="d-sm-block d-md-flex justify-content-between"> 
      <div className="container">
        <div className=" d-flex justify-content-center ">

              <img src={signupimg} className={`img-thumbnail animate__animated animate__pulse ${setTimeout(()=>setAnimation(!animation),5000)} ${animation?"animate__infinite":""}`} style={{border:'none'}} alt="Cinque Terre"/>
        </div>
      </div>
      <div className="w-75 d-md-inline-block">     
      <form onSubmit={handleSubmit} style={{fontFamily:"Bebas Neue",color:"#358297", fontSize:'20px'}} >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={ credentials.name }
            onChange={onChange}
            minLength={2} required
            style={{fontFamily:"system-ui",color:"rgb(10 76 94)",fontSize:'17px'}}
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
            style={{fontFamily:"system-ui",color:"rgb(10 76 94)",fontSize:'17px'}}
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
            style={{fontFamily:"system-ui",color:"rgb(10 76 94)",fontSize:'17px'}}
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
            style={{fontFamily:"system-ui",color:"rgb(10 76 94)",fontSize:'17px'}}
          />
          <label htmlFor="cpassword">Confirm Password</label>
        </div>
        <div className="d-flex justify-content-center">
        <button dtype="submit" className="btn btn-primary-c ">
          Submit
        </button>

        </div>
      </form>
      </div>
    </div>
    </>
  )
}

export default Signup
