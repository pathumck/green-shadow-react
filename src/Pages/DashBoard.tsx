import React, { useState, useEffect } from "react";
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
import { fetchFields } from "../redux/slices/fieldSlice";
import { fetchCrops } from "../redux/slices/cropSlice";
import { fetchStaff } from "../redux/slices/staffSlice";
import { fetchLogs } from "../redux/slices/logSlice";
import { fetchVehicles } from "../redux/slices/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";
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

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFields());
    dispatch(fetchCrops());
    dispatch(fetchStaff());
    dispatch(fetchLogs());
    dispatch(fetchVehicles());
  }, [dispatch]);

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
        borderColor: "#FF6347",
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
                <div style={{ position: "relative", height: "250px" }}>
                  <Line data={staffChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card shadow-sm bg-light">
              <div className="card-body">
                <h5 className="card-title text-gray">Field Count (Chart)</h5>
                <div style={{ position: "relative", height: "250px" }}>
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
