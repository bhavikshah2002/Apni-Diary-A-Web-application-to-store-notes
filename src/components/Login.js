import React,{useContext, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthCheck/AuthContext";
import 'animate.css';
import loginimg from "../images/login2.PNG"
import { useAlert } from 'react-alert'
function Login() {
  var [animation,setAnimation]=useState(true);
    const context2=useContext(AuthContext);
    const {setAuth}=context2;
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate = useNavigate();
    const Alert=useAlert();
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
              Alert.success("LogedIn Successfully!")
              localStorage.setItem('token',json.authToken)
              setAuth(true);
              navigate(`/`)
          }
          else{
              Alert.error("Invalid Details!")
          }
    }
     const onChange=  (e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="conatiner justify-content-center " style={{marginTop:"7rem"}}  >
      <h1 className="d-flex justify-content-center animate__animated animate__backInDown animate__slow" style={{fontFamily:"Bebas Neue",color:"#358297"}} >Login to access your 'Apni-Diary'</h1>

      <div className="d-sm-block d-md-flex justify-content-around flex-md-row-reverse " style={{marginTop:"25px" }}>
        <div className="container">
          <div className=" d-flex justify-content-center ">

                <img src={loginimg} className={`img-thumbnail animate__animated animate__pulse ${setTimeout(()=>setAnimation(!animation),5000)} ${animation?" animate__infinite":""} w-50`} style={{border:'none'}} alt="Cinque Terre"/>
          </div>
        </div>


        <div className="w-75 d-inline-block align-items-center  m-auto">
        <form onSubmit={handleSubmit} className="form-floating " style={{fontFamily:"Bebas Neue",color:"#358297", fontSize:'20px'}}>
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
              style={{fontFamily:"system-ui",color:"rgb(10 76 94)",fontSize:'17px'}}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="d-flex align-items-center justify-content-center">

          <button dtype="submit" className="btn btn-primary-c "  >
            Submit
          </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
