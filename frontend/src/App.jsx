import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Outlet, Route, Routes, Router, useNavigate } from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import InCompletedTasks from "./pages/InCompletedTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("isLoggedIn", isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    } else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, []);

  return (
    <div className="bg-customCharcoal text-white p-4 h-screen flex flex-col overflow-hidden">
      <div className="flex-grow overflow-auto">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<AllTasks />} />
            <Route path="/importantTasks" element={<ImportantTasks />} />
            <Route path="/completedTasks" element={<CompletedTasks />} />
            <Route path="/InCompletedTasks" element={<InCompletedTasks />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
