import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cards from "../components/Home/Cards";

const ImportantTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const url = import.meta.env.VITE_BACKEND_API_URL;
  
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${url}/api/v1/getimptasks`,
          {
            headers,
          }
        );

        setData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch important tasks");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleImportantTask = async (id) => {
    try {
      await axios.put(
        `${url}/api/v1/updateimptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success("Task Updated Successfully");
    } catch (error) {
      toast.error("Failed to update important task");
    }
  };

  return (
    <div className="flex flex-col flex-grow px-4 py-2 ">
      {loading ? (
        <p className="text-center text-gray-400">Loading important tasks...</p>
      ) : data && data.length > 0 ? (
        <Cards
          home={"false"}
          data={data}
          setData={setData}
          handleImportantTask={handleImportantTask}
        />
      ) : (
        <p className="text-center text-gray-400">
          No important tasks available.
        </p>
      )}
    </div>
  );
};

export default ImportantTasks;
