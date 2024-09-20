import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
const InputData = ({
  setInputDiv,
  InputDiv,
  setTasks,
  editData,
  setEditData,
}) => {
  const [data, setData] = useState({ title: "", desc: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (editData) {
      setData({ title: editData.title, desc: editData.desc });
    }
  }, [editData]);

  console.log("editdata", editData);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async () => {
    if (data.title === "" || data.desc === "") {
      alert("All fields are required ");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:1000/api/v1/createtask`,
          data,
          {
            headers,
          }
        );
        setInputDiv("hidden");
        console.log("response", response.data.newTask);
        setTasks((prevData) => [...prevData, response.data.newTask]);

        setData({ title: "", desc: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateTask = async () => {
    if (data.title === "" || data.desc === "") {
      alert("All fields are required ");
    } else {
      try {
        const response = await axios.put(
          `http://localhost:1000/api/v1/updatetask/${editData.id}`,
          data,
          {
            headers,
          }
        );
        console.log("response", response.data.editTask);
        // setTasks((prevData) => [...prevData, response.data.editTask]);
        setTasks((prevData) =>
          prevData.map((item) =>
            item._id === editData.id
              ? { ...item, title: data.title, desc: data.desc }
              : item
          )
        );
        setEditData({ id: "", title: "", desc: "" });
        setData({ title: "", desc: "" });
        setInputDiv("hidden");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div
        className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}
      ></div>

      <div
        className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen  w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              className="text-2xl"
              onClick={() => {
                setInputDiv("hidden");
                setData({ title: "", desc: "" });
                setEditData({ id: "", title: "", desc: "" });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full  bg-gray-700 my-3"
            value={data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={data.desc}
            onChange={change}
          ></textarea>
          {editData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400 text-xl"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 text-xl"
              onClick={updateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
