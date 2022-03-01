import React,{useContext} from "react";
import { AlertContext } from "../context/Alert/AlertContext";
import 'animate.css';
function Alert() {
  const context=useContext(AlertContext);
  const {alert}=context;
  return (
    <div style={{height: '40px'}} className="">
    
    {alert &&  <div className={`alert alert-${alert.type} d-flex align-items-center animate__animated animate__backOutLeft animate__delay-2s`} role="alert">
    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"></svg>
    <div>
    <strong>{alert.msg}</strong>
    </div>
    </div>}
  </div>
  );
}

export default Alert;
