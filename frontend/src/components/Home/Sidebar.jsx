import React, { useEffect, useState } from "react";
import { TbNotes } from "react-icons/tb";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
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

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    toast.success("Logout successful");
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    navigate("/login");
  };

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
          `${url}/api/v1/getalltasks`,
          {
            headers,
          }
        );
        setData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <div className="flex flex-col h-full">
        {loading ? (
          <p className="text-center text-gray-400">Loading user data...</p>
        ) : data ? (
          <div className="bg-customTealBlue w-full p-2 rounded border-double border-8 mb-4">
            <h2 className="text-xl font-semibold border-b font-mono">
              {data.username}
            </h2>
            <h4 className="text-gray mb-1 font-mono">{data.email}</h4>
            <hr />
          </div>
        ) : (
          <p className="text-center text-gray-400">No user data available.</p>
        )}
        <div className="flex-1 overflow-y-auto">
          {sidebarItems.map((items, i) => (
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
            className="bg-customTealBlue w-full p-2 rounded hover:border-2 mt-2"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
