import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TrendCharts() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get('/transactions/trends')
      .then((response) => {
        const data = response.data;
        const dates = data.map((item) => item._id);
        const amounts = data.map((item) => item.totalAmount);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Transaction Volume',
              data: amounts,
              fill: false,
              backgroundColor: 'rgba(25, 118, 210, 0.5)',
              borderColor: 'rgba(25, 118, 210, 1)',
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error fetching trend data:', error);
      });
  }, []);

  if (!chartData) {
    return <div>Loading trend data...</div>;
  }

  return (
    <div className="trend-charts">
      <Typography variant="h4" gutterBottom>
        Transaction Trends
      </Typography>
      <Line data={chartData} />
    </div>
  );
}

export default TrendCharts;
