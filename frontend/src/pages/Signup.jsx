import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
const Signup = () => {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    navigate("/");
  }
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/signin",
          data
        );

        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Signup</div>
        <input
          type="text"
          placeholder="enter username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="enter email"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="email"
          value={data.email}
          onChange={change}
          required
        />
        <input
          type="password"
          placeholder="enter password"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={data.password}
          onChange={change}
        />
        <div className="w-full flex justify-between items-center">
          <button
            className="bg-blue-400 text-xl font-semibold px-3 py-2 rounded"
            onClick={submit}
          >
            Signup
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            {" "}
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
