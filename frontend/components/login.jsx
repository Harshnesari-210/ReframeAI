import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/auth/login", {
                email,
                password,
            }, {
                withCredentials: true, // Ensures cookies are sent with the request
            });

            setSuccess(response.data.message);
            setError('');
            // Redirect to the profile page or dashboard
            window.location.href = "/generate";
        } catch (err) {
            if (err.response) {
                // Backend responded with an error (4xx or 5xx)
                setError(err.response.data.message);
            } else if (err.request) {
                // Request was made, but no response received
                setError("No response from server. Please try again later.");
            } else {
                // Something else caused the error
                setError("An unexpected error occurred. Please try again.");
            }
            setSuccess('');
        }
    };

    return (
        <div className="h-[100vh] w-full flex items-center justify-center bg-white">
            <div className="container w-[30%] p-8 border border-solid border-black rounded-lg shadow-lg bg-white">
                {/* Logo Section */}
                <div className="logo-container flex justify-center mb-4">
                    {/* <img
                        src={rentlink}
                        alt="rentlink logo"
                        className="h-24 w-24 object-cover"
                    /> */}
                </div>

                {/* Header Section */}
                <div className="w-full text-center mb-6">
                    <h1 className="text-3xl font-bold text-[#118B50]">Welcome Back!</h1>
                    <p className="text-[#333333] text-lg">Log in to continue</p>
                </div>

                {/* Error or Success Messages */}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="w-full flex flex-col gap-6 px-6">
                    <div className="email-field w-full">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#118B50] text-[#333333] text-lg"
                        />
                    </div>
                    <div className="password-field w-full">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#118B50] text-[#333333] text-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#118B50] text-white py-3 rounded-lg text-lg hover:bg-[#37A772] transition-all"
                    >
                        Log In
                    </button>
                </form>

                {/* Footer Section */}
                <div className="mt-4">
                    <p className="text-md text-[#333333]">
                        Don't have an account?{" "}
                        <span className="text-[#118B50] font-semibold cursor-pointer hover:underline">
                            <a href="/registration" className="text-[#118B50] font-semibold">
                                Signup here
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
