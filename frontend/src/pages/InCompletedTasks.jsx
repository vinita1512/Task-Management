import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";
import { toast } from "react-toastify";

const InCompletedTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const url = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${url}/api/v1/getincomptasks`,
          {
            headers,
          }
        );
        setData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch incomplete tasks");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [headers]);

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `${url}/api/v1/updatecomptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success("Task Updated Successfully");
    } catch (error) {
      toast.error("Failed to update task");
    }
  };

  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `${url}/api/v1/updateimptask/${id}`,
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

  return (
    <div className="flex flex-col flex-grow px-4 py-2 ">
      {loading ? (
        <p className="text-center text-gray-400">Loading incomplete tasks...</p>
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
          No incomplete tasks available.
        </p>
      )}
    </div>
  );
};

export default InCompletedTasks;
