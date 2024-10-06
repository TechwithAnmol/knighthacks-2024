import React, { useState, useEffect } from 'react'

export default function Search() {
  const [name, setName] = useState(null)
  const [data, setResponse] = useState(null); // State to store the fetched data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Parse the query parameters
    const searchParams = new URLSearchParams(window.location.search)
    const nameParam = searchParams.get('name')

    // Set the name state
    setName(nameParam)

    // Log the name to the console
    console.log('Name query parameter:', nameParam)
  }, []) // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    if (!name) return; 
    // Define the function to fetch data
    const fetchData = async () => {
        try {
            setLoading(true); // Start loading
            const requestBody = { name: name }; // Data to be posted
            console.log(JSON.stringify(requestBody));
            const response = await fetch('http://127.0.0.1:5000/api/existing', { // Replace with your API URL
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });
            
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            
            const jsonData = await response.json();
            setResponse(jsonData); // Store the response data
          } catch (err) {
            setError(err.message); // Store the error
          } finally {
            setLoading(false); // End loading
          }
    };

    fetchData(); // Call the fetch function when component mounts
  }, [name]); // Empty dependency array means this useEffect runs once, when the component mounts

  // Render different states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  const Card  = ({ name, category, description }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
      <p className="text-sm font-medium text-blue-600 mb-2">{category}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )

  const NewCard = ({ name, category, description, score }) => (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {score.toFixed(2)}
        </span>
      </div>
      <p className="text-sm font-medium text-blue-600 mb-2">{category}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Newly Recommended</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data[1].map((item, index) => (
              <NewCard key={index} {...item} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Current</h2>
          <div className="space-y-6">
            {data[0].map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}