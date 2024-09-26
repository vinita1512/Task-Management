import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

const InputData = ({
  setInputDiv,
  inputDiv,
  setTasks,
  editData,
  setEditData,
}) => {
  const [data, setData] = useState({ title: "", desc: "" });
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (editData && editData.id) {
      setData({ title: editData.title, desc: editData.desc });
    }
  }, [editData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const submitData = async () => {
    if (data.title === "" || data.desc === "") {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${window.location.origin}/api/v1/createtask`,
        data,
        {
          headers,
        }
      );
      setInputDiv("hidden");
      setTasks((prevData) => [...prevData, response.data.newTask]);
      setData({ title: "", desc: "" });
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    if (data.title === "" || data.desc === "") {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.put(
        `${window.location.origin}/api/v1/updatetask/${editData.id}`,
        data,
        {
          headers,
        }
      );
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
      toast.success("Task updated successfully!");
    } catch (error) {
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`${inputDiv} fixed top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}
      ></div>

      <div
        className={`${inputDiv} fixed top-0 left-0 flex items-center justify-center h-screen  w-full`}
      >
        <div className="w-full max-w-md bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button
              className="text-2xl text-gray-400 hover:text-gray-200"
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
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white"
            value={data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white resize-none"
            value={data.desc}
            onChange={change}
          ></textarea>

          <button
            className={`px-3 py-2 bg-blue-400 text-xl ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={editData.id ? updateTask : submitData}
            disabled={loading}
          >
            {editData.id ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
