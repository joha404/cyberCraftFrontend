import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashbord.css";
import menuIcon from "../assets/images/icon/menu.png";
import shareIcon from "../assets/images/icon/share.png";
import downloadIcon from "../assets/images/icon/save.png";
import plusIcon from "../assets/images/icon/plus.png";
import repeatIcon from "../assets/images/icon/repeat.png";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false); // For add employee modal
  const [newEmployee, setNewEmployee] = useState({
    employeId: "",
    name: "",
    email: "",
    department: "",
    designation: "",
  }); // New employee form state

  // Fetch employee data on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://cyber-craft-backend.vercel.app/employee"
        );
        setEmployees(response.data); // Store fetched employees in state
      } catch (err) {
        setError("Error fetching employee data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const viewEmployee = async (employeeId) => {
    try {
      const response = await axios.get(
        `https://cyber-craft-backend.vercel.app/employee/${employeeId}`
      );
      setSelectedEmployee(response.data);
      setIsModalOpen(true);
    } catch (err) {
      setError("Error fetching employee details.");
    }
  };

  // Handle employee deletion
  const deleteEmployee = async (employeeId) => {
    setError(null);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://cyber-craft-backend.vercel.app/employee/delete/${employeeId}`
          );

          // Update the state by filtering out the deleted employee
          setEmployees((prevEmployees) =>
            prevEmployees.filter((employee) => employee._id !== employeeId)
          );

          Swal.fire({
            title: "Deleted!",
            text: "The employee has been deleted.",
            icon: "success",
          });
        } catch (err) {
          setError("Error deleting employee. Please try again.");
        }
      }
    });
  };

  // Handle form changes for new employee
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle employee submission
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://cyber-craft-backend.vercel.app/employee/create",
        newEmployee
      );
      // Close the modal after successful submission
      setIsAddEmployeeModalOpen(false);
      // Fetch the updated employee list
      const response = await axios.get(
        "https://cyber-craft-backend.vercel.app/employee"
      );
      setEmployees(response.data);
      Swal.fire("Success!", "Employee added successfully!", "success");
    } catch (err) {
      setError("Error adding new employee.");
    }
  };
  // make pdf
  const employeegeneratePDF = () => {
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(18);
    doc.text("Employee Details", 14, 20);

    // Create table headers
    const headers = [
      "ID",
      "Employee ID",
      "Name",
      "Email",
      "Department",
      "Designation",
    ];

    // Add employee data to the PDF
    const employeeData = employees.map((employee) => [
      employee.dbId,
      employee.employeId,
      employee.name,
      employee.email,
      employee.department,
      employee.designation,
    ]);

    // Use autoTable to create a table in the PDF
    autoTable(doc, {
      head: [headers],
      body: employeeData,
      startY: 30, // Position the table after the title
      theme: "striped",
    });

    // Save the generated PDF
    doc.save("employee_details.pdf");
  };
  const generateSingleEmployeePDF = (employee) => {
    const doc = new jsPDF();

    // Set Title
    doc.setFontSize(18);
    doc.text("Employee Details", 14, 20);

    // Employee details
    const employeeDetails = [
      ["ID:", employee.dbId],
      ["Employee ID:", employee.employeId],
      ["Name:", employee.name],
      ["Email:", employee.email],
      ["Department:", employee.department],
      ["Designation:", employee.designation],
    ];

    // Set initial position for details
    let yPos = 30;
    doc.setFontSize(12);

    employeeDetails.forEach((detail) => {
      doc.text(`${detail[0]} ${detail[1]}`, 14, yPos);
      yPos += 10;
    });

    // Save the generated PDF
    doc.save(`employee_${employee.employeId}.pdf`);
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center p-4 pr-5">
        <div className="dashboardNavLeft">
          <h1>Employees</h1>
        </div>
        <div className="dashboardNavRight w-72 flex justify-around items-center">
          <div className="share flex justify-center items-center cursor-pointer">
            <img src={shareIcon} alt="Share Icon" />
          </div>
          <div className="menu flex justify-center items-center cursor-pointer">
            <img src={menuIcon} alt="Menu Icon" />
          </div>
          <div
            className="download flex justify-center items-center cursor-pointer"
            onClick={employeegeneratePDF}
          >
            <img src={downloadIcon} alt="Download Icon" />
          </div>
          <div
            className="plus flex justify-center items-center cursor-pointer"
            onClick={() => setIsAddEmployeeModalOpen(true)}
          >
            <img src={plusIcon} alt="Plus Icon" />
          </div>
        </div>
      </div>

      <div className="DashboardTable bg-white mr-8 h-screen p-4 pr-3">
        <div className="DashboardTableSide p-4 flex justify-around">
          <form className="relative w-full max-w-xs">
            <input
              type="text"
              id="searchInputDashbord"
              className="w-full p-2.5 pl-10"
              placeholder="Search"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-10 flex items-center text-gray-500"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>

          <div className="repeat flex justify-center items-center cursor-pointer">
            <img
              src={repeatIcon}
              onClick={() => window.location.reload()}
              alt="Repeat Icon"
            />
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
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
                {employees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{employee.dbId}</td>
                    <td className="px-4 py-2">{employee.employeId}</td>
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.email}</td>
                    <td className="px-4 py-2">{employee.department}</td>
                    <td className="px-4 py-2">{employee.designation}</td>
                    <td className="px-4 py-2">
                      <button
                        className="px-1 py-1 text-sm rounded-md"
                        onClick={() => generateSingleEmployeePDF(employee)}
                      >
                        <div className="IconAction1 rounded-full flex justify-center items-center">
                          <i className="fa-solid fa-arrow-up-from-bracket"></i>
                        </div>
                      </button>
                      <button
                        onClick={() => viewEmployee(employee._id)}
                        className="px-1 py-1 text-sm rounded-md ml-2"
                      >
                        <div className="IconAction2 rounded-full flex justify-center items-center">
                          <i className="fa-solid fa-eye"></i>
                        </div>
                      </button>
                      <button
                        className="px-1 py-1 text-sm rounded-md ml-2"
                        onClick={() => deleteEmployee(employee._id)}
                      >
                        <div className="IconAction3 rounded-full flex justify-center items-center">
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {isAddEmployeeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300">
          <div className="bg-white p-6 rounded-lg shadow-xl w-1/3 transform scale-95 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
              Add New Employee
            </h2>
            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Employee Id
                </label>
                <input
                  type="number"
                  id="name"
                  name="employeId"
                  value={newEmployee.employeId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newEmployee.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="department" className="block text-gray-700">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={newEmployee.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="designation" className="block text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={newEmployee.designation}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 shadow-md"
                >
                  Add Employee
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddEmployeeModalOpen(false)}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 shadow-md"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isModalOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-2">Employee Details</h2>
            <p>
              <strong>Name:</strong> {selectedEmployee.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployee.email}
            </p>
            <p>
              <strong>Department:</strong> {selectedEmployee.department}
            </p>
            <p>
              <strong>Designation:</strong> {selectedEmployee.designation}
            </p>
            <div className="text-right mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
