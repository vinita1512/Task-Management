import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
const Cards = ({ home, setInputDiv }) => {
  const data = [
    {
      title: "Best channel",
      desc: "I have to create my channel",
      status: "Complete",
    },
    {
      title: "Best channel",
      desc: "I have to create my channel",
      status: "Complete",
    },
    {
      title: "Best channel",
      desc: "I have to create my channel",
      status: "InComplete",
    },
    {
      title: "Best channel",
      desc: "I have to create my channel",
      status: "Complete",
    },
    {
      title: "Best channel",
      desc: "I have to create my channel",
      status: "InComplete",
    },
  ];

  const [importantButton, setImportantButton] = useState("InComplete");
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div className="flex flex-col justify-between border border-r-red-50 bg-gray-700 rounded-xl p-4">
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  items.status === "Complete" ? "bg-green-500" : "bg-red-500"
                } p-2 rounded"`}
              >
                {items.status}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl flex font-semibold justify-around">
                <button>
                  <CiHeart />
                </button>
                <button>
                  <FaRegEdit />
                </button>

                <button>
                  <RiDeleteBin2Line />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button className="flex flex-col justify-center items-center border border-r-red-50 bg-gray-700 rounded-xl p-4 hover:scale-105 transition-all duration-300" onClick={() => setInputDiv("fixed")}>
          <MdAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4"> Add Tasks</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
