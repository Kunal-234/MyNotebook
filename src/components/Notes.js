import React, { useContext, useState, useEffect, useRef } from "react";
import Noteitem from "./Noteitem";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import {  useNavigate } from "react-router-dom";

export default function Notes() {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const ref = useRef(null);
  const closeRef = useRef(null);

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (note.etitle.length >= 3 && note.edescription.length >= 5) {
      editNote(note.id, note.etitle, note.edescription, note.etag);
      closeRef.current.click();
    } else {
      alert(
        "Title must be at least 3 characters and description at least 5 characters long"
      );
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
  else{
    navigate('/login')
  }
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <AddNote />

      <button
        type="button"
        className="btn btn-secondary d-none my-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Description :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    minLength={5}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Tag :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                type="submit"
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <h2>Your notes</h2>
        <div className="mx-3">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updatenote={updatenote} />
          );
        })}
      </div>
    </>
  );
}
