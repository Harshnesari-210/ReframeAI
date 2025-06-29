import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3000/auth/registration", {
        firstName,
        email,
        password,
      });
      alert(response.data); // Handle success
    } catch (err) {
      setErrorMessage("Error: " + err.response?.data || "Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#ededed]">
      <div className="w-[400px] p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-semibold mb-6 text-[#222]">
          Register
        </h2>
        {errorMessage && (
          <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-[#222] mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50]"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-[#222] mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50]"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#222] mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#118B50]"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white bg-[#118B50] hover:bg-[#37A772] focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/" className="text-[#118B50] hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
