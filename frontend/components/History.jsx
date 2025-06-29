// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const History = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/history', {
//           withCredentials: true,
//         });
//         setHistory(response.data.history);
//         setError('');
//       } catch (err) {
//         setError(
//           err.response?.data?.error || 'An unexpected error occurred. Please try again.'
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
//   }

//   return (
//     <div className="w-[800px] mx-auto p-4 flex flex-col bg-white border shadow-lg">
//       <header className="flex justify-between items-center mb-4">
//       <a href="/generate" className="text-blue-500 font-bold">PromptPilot</a>
//         <div className="space-x-4">
//           <a href="/history" className="text-blue-500 font-bold">History</a>
//           <a href="/profile" className="text-blue-500">Profile</a>
//         </div>
//       </header>

//       <main className="bg-gray-50 p-6 rounded-md border border-gray-300">
//         <h1 className="text-2xl font-semibold mb-4">Your History</h1>

//         {history.length === 0 ? (
//           <p className="text-gray-500">You have no history to display.</p>
//         ) : (
//           <div className="space-y-4">
//             {history.map((item, index) => (
//               <div
//                 key={index}
//                 className="p-4 border border-gray-300 rounded-md bg-white shadow-sm"
//               >
//                 <p className="text-sm text-gray-500">Prompt:</p>
//                 <p className="text-lg text-black font-semibold">{item.prompt}</p>
//                 <p className="text-sm text-gray-500 mt-2">Response:</p>
//                 <p className="text-lg text-black">{item.response}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default History;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const History = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [copiedIndex, setCopiedIndex] = useState(null);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/history", {
//           withCredentials: true,
//         });
//         setHistory(response.data.history);
//         setError("");
//       } catch (err) {
//         setError(
//           err.response?.data?.error || "An unexpected error occurred. Please try again."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   const handleCopy = (text, index) => {
//     navigator.clipboard.writeText(text);
//     setCopiedIndex(index);

//     setTimeout(() => setCopiedIndex(null), 2000); // Clear message after 2 seconds
//   };
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/user/history/${id}`, { withCredentials: true });
//       setHistory(history.filter((item) => item._id !== id)); // Update the state to remove the deleted record
//     } catch (error) {
//       console.error("Error deleting record:", error);
//     }
//   };

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
//   }

//   return (
//     <div className="w-[800px] mx-auto p-4 flex flex-col bg-white border shadow-lg">
//       <header className="flex justify-between items-center mb-4">
//         <a href="/generate" className="text-blue-500 font-bold">
//           PromptPilot
//         </a>
//         <div className="space-x-4">
//           <a href="/history" className="text-blue-500 font-bold">
//             History
//           </a>
//           <a href="/profile" className="text-blue-500">
//             Profile
//           </a>
//         </div>
//       </header>

//       <main className="bg-gray-50 p-6 rounded-md border border-gray-300">
//         <h1 className="text-2xl font-semibold mb-4">Your History</h1>

//         {history.length === 0 ? (
//           <p className="text-gray-500">You have no history to display.</p>
//         ) : (
//           <div className="space-y-4">
//            {history.map((item, index) => (
//   <div key={index} className="p-4 border border-gray-300 rounded-md bg-white shadow-sm">
//     <p className="text-sm text-gray-500">Prompt:</p>
//     <p className="text-lg text-black font-semibold">{item.prompt}</p>
//     <p className="text-sm text-gray-500 mt-2">Response:</p>
//     <p className="text-lg text-black">{item.response}</p>
//     <button 
//       onClick={() => handleDelete(item._id)} 
//       className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
//     >
//       Delete
//     </button>
//   </div>
// ))}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default History;

import React, { useState, useEffect } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/history", {
          withCredentials: true,
        });
        setHistory(response.data.history);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.error || "An unexpected error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text); // Copy the response instead of the prompt
    setCopiedIndex(index);

    setTimeout(() => setCopiedIndex(null), 2000); // Clear message after 2 seconds
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/user/history/${id}`, { withCredentials: true });
      setHistory(history.filter((item) => item._id !== id)); // Update the state to remove the deleted record
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="w-[800px] mx-auto p-4 flex flex-col bg-white border shadow-lg rounded-lg">
      <header className="flex justify-between items-center mb-6">
        <a href="/generate" className="text-blue-500 font-bold text-xl hover:text-blue-700">
          PromptPilot
        </a>
        <div className="space-x-6">
          <a href="/history" className="text-blue-500 font-bold hover:text-blue-700">History</a>
          <a href="/profile" className="text-blue-500 hover:text-blue-700">Profile</a>
        </div>
      </header>

      <main className="bg-gray-50 p-6 rounded-md border border-gray-300 space-y-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Your History</h1>

        {history.length === 0 ? (
          <p className="text-gray-500">You have no history to display.</p>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-md bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <p className="text-sm text-gray-500">Prompt:</p>
                <p className="text-lg text-black font-semibold">{item.prompt}</p>
                <p className="text-sm text-gray-500 mt-2">Response:</p>
                <p className="text-lg text-black">{item.response}</p>
                
                {/* Buttons below prompt and response */}
                <div className="mt-4 space-x-4 flex justify-between">
                  <button 
                    onClick={() => handleCopy(item.response, index)} // Copy the response
                    className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none transition duration-300 w-full sm:w-auto"
                  >
                    {copiedIndex === index ? "Copied!" : "Copy Response"}
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)} 
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none transition duration-300 w-full sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default History;
