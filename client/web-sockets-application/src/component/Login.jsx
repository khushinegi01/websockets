import { useState } from "react";

export default function Login({ onLoginUser }) {   // taking setUsername as prop in function
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Login with:", { username });
    onLoginUser(username)
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#161616]">
        <div>
          <h1 className="block text-6xl font-bold text-center text-white mt-10 mb-2 bg-[#161616]">
            Live <span className="text-yellow-600">Cursor</span>
          </h1>
          <p className="mb-6 text-center text-white/70">WebSocket Application that tracks multiple cursor pointers.</p>
        </div>
        <div className="w-full max-w-md p-8 bg-[#1c1c1c] rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Login to Workspace
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="what do you wanna be called ?"
                required
                className="w-full px-4 py-2 text-white/40 border rounded-lg focus:ring-1 focus:ring-white focus:outline-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-[#2c2c2c] rounded-lg hover:bg-yellow-600 hover:text-black transition">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
