import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [];

  const [notes, setNote] = useState(notesInitial);

  //Get all notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(
      `http://localhost:5000/api/notes/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setNote(json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNote(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(
      `http://localhost:5000/api/notes/deletenote/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
      }
    );
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNote(newNote);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(
      `http://localhost:5000/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = await response.json();
    console.log(json);

    // Update note in client state
    const newNotes = notes.map((note) =>
       note._id === id ? { ...note, title, description, tag } : note ); setNote(newNotes); 
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNote, addNote, editNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
