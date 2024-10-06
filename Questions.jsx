import React, { useState, useRef } from 'react';
import './Questions.css';
import Card from '../assets/components/card';
import { useNavigate } from 'react-router-dom';

const categories = [
    "Marketing Automation",
    "Business Intelligence and Analytics",
    "Project Management",
    "Help Desk",
    "Customer Relationship Management"
  ]

function Questions() {
    const [answer, setAnswer] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showShopWindows, setShowShopWindows] = useState(false); 
    const descriptions = useRef("");



    const questions = [
      {
        title: "1. Startup Stage and Goals",
        questions:
          "Are you looking for help with refining your product, gaining customers, or raising funding?",
      },
      {
        title: "2. Industry Focus",
        questions:
          "Does your startup operate in a specific industry (e.g., tech, healthcare, fintech, social impact)?",
        
      },
      {
        title: "3. Location and Market",
        questions: 
          "Are you targeting a specific market, and would you prefer an accelerator with strong connections there?"
        
      },
      {
        title: "4. Funding Needs",
        questions:
          "Are you seeking direct investment or venture capital opportunities?",
        
      },
      {
        title: "5. Program Structure and Duration",
        questions:
          "Are you looking for marketing automation, email marketing, business analytics, etc?",
      },
      {
        title: "All questions answered. See down to complete your offer",
        questions: 
          "You're done."
        
      }
  
      
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        descriptions.current = descriptions.current + " " + answer;
        console.log('Submitted answer:', descriptions.current);
        setAnswer('');

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(a => a+1);
        } else {
                console.log("All questions answered.");
        }
    };

    return (
        <>
            <div className="questionContents">
                <div className="actualQuestionContents">
                    <div className="questionHeading">DISCOVER ACCELERATION ENGINES</div>
                    <div className="questionSubHeading">
                        To use the recommendation engine, simply input your company’s key information—such as product categories, entitlements, and industry.
                        The system will then process this data through its vector search algorithm to identify the most relevant accelerator programs tailored to your specific needs.
                    </div>
                    <div className="contentContainer">
                        <div className="questionSection">
                            <h2>{questions[currentQuestionIndex].title}</h2>
                            <div className="question">
                                {questions[currentQuestionIndex].questions}
                            </div>
                        </div>
                        <form className="answerSection" onSubmit={handleSubmit}>
                            <div className="answer">
                                <textarea
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    placeholder="Enter your answer..."
                                    rows="5"
                                    style={{ width: '100%', resize: 'none' }} 
                                    className='p-3'
                                />
                            </div>
                            <button id="answerMe" type="submit">SUBMIT</button>
                        </form>
                    </div>
                </div>
                <img className="thisHandHatesReact" src="./thisHandHatesReact.png" alt="Hand" />
            </div>
            <CategoryList descriptions={descriptions}/>
        </>
    );
}

export default Questions;

function CategoryList({ descriptions }) {
    const navigate = useNavigate()
    const [selectedItems, setSelectedItems] = useState(
      Object.fromEntries(categories.map(category => [category, 1]))
    )
  
    const handleInputChange = (category, value) => {
      const numValue = parseInt(value, 10)
      if (numValue >= 1 && numValue <= 5) {
        setSelectedItems(prev => ({ ...prev, [category]: numValue }))
      }
    }
  
    const handleSubmit = (e) => {
        e.preventDefault()
        const jsonData = {
            name: '',
            description: descriptions.current,
            count1: selectedItems['Marketing Automation'],
            count2: selectedItems['Business Intelligence and Analytics'],
            count3: selectedItems['Project Management'],
            count4: selectedItems['Help Desk'],
            count5: selectedItems['Customer Relationship Management']
        }
      navigate('/offer', { state: jsonData });
      // Here you would typically send the data to your backend or perform further actions
    }
  
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md mb-20">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Items by Category</h2>
        <form onSubmit={handleSubmit}>
          {categories.map(category => (
            <div key={category} className="mb-4">
              <label htmlFor={category} className="block text-sm font-medium text-gray-700 mb-1">
                {category}
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  id={category}
                  name={category}
                  value={selectedItems[category]}
                  onChange={(e) => handleInputChange(category, e.target.value)}
                  min={1}
                  max={5}
                  className="w-20 mr-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="text-sm text-gray-500">
                  (1-5 items)
                </span>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 bg-[#ffa325] text-white font-semibold rounded-md shadow-sm hover:bg-[#ff5900]"
          >
            Submit
          </button>
        </form>
      </div>
    )
  }
