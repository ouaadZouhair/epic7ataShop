import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setLoading(true);
        const endpoint = timeRange === 'monthly' 
          ? 'http://localhost:3000/api/v1/analytics/revenue/monthly' 
          : 'http://localhost:3000/api/v1/analytics/revenue/daily';
        
        const response = await axios.get(endpoint, { withCredentials: true });
        
        setChartData({
          labels: response.data.data.labels,
          datasets: [{
            label: 'Revenue (Dhs)',
            data: response.data.data.revenue,
            backgroundColor: (context) => {
              return context.dataset.data[context.dataIndex] > (timeRange === 'monthly' ? 20000 : 4000)
                ? 'rgba(59, 130, 246, 1)' 
                : 'rgba(156, 163, 175, 1)';
            },
            hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)',
            borderRadius: 6,
            borderSkipped: false,
          }]
        });
        
        setError(null);
      } catch (err) {
        setError('Failed to load revenue data');
        console.error('Error fetching revenue data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
  }, [timeRange]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 1)',
        titleFont: { size: 14, weight: '600' },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => {
            return ` ${context.parsed.y.toLocaleString()} Dhs`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: 'rgba(229, 231, 235, 1)',
        },
        ticks: {
          color: 'rgba(107, 114, 128, 1)',
          padding: 8,
        },
        title: {
          display: true,
          text: 'Amount (Dhs)',
          color: 'rgba(107, 114, 128, 1)',
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(107, 114, 128, 1)',
        },
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div className="w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 pb-2 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <p className="text-sm text-gray-500">
            {timeRange === 'monthly' ? 'Monthly revenue trends' : 'Daily revenue trends'}
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setTimeRange('daily')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === 'daily' ? 'bg-blue-500 shadow-sm text-white font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${timeRange === 'monthly' ? 'bg-blue-500 shadow-sm text-white font-medium' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="px-6 pb-6 h-80">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          <Bar 
            data={chartData} 
            options={options} 
          />
        )}
      </div>
      
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
        {timeRange === 'monthly' ? 'Showing current year' : 'Showing current week'}
      </div>
    </div>
  );
};

export default RevenueChart;