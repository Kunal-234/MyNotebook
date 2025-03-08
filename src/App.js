import Navbar from "./components/Navbar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Cards from "./components/Cards"

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              key={"home"}
              element={
                <div className="container my-3">
                  <Home />
                </div>
              }
            />
            <Route path="/about" key={"about"} element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
