import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AdminHeader from "../../Components/AdminHeader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashBoard = () => {
  const [incidents, setIncidents] = useState([]);
  const [lineChartData, setLineChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  useEffect(() => {
    const fetchIncidentsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/incident/all-Incidents"
        );
        setIncidents(response?.data || []);
        processChartData(response?.data || []);
      } catch (error) {
        console.error("Error fetching incidents data:", error);
      }
    };

    fetchIncidentsData();
  }, []);

  const processChartData = (data) => {
    // Group incidents by date for line chart
    const incidentsByDate = data.reduce((acc, incident) => {
      const date = new Date(incident.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Group incidents by type for pie chart
    const incidentsByType = data.reduce((acc, incident) => {
      const type = incident.type;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Prepare data for the line chart
    const lineLabels = Object.keys(incidentsByDate);
    const lineCounts = Object.values(incidentsByDate);

    setLineChartData({
      labels: lineLabels,
      datasets: [
        {
          label: "Number of Incidents",
          data: lineCounts,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    });

    // Prepare data for the pie chart
    const pieLabels = Object.keys(incidentsByType);
    const pieCounts = Object.values(incidentsByType);

    setPieChartData({
      labels: pieLabels,
      datasets: [
        {
          label: "Incidents by Type",
          data: pieCounts,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    });
  };

  return (
    <div className="flex">
      <AdminHeader />
      <div className="mt-5 p-4 flex flex-col w-full overflow-autoS">
        <h1 className="text-[30px] font-semibold place-self-center font-serif underline underline-offset-2 mb-8">
          Dashboard
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="w-full  md:w-1/2">
            {incidents.length > 0 ? (
              <Line data={lineChartData} />
            ) : (
              <p>Loading line chart data...</p>
            )}
          </div>
          <div className="w-full md:w-1/2">
            {incidents.length > 0 ? (
              <Pie data={pieChartData} />
            ) : (
              <p>Loading pie chart data...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
