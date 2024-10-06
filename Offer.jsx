import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'

const categories = [
    "Marketing Automation",
    "Business Intelligence and Analytics",
    "Project Management",
    "Help Desk and Customer Support",
    "Customer Relationship Management (CRM)"
  ];

export default function Offer() {
    const [data, setResponse] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
    const location = useLocation();
  const jsonData = location.state;
  useEffect(() => {
    if (!jsonData) return; 
    // Define the function to fetch data
    const fetchData = async () => {
        try {
            setLoading(true); // Start loading
            console.log(JSON.stringify(jsonData));
            const response = await fetch('http://127.0.0.1:5000/api/new', { // Replace with your API URL
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(jsonData),
            });
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const newData = await response.json();
            setResponse(newData); // Store the response data
            console.log(newData)
          } catch (err) {
            setError(err.message); // Store the error
          } finally {
            setLoading(false); // End loading
          }
    };

    fetchData(); // Call the fetch function when component mounts
  }, []); // Empty dependency array means this useEffect runs once, when the component mounts

  // Render different states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-white font-bold mb-8 text-center">Recommended Startup Accelerators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {categories.map((category) => (
          <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-lg font-semibold bg-gray-100 p-4">{category}</h2>
            <div className="p-4 space-y-4">
              {data
                .filter((item) => item.category === category)
                .map((item) => (
                  <div key={item.name} className="bg-gray-50 rounded-md p-4 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="font-medium text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  }