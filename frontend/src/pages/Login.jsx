import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    navigate("/");
  }
  const [data, setData] = useState({ username: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  
  const submit = async () => {
    try {
      if (data.username === "" || data.password === "") {
        alert("All fields are required");
      }
      else{
      const response = await axios.post(
        "http://localhost:1000/api/v1/login",
        data
      );
      setData({ username: "", password: "" });
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      navigate("/");
    }} catch (error) {
      const errormsg =
        error.response?.data?.message || "An unexpected error occurred";
      alert(errormsg);
    }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl font-semibold">Login</div>
        <input
          type="text"
          placeholder="enter username"
          className="bg-customGrayishCyan text-customDarkTeal px-3 py-2 my-3 w-full rounded"
          name="username"
          value={data.username}
          onChange={change}
        />

        <input
          type="password"
          placeholder="enter password"
          className="bg-customGrayishCyan text-customDarkTeal px-3 py-2 my-3 w-full rounded"
          name="password"
          value={data.password}
          onChange={change}
        />
        <div className="w-full flex justify-between items-center">
          <button
            className="bg-customTealBlue text-xl font-semibold px-3 py-2 rounded"
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            {" "}
            Don't have an account? Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
