import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CameraThing.css';

function CameraThing() {
    const navigate = useNavigate()
    return(
        <div className="content">
            <div className = "lContents">
                <img className="thisComputerHatesReactToo" src="computer.png"/>
            </div>
            <div className="rContents">
                <h1 className="title">IMAGINE INTERACTIVE ANALYSIS</h1>
                <h1 className="questionSubheading">Whisper, OpenAI's speech recognition system, integrated with advanced computer vision technology, allows users to interact with the system through both voice and hand gestures. Using your webcam, the system detects hand gestures to create bounding boxes on-screen, while Whisper transcribes your spoken input into text, dynamically placing it within the bounding box. This integration offers a refined and highly efficient means of communication for businesses to engage with digital environments. </h1>
                <a href='http://127.0.0.1:5000/api/camera' target='_blank' id="answerMe" type="button">Try Workflow</a>
                <a href='http://127.0.0.1:5000/streamlit' target='_blank' id="answerMe" type="button">Try Speech To Analyze</a>
            </div>
        </div>
    );
}

export default CameraThing;