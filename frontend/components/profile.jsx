// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {
//   const [profile, setProfile] = useState({
//     firstName: "",
//     email: "",
//     createdAt: "",
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getUserProfile = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/user/profile", {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.data.success) {
//           setProfile({
//             firstName: response.data.user.firstName,
//             email: response.data.user.email,
//             createdAt: response.data.user.createdAt,
//           });
//           setError("");
//         } else {
//           setError("Error fetching profile data");
//         }
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//         setError("Error fetching profile data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     getUserProfile();
//   }, []);

//   if (loading) {
//     return <div className="flex items-center justify-center h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
//   }

//   return (
//     <div className="w-[800px] mt-44 mx-auto p-6 flex flex-col bg-white border rounded-lg shadow-lg">
//       <header className="flex justify-between items-center mb-6">
//         <a href="/generate" className="text-blue-500 font-bold text-xl hover:text-blue-600">
//           PromptPilot
//         </a>
//         <div className="space-x-6">
//           <a href="/history" className="text-blue-500 hover:text-blue-600">History</a>
//           <a href="/profile" className="text-blue-500 font-bold hover:text-blue-600">Profile</a>
//         </div>
//       </header>

//       <main className="bg-gray-50 p-8 rounded-md border border-gray-300 shadow-md">
//         <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Profile</h1>
//         <div className="space-y-6">
//           <div className="flex items-center space-x-4">
//             <p className="text-lg text-gray-700">
//               <strong className="font-medium text-gray-800">Name:</strong> {profile.firstName}
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <p className="text-lg text-gray-700">
//               <strong className="font-medium text-gray-800">Email:</strong> {profile.email}
//             </p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <p className="text-lg text-gray-700">
//               <strong className="font-medium text-gray-800">Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         </div>

        
//       </main>
//     </div>
//   );
// };

// export default Profile;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    email: "",
    createdAt: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.data.success) {
          setProfile({
            firstName: response.data.user.firstName,
            email: response.data.user.email,
            createdAt: response.data.user.createdAt,
          });
          setError("");
        } else {
          setError("Error fetching profile data");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Error fetching profile data");
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="w-[800px] mt-44 mx-auto p-6 flex flex-col bg-white border rounded-lg shadow-lg">
        <header className="flex justify-between items-center mb-6">
          <a href="/generate" className="text-blue-500 font-bold text-xl hover:text-blue-600">
            PromptPilot
          </a>
          <div className="space-x-6">
            <a href="/history" className="text-blue-500 hover:text-blue-600">History</a>
            <a href="/profile" className="text-blue-500 font-bold hover:text-blue-600">Profile</a>
          </div>
        </header>

        <main className="bg-gray-50 p-8 rounded-md border border-gray-300 shadow-md">
          <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Profile</h1>
          <div className="space-y-6">
            <div className="shimmer shimmer-block" />
            <div className="shimmer shimmer-block" />
            <div className="shimmer shimmer-block" />
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="w-[800px] mt-44 mx-auto p-6 flex flex-col bg-white border rounded-lg shadow-lg">
      <header className="flex justify-between items-center mb-6">
        <a href="/generate" className="text-blue-500 font-bold text-xl hover:text-blue-600">
          PromptPilot
        </a>
        <div className="space-x-6">
          <a href="/history" className="text-blue-500 hover:text-blue-600">History</a>
          <a href="/profile" className="text-blue-500 font-bold hover:text-blue-600">Profile</a>
        </div>
      </header>

      <main className="bg-gray-50 p-8 rounded-md border border-gray-300 shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Your Profile</h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-gray-800">Name:</strong> {profile.firstName}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-gray-800">Email:</strong> {profile.email}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-lg text-gray-700">
              <strong className="font-medium text-gray-800">Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
