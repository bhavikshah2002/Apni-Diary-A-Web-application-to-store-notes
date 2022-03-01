import React,{useContext}  from "react";
import noteContext from '../context/Notes/NoteContext';
import { AlertContext } from "../context/Alert/AlertContext";

function Noteitem(props) {
  const context=useContext(noteContext);
  const { deleteNote }=context;
  const { note,updateNote } = props;
  const context2=useContext(AlertContext);
    const {showAlert}=context2;
 
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 my-1 ">
      <div className="card">
        <div className="card-body border border-primary">
          <div className="d-flex align-items-center ">
            <h6 className="card-title">{note.title}</h6>
            
            <i className="fa-solid fa-trash mx-3" onClick={()=>{ deleteNote(note._id);showAlert("Note Deleted Successfully!","success") }} ></i>
            <i className="fa-solid fa-pen " onClick={()=>{updateNote(note)}} ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
