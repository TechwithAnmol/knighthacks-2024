import React, { forwardRef, useState } from "react";
import './HeroBar.css';
import { useNavigate, useSearchParams } from "react-router-dom";

const HeroBar = forwardRef(({ scrollToLearn }, ref) => {
    const [isInputVisible, setIsInputVisible] = useState(false)
    const [name, setName] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle the submission logic here
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('name', name);
    navigate(`/search?${newSearchParams.toString()}`);
    console.log("Form submitted")
  }
  return (
    <>
      <div className="heroContents">
        <img className="accelerationStation" src="./ITACCELERATE.png" alt="Acceleration Station" />
        
        <div className="heroHeadings relative">
          <h1 className="heroHeading">ACCELERATE<br />WITH<br />SPRINTSCOUT</h1>
          <h1 className="heroSubHeading">Our mission is to empower businesses by providing intelligent, AI-driven solutions that streamline connections with accelerators, foster growth, and enhance user interaction through advanced voice and gesture recognition technology</h1>
          <h1 id="tryMe2" type="button" onClick={scrollToLearn}>LEARN MORE</h1> 
          <span className="font-family-['Poppins-Regular'] w-full max-w-sm p-2 rounded-lg shadow-sm absolute bottom-1 left-[23%]">
      {!isInputVisible ? (
        <button
          onClick={() => setIsInputVisible(true)}
          className="text-sm text-white hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
        >
          Already a member?
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-10 absolute bottom-[-8%]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Company Name"
            className="flex-grow p-3 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-3 text-sm text-white bg-[#ffa325] rounded-md hover:bg-[#ff5900] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      )}
    </span>
        </div>
      </div>

      <div ref={ref} className="aboutMeContents"> 
        <div className="heroHeadings">
          <h1 className="aboutMeHeading">WHAT IS SPRINTSCOUT ABOUT?</h1>
          <h1 className="aboutMeSubHeading">
          Our project centers around building an intelligent recommendation engine designed to connect business owners with the most relevant accelerators, tailored to their specific needs. <h1 className="tool">DISCOVER.</h1>By utilizing a highly optimized <u>vector search algorithm</u>, our system is able to analyze a company’s products, industry, and entitlements to identify accelerator programs that align with their goals. This solution optimizes the process of finding and recommending accelerators by mapping out key attributes of a business, ensuring the best matches to drive growth and development. <h1 className="tool">IMAGINE.</h1>Alongside this primary functionality, we’ve introduced a <u>camera-whiteboarding tool</u> that allows users to create bounding boxes with hand gestures, which then act as input spaces where spoken words are transcribed as text using OpenAI's Whisper API. This enhancement fosters a seamless interaction between voice transcription and on-screen visual elements. 
          </h1>
        </div>
        <img className="steps" src="./wereDoomed.png" alt="Steps" />
      </div>
    </>
  );
});

export default HeroBar;
