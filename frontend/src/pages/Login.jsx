import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const [data, setData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (data.username === "" || data.password === "") {
        toast.error("All fields are required");
        setLoading(false);
        return;
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/login",
          data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authActions.login());
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      const errormsg =
        error.response?.data?.message || "An unexpected error occurred";
      toast.error(errormsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center p-4 justify-center rounded bg-gray-800 h-full">
      <div className="max-w-md w-full bg-gray-900 p-6 rounded-lg shadow-md">
        <div className="text-2xl font-semibold">Login</div>
        <input
          type="text"
          placeholder="enter username"
          className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          name="username"
          value={data.username}
          onChange={change}
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
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Don't have an account? Signup here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
