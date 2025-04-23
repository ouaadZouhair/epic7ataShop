import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
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

  // Sample data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Revenue (Dhs)',
      data: [12000, 19000, 15000, 18000, 21000, 23000, 25000, 22000, 24000, 26000, 28000, 20000],
      backgroundColor: (context) => {
        return context.dataset.data[context.dataIndex] > 20000 
          ? 'rgba(59, 130, 246, 1)' 
          : 'rgba(156, 163, 175, 1)';
      },
      hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)',
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

  const dailyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Revenue (Dhs)',
      data: [3500, 4200, 3800, 5100, 4900, 6200, 5800],
      backgroundColor: (context) => {
        return context.dataset.data[context.dataIndex] > 4000 
          ? 'rgba(59, 130, 246, 1)' 
          : 'rgba(156, 163, 175, 1)';
      },
      hoverBackgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderRadius: 6,
      borderSkipped: false,
    }]
  };

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
        <Bar 
          data={timeRange === 'monthly' ? monthlyData : dailyData} 
          options={options} 
        />
      </div>
      
      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500">
        {timeRange === 'monthly' ? 'Showing last 12 months' : 'Showing last 7 days'}
      </div>
    </div>
  );
};

export default RevenueChart;