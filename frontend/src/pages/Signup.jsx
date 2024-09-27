import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    navigate("/");
  }

  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const url = import.meta.env.VITE_BACKEND_API_URL;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        toast.error("All fields are required");
        setLoading(false);
        return;
      } else {
        const response = await axios.post(
          `${url}/api/v1/signin`,
          data
        );
        setData({ username: "", email: "", password: "" });
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex items-center p-4 justify-center rounded bg-gray-800 h-full">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="text-2xl font-semibold">Signup</div>
        <input
          type="text"
          placeholder="enter username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="username"
          value={data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="enter email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="email"
          value={data.email}
          onChange={change}
          required
        />
        <input
          type="password"
          placeholder="enter password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="password"
          value={data.password}
          onChange={change}
        />
        <div className=" flex justify-between items-center">
          <button
            type="button"
            className={`bg-customTealBlue text-xl font-semibold px-3 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
