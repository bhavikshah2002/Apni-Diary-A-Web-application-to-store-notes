import React,{useState,useContext} from "react";
import noteContext from '../context/Notes/NoteContext';
import { AlertContext } from "../context/Alert/AlertContext";

function Addnote() {
    const context=useContext(noteContext);
    const { addNote }=context;
    const context2=useContext(AlertContext);
    const {showAlert}=context2;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        showAlert("Note Added Successfully!","success")
    }
  return (
    <div className="container">
      <h2>Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
            minLength={5} required
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={ onChange }
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={ onChange }
            minLength={2} required
          />
        </div>
         <div className="d-flex justify-content-center">
        <button disabled={note.title.length<3 || note.description.length<5 } type="submit" onClick={handleClick} className="btn btn-primary">
          Add Note
        </button>

         </div>
      </form>
    </div>
  );
}

export default Addnote;
