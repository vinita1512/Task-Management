import React, { useEffect, useState } from "react";
import { TbNotes } from "react-icons/tb";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
  const [Data, setData] = useState();

  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/login");
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
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
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {Data && (
        <div className="bg-customTealBlue w-full p-2 rounded border-double border-8">
          <h2 className="text-xl font-semibold border-b font-mono">
            {Data.username}
          </h2>
          <h4 className="text-gray mb-1 font-mono">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className={`my-2 flex items-center p-2 transition-all duration-100 border-2 rounded ${
              location.pathname === items.link
                ? "bg-customTealBlue border-b-8"
                : "hover:bg-customTealBlue"
            }`}
          >
            {items.icons}
            &nbsp;
            {items.title}
          </Link>
        ))}
      </div>
      <div>
        <button
          className="bg-customTealBlue w-full p-2 rounded hover:border-2"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
