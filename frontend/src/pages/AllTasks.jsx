import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import { MdAddCircle } from "react-icons/md";
import InputData from "../components/Home/InputData";
import axios from "axios";
const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({id:"",title:"", desc:""});
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleImportantTask = async (id) => {
    console.log("button id: ", id);

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
      alert("Important Task Updated Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleCompleteTask = async (id) => {
    console.log("button id: ", id);

    try {
      await axios.put(
        `http://localhost:1000/api/v1/updatecomptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, complete: !item.complete } : item
        )
      );
      alert("Completed Task Updated Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/getalltasks",
          {
            headers,
          }
        );
        console.log("datar", response.data.data.tasks);

        setData(response.data.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  data && console.log("data", data?.tasks);

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <MdAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {data && <Cards home={"true"} setInputDiv={setInputDiv} data={data} setData={setData} setEditData={setEditData} handleImportantTask={handleImportantTask} handleCompleteTask={handleCompleteTask} />}
      </div>

      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} setTasks={setData} editData={editData} setEditData={setEditData}/>
    </>
  );
};

export default AllTasks;
