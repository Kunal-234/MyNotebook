import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function Noteitem(props) {
  
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { updatenote,note} = props;

  return (

      <div className="card my-3 col-md-3 m-2 " style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">
           {note.description}
          </p>
          <i onClick={()=>{updatenote(note)}} className="fa-regular fa-pen-to-square m-2"></i>
          <i onClick={()=>{deleteNote(note._id)}} className="fa-solid fa-trash-can m-2 "></i>
        </div>
      </div>
    
  );
}
