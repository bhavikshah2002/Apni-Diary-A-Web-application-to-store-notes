import React,{useContext}  from "react";
import noteContext from '../context/Notes/NoteContext';
import { useAlert } from "react-alert";

function Noteitem(props) {
  const context=useContext(noteContext);
  const { deleteNote }=context;
  const { note,updateNote } = props;
  const Alert=useAlert();
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 my-1 ">
      <div className="card">
        <div className="card-body border border-primary">
          <div className="d-flex align-items-center ">
            <h6 className="card-title">{note.title}</h6>
            
            <i className="fa-solid fa-trash mx-3" onClick={()=>{ deleteNote(note._id);Alert.success("Note Deleted Successfully!") }} ></i>
            <i className="fa-solid fa-pen " onClick={()=>{updateNote(note)}} ></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
