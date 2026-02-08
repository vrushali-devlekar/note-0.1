import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setnotes] = useState([]);
  console.log("hello");

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setnotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    console.log(title.value, description.value);

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      console.log(res.data);
      fetchNotes();
    });
  }
  function handleUpdate(noteId) {
    const newDescription = prompt("Enter new description ");
    axios
      .patch("http://localhost:3000/api/notes/" + noteId, {
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
    console.log(noteId);
  }
  return (
    <div className="main">
      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>Title : {note.title}</h1>
              <p>{note.description}</p>
              <div className="btn">
                <button
                  onClick={() => {
                    handleDeleteNote(note._id);
                  }}
                  className="delete"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleUpdate(note._id);
                  }}
                  className="update"
                >
                  Update 
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <div className="form-right">
          <input name="title" type="text" placeholder="Enter title" />
          <input
            name="description"
            type="text"
            placeholder="Enter Description"
          />
          <button>Create note</button>
        </div>
      </form>
    </div>
  );
}

export default App;
