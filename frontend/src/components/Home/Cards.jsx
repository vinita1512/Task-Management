import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
const Cards = ({
  home,
  setInputDiv,
  data,
  setData,
  setEditData,
  handleImportantTask,
  handleCompleteTask,
}) => {
  console.log("dataa", data);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleDeleteTask = async (id) => {
    console.log("button id: ", id);

    try {
      await axios.delete(`http://localhost:1000/api/v1/deletetask/${id}`, {
        headers,
      });
      setData((prevData) => prevData.filter((item) => item._id !== id));
      alert(" Task deleted Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditTask = async (id, title, desc) => {
    try {
      setInputDiv("fixed");
      console.log("Edit", id, title, desc);
      setEditData({ id: id, title: title, desc: desc });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={items._id}
            className="flex flex-col justify-between border border-r-red-50 bg-customDarkTeal rounded-xl p-4"
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>

            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.complete === true ? "bg-green-500" : "bg-red-500"
                } p-2 rounded  hover:border-2  transition-all duration-300`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "In Completed"}
              </button>

              <div className="text-white p-2 w-3/6 text-2xl flex font-semibold justify-around">
                <button onClick={() => handleImportantTask(items._id)}>
                  {items.important === true ? (
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

                <button onClick={() => handleDeleteTask(items._id)}>
                  <RiDeleteBin2Line className="hover:scale-125 transition-transform duration-300"/>
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center border-4 border-r-red-50 bg-customDarkTeal rounded-xl p-4 hover:scale-105 transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <MdAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4 "> Add Tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
