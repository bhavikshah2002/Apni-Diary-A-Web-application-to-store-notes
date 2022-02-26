import React from 'react';
import {Link,useLocation} from "react-router-dom";
import logo from "../images/logo2.PNG";

function NavBar(props) {
  let location =useLocation();
  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.navType} `} style={{backgroundColor: `${props.bgColor}`,color:`${props.textColor}`}} >
  <div className="container-fluid">
  <img src={logo} alt="" width="41" height="45" className="d-inline-block align-text-top mx-4"/>
    <Link className="navbar-brand" to="/">Apni-Diary</Link> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":''}`}  aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":''}`} to="/about">About</Link>
        </li>
      </ul>
      {/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-light" type="submit">Search</button>
      </form> */}
      <Link to='/login' className="btn btn-outline-light mx-1" type='button'>Login</Link>
      <Link to='/signup' className="btn btn-outline-light mx-1" type='button'>Sign-up</Link>
      

    </div>
  </div>
</nav>
  )
}
NavBar.defaultProps = {
  navType: " light ",
  bgColor: "white",
  textColor: "white"
}

export default NavBar
