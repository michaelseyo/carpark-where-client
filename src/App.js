import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./store/State";

import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Error from "./components/pages/Error";
import Search from "./components/pages/Search";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
