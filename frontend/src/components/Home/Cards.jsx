import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaRegEdit, FaHeart } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";

const Cards = ({
  home,
  setInputDiv,
  data,
  setData,
  setEditData,
  handleImportantTask,
  handleCompleteTask,
}) => {
  const [loading, setLoading] = useState(false);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleDeleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:1000/api/v1/deletetask/${id}`, {
        headers,
      });
      setData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditTask = (id, title, desc) => {
    setInputDiv("fixed");
    setEditData({ id, title, desc });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {data &&
        data.map((items) => (
          <div
            key={items._id}
            className="flex flex-col justify-between border border-gray-500 bg-customDarkTeal rounded-xl p-4 transition-transform duration-300 hover:scale-105 min-h-[150px]"
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>

            <div className="mt-4 w-full flex flex-col space-y-2">
              <button
                className={`${
                  items.complete ? "bg-green-500" : "bg-red-500"
                } p-2 rounded hover:border-2 transition-all duration-300 w-full`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete ? "Completed" : "In Completed"}
              </button>

              <div className="flex justify-around items-center">
                <button onClick={() => handleImportantTask(items._id)}>
                  {items.important ? (
                    <FaHeart className="text-red-500 hover:scale-125 transition-transform duration-300" />
                  ) : (
                    <CiHeart className="hover:scale-125 transition-transform duration-300" />
                  )}
                </button>

                {home === "true" && (
                  <button
                    onClick={() =>
                      handleEditTask(items._id, items.title, items.desc)
                    }
                  >
                    <FaRegEdit className="hover:scale-125 transition-transform duration-300" />
                  </button>
                )}

                <button
                  onClick={() => handleDeleteTask(items._id)}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loader" />
                  ) : (
                    <RiDeleteBin2Line className="hover:scale-125 transition-transform duration-300" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center border-4 border-gray-700 bg-customDarkTeal rounded-xl p-4 hover:scale-105 transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <MdAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
