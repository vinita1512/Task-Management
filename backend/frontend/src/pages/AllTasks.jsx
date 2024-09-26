import React, { useState, useEffect } from "react";

import { MdAddCircle } from "react-icons/md";
import InputData from "../components/Home/InputData";
import axios from "axios";
import { toast } from "react-toastify";
import Cards from "../components/Home/Cards";

const AllTasks = ({ home = "true" }) => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({ id: "", title: "", desc: "" });
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `${window.location.origin}/api/v1/updateimptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, important: !item.important } : item
        )
      );
      toast.success("Task Updated Successfully");
    } catch (error) {
      toast.error("Failed to update important task");
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `${window.location.origin}/api/v1/updatecomptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, complete: !item.complete } : item
        )
      );
      toast.success("Task Updated Successfully");
    } catch (error) {
      toast.error("Failed to update completed task");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${window.location.origin}/api/v1/getalltasks`,
          {
            headers,
          }
        );

        setData(response.data.data.tasks);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="flex flex-col flex-grow px-4 py-2 ">
        <div className="flex justify-end mb-4">
          <button onClick={() => setInputDiv("fixed")}>
            <MdAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-400">Loading tasks...</p>
        ) : data && data.length > 0 ? (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={data}
            setData={setData}
            setEditData={setEditData}
            handleImportantTask={handleImportantTask}
            handleCompleteTask={handleCompleteTask}
          />
        ) : (
          <p className="text-center text-gray-400">No tasks available.</p>
        )}
      </div>

      {home === "true" && data.length === 0 && (
        <button
          className="flex flex-col justify-center items-center border-4 border-gray-700 bg-customDarkTeal rounded-xl p-4 hover:scale-105 transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <MdAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Tasks</h2>
        </button>
      )}

      <InputData
        inputDiv={inputDiv}
        setInputDiv={setInputDiv}
        setTasks={setData}
        editData={editData}
        setEditData={setEditData}
      />
    </>
  );
};

export default AllTasks;
