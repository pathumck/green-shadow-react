import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import NavBar from "../Components/NavBar/NavBar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [staffCount, setStaffCount] = useState(120);
  const [fieldCount, setFieldCount] = useState(25);
  const [cropCount, setCropCount] = useState(50);
  const [logCount, setLogCount] = useState(75);
  const [dummyContent, setDummyContent] = useState("This is a placeholder for any future content or data visualization.");

  useEffect(() => {}, []);

  const staffChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Staff Growth",
        data: [100, 110, 120, 130, 140, 150, 160],
        fill: false,
        borderColor: "#FF6347",
        tension: 0.1,
      },
    ],
  };

  const fieldChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Field Count",
        data: [20, 22, 23, 25, 27, 28, 30],
        fill: false,
        borderColor: "#32CD32",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Growth Data Visualization",
        color: "#4B0082",
      },
    },
  };

  return (
    <>
    <NavBar />
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title text-white">Staff Count</h5>
              <p className="card-text display-4">{staffCount}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm bg-success text-white">
            <div className="card-body">
              <h5 className="card-title text-white">Field Count</h5>
              <p className="card-text display-4">{fieldCount}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm bg-danger text-dark">
            <div className="card-body">
              <h5 className="card-title text-white">Crop Count</h5>
              <p className="card-text display-4 text-white">{cropCount}</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-4">
          <div className="card shadow-sm bg-info text-white">
            <div className="card-body">
              <h5 className="card-title text-white">Log Count</h5>
              <p className="card-text display-4">{logCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm bg-light">
            <div className="card-body">
              <h5 className="card-title text-gray">Staff Growth (Chart)</h5>
              <div style={{ position: 'relative', height: '250px' }}>
                <Line data={staffChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm bg-light">
            <div className="card-body">
              <h5 className="card-title text-gray">Field Count (Chart)</h5>
              <div style={{ position: 'relative', height: '250px' }}>
                <Line data={fieldChartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;