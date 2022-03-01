import { useState} from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {

  const host = "http://localhost:5000";
  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);
  // geting all notes Note
  const getallNote = async () => {
    //Api call
    const url = `${host}/api/notes/fetchallnotes`;
   
    try {

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token') ,
        }
        
      });
      const json = await response.json();
      
      setNotes(json);
    } catch (error) {
      console.log(error);
    }
  }

  // Add Note
  const addNote = async (title, description, tag) => {
    //Api call
    const url = `${host}/api/notes/addnote`;
     const response= await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note= await response.json();
    setNotes(notes.concat(note));
    
  };


  // Delete Note
  const deleteNote = async (id) => {
    //Api call
    const url = `${host}/api/notes/deletenote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
      
    });
    

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


  // edit Note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const url = `${host}/api/notes/updatenotes/${id}`;
     await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    
    let newNotes=JSON.parse(JSON.stringify(notes))
    //edit function
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getallNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
