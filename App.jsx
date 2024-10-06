import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./pages/NavBar.jsx";
import HeroBar from "./pages/HeroBar.jsx";
import Questions from "./pages/Questions.jsx";
import CameraThing from "./pages/CameraThing.jsx";
import Search from "./pages/Search.jsx"
import Offer from "./pages/Offer.jsx"

function App() {
  const aboutMeRef = useRef(null); // Create a ref for aboutMeContents
  const location = useLocation(); // Get current route

  const scrollToLearn = () => {
    if (aboutMeRef.current) {
      aboutMeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="h-full">
      <NavBar />

      {location.pathname === '/' && (
        <HeroBar scrollToLearn={scrollToLearn} ref={aboutMeRef} />
      )}

      <Routes>
        <Route path="/" element={<div />} /> {/* Empty div for home route */}
        <Route path="/Questions" element={<Questions />} />
        <Route path="/Imagine" element={<CameraThing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/offer" element={<Offer />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
