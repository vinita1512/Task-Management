import React from "react";
import { TbNotes } from "react-icons/tb";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const data = [
    {
      title: "All tasks",
      icons: <TbNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icons: <MdLabelImportantOutline />,
      link: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icons: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted tasks",
      icons: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">vini</h2>
        <h4 className="text-gray mb-1">vini@gmail.com</h4>
        <hr />
      </div>
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-500 rounded p-2 transition-all duration-100"
          >
            {items.icons}
            &nbsp;
            {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-600 w-full p-2 rounded">Logout</button>
      </div>
    </>
  );
};

export default Sidebar;
