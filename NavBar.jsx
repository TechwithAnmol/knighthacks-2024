import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './NavBar.css';

function NavBar() {
    const navigate = useNavigate();
    return(
    <nav className="bar">
        <img className="appIcon" src="./public/appIcon.png" alt="App Icon" />
        <h1 className="appName">
          <a onClick={() => navigate("/")} rel="noopener noreferrer">SPRINTSCOUT</a>
        </h1> 
        
        <div className="rbar pr-5">
            <h1 id="tryMe" type="button" onClick={() => {navigate("/Questions");}} className="flex items-center cursor-pointer">DISCOVER</h1>
            <h1 id="tryMe" type="button" onClick={() => {navigate("/Imagine");}} className="flex items-center cursor-pointer">IMAGINE</h1>
        </div>

    </nav>
    );
}

export default NavBar;