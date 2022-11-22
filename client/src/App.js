import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Addpost from "./Pages/AddPost";
import Singlepage from "./Pages/SinglePost";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Addpost />} />
            <Route path="/edit" element={<Addpost />} />
            <Route path="/posts/:id" element={<Singlepage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/edituser" element={<EditUser />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
