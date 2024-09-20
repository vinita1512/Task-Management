import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';

const InCompletedTasks = () => {
  const [data, setData] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/getincomptasks",
          {
            headers,
          }
        );
        console.log("dataincomp", response.data.data);

        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const handleCompleteTask = async (id) => {
    console.log("button id: ", id);

    try {
      await axios.put(
        `http://localhost:1000/api/v1/updatecomptask/${id}`,
        {},
        { headers }
      );
      setData((prevData) =>
        prevData.filter((item) => item._id !== id)
      );
      alert("Completed Task Updated Sucessfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div><Cards home={"false"} data={data} setData={setData} handleCompleteTask={handleCompleteTask} /></div>
  )
}

export default InCompletedTasks