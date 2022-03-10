import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/Notes/NoteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";
import { useAlert } from "react-alert";



 function Notes() {
  const context = useContext(noteContext);
  const { notes, getallNote,editNote} = context;


 
   useEffect(() => {
     if( localStorage.getItem('token')!==null){
       getallNote();
     }
    //eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  var updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const Alert =useAlert();
const handleClick=(e)=>{
    
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    Alert.success("Note Updated Successfully!");

    
}

  return (
    <div className="container row my-3">
      <Addnote />
      

      {/* <!-- Button trigger modal --> */}
      <button
        ref={ref}
        type="button "
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form here */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="emailHelp"
                  value={note.etitle}
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
                  id="edescription"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
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
                  id="etag"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                  minLength={2} required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<3 || note.edescription.length<5 } >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="conainer">
        {notes.length === 0 && "No notes to display!" }
      </div>
      { notes.map((notes) => {
        return (
          <Noteitem key={notes._id} note={notes} updateNote={updateNote} />
        );
      })}
    </div>
  );
}

export default Notes;
