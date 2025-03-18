import React from "react";
import "./Dashbord.css";
import menuIcon from "../assets/images/icon/menu.png";
import shareIcon from "../assets/images/icon/share.png";
import downloadIcon from "../assets/images/icon/save.png";
import plusIcon from "../assets/images/icon/plus.png";
import repeatIcon from "../assets/images/icon/repeat.png";
export default function Dashboard() {
  return (
    <>
      <div className="container">
        <div className="flex justify-between items-center p-4 pr-5">
          <div className="dashboardNavLeft">
            <h1>Employees</h1>{" "}
          </div>
          <div className="dashboardNavRight w-72 flex justify-around items-center">
            <div className="share flex justify-center items-center cursor-pointer">
              <img src={shareIcon} alt="" />
            </div>
            <div className="menu flex justify-center items-center cursor-pointer">
              <img src={menuIcon} alt="" />
            </div>
            <div className="download flex justify-center items-center cursor-pointer">
              <img src={downloadIcon} alt="" />
            </div>
            <div className="plus flex justify-center items-center cursor-pointer">
              <img src={plusIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="DashboardTable bg-white mr-8 h-screen p-4 pr-3">
          <div className="DashboardTableSide p-4  flex justify-around">
            <form className="relative w-full max-w-xs">
              <input
                type="text"
                id="searchInputDashbord"
                className="w-full   p-2.5 pl-10"
                placeholder="Search"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-10  flex items-center text-gray-500"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>

            <div className="repeat flex justify-center items-center cursor-pointer">
              <img src={repeatIcon} alt="" />
            </div>
          </div>
          <div className="TableSection w-full text-left p-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="text-gray-700 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-2 w-1/12">ID</th>
                  <th className="px-4 py-2 w-1/6">Employee ID</th>
                  <th className="px-4 py-2 w-1/6">Name</th>
                  <th className="px-4 py-2 w-1/6">Email</th>
                  <th className="px-4 py-2 w-1/7">Department</th>
                  <th className="px-4 py-2 w-1/7">Designation</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">01</td>
                  <td className="px-4 py-2">123456789</td>
                  <td className="px-4 py-2">Md. Shoaib Shifat</td>
                  <td className="px-4 py-2">abdulhadi@gmail.com</td>
                  <td className="px-4 py-2">IT</td>
                  <td className="px-4 py-2">Developer</td>
                  <td className="px-4 py-2">
                    <button className=" px-1 py-1 text-sm rounded-md ">
                      <div className="IconAction1 rounded-full flex justify-center items-center ">
                        {" "}
                        <i class="fa-solid fa-arrow-up-from-bracket"></i>
                      </div>
                    </button>
                    <button className=" px-1 py-1 text-sm rounded-md ml-2 ">
                      <span className="IconAction2 rounded-full flex justify-center items-center">
                        {" "}
                        <i class="fa-solid fa-eye"></i>
                      </span>
                    </button>
                    <button className=" px-1 py-1 text-sm rounded-md ml-2 ">
                      <span className="IconAction3 rounded-full flex justify-center items-center">
                        {" "}
                        <i class="fa-solid fa-trash"></i>
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
