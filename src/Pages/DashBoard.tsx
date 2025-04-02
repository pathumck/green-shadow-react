import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import NavBar from "../Components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import Log from "../modals/Log";
import Staff from "../modals/Staff";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [staffCount, setStaffCount] = useState(0);
  const [fieldCount, setFieldCount] = useState(0);
  const [cropCount, setCropCount] = useState(0);
  const [logCount, setLogCount] = useState(0);

  const [monthlyLogCount, setMonthlyLogCount] = useState<number[]>([]);
  const [monthlyStaffCount, setMonthlyStaffCount] = useState<number[]>([]);

  const countedStaff = useSelector((state: RootState) => state.staff.length);
  const countedFields = useSelector((state: RootState) => state.fields.length);
  const countedCrops = useSelector((state: RootState) => state.crops.length);
  const countedLogs = useSelector((state: RootState) => state.logs.length);
  const logs = useSelector((state: RootState) => state.logs);
  const staff = useSelector((state: RootState) => state.staff);

  useEffect(() => {
    setStaffCount(countedStaff);
    setFieldCount(countedFields);
    setCropCount(countedCrops);
    setLogCount(countedLogs);
    setMonthlyLogCount(getMonthlyLogCount(logs));
    setMonthlyStaffCount(getMonthlyStaffCount(staff));
  }, [countedStaff, countedFields, countedCrops, countedLogs, logs, staff]);

  const getMonthlyLogCount = (log: Log[]): number[] => {
    const currentYear = new Date().getFullYear();
    const monthlyCount = new Array(12).fill(0);

    logs.forEach((log) => {
      const logDate = new Date(log.date);
      if (logDate.getFullYear() === currentYear) {
        const month = logDate.getMonth();
        monthlyCount[month]++;
      }
    });

    return monthlyCount;
  };

  const getMonthlyStaffCount = (staff: Staff[]): number[] => {
    const currentYear = new Date().getFullYear();
    const monthlyCount = new Array(12).fill(0);
    staff.forEach((staff) => {
      const staffDate = new Date(staff.registerDate);
      if (staffDate.getFullYear() === currentYear) {
        const month = staffDate.getMonth();
        monthlyCount[month]++;
      }
    });
    return monthlyCount;
  };

  const staffChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Staff Growth",
        data: monthlyStaffCount,
        fill: false,
        borderColor: "#4CAF50",
        tension: 0.1,
      },
    ],
  };

  const fieldChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Log Count",
        data: monthlyLogCount,
        fill: false,
        borderColor: "#81C784",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Growth Data Visualization",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow-lg rounded-4 text-white"
                style={{
                  background: "linear-gradient(145deg, #2c2c2c, #388E3C)",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title mb-3 text-warning">Staff Count</h5>
                  <p className="card-text display-4 text-light mb-0">
                    {staffCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow-lg rounded-4 text-white"
                style={{
                  background: "linear-gradient(145deg, #2c2c2c, #388E3C)",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title mb-3 text-warning">Field Count</h5>
                  <p className="card-text display-4 text-light mb-0">
                    {fieldCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow-lg rounded-4 text-white"
                style={{
                  background: "linear-gradient(145deg, #2c2c2c, #388E3C)",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title mb-3 text-warning">Crop Count</h5>
                  <p className="card-text display-4 text-light mb-0">
                    {cropCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <div
                className="card shadow-lg rounded-4 text-white"
                style={{
                  background: "linear-gradient(145deg, #2c2c2c, #388E3C)",
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title mb-3 text-warning">Log Count</h5>
                  <p className="card-text display-4 text-light mb-0">
                    {logCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div
                className="card-body rounded"
                style={{ backgroundColor: "#2C3E50" }}
              >
                <h5 className="card-title text-white">Staff Growth (Chart)</h5>
                <div style={{ position: "relative", height: "245px" }}>
                  <Line data={staffChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-lg">
              <div
                className="card-body rounded"
                style={{ backgroundColor: "#2C3E50" }}
              >
                <h5 className="card-title text-white">Log Count (Chart)</h5>
                <div style={{ position: "relative", height: "245px" }}>
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
