import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";
import { toast } from "react-toastify";

const CompletedTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/getcomptasks",
          {
            headers,
          }
        );
        setData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/updateimptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, important: !item.important } : item
        )
      );
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Failed to update important task");
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/updatecomptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success("Task Updated Successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="flex flex-col flex-grow px-4 py-2">
      {loading ? (
        <p className="text-center text-gray-400">Loading completed tasks...</p>
      ) : data && data.length > 0 ? (
        <Cards
          home={"false"}
          data={data}
          setData={setData}
          handleCompleteTask={handleCompleteTask}
          handleImportantTask={handleImportantTask}
        />
      ) : (
        <p className="text-center text-gray-400">
          No completed tasks available.
        </p>
      )}
    </div>
  );
};

export default CompletedTasks;
