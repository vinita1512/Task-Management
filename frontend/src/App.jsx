import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Outlet, Route, Routes, Router} from "react-router-dom";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import InCompletedTasks from "./pages/InCompletedTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} >
          <Route index element={<AllTasks/>} />
          <Route path="/importantTasks" element={<ImportantTasks/>}  />
          <Route path="/completedTasks" element={<CompletedTasks/>}  />
          <Route path="/InCompletedTasks" element={<InCompletedTasks/>}  />
          </Route>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/login"  element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
