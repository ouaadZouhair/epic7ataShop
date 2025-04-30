import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrderStatusChart = ({ data }) => {
    // Default data in case none is provided
    const chartData = {
        labels: data?.labels || ['Completed', 'Processing', 'Cancelled', 'Pending'],
        datasets: [
            {
                data: data?.values || [45, 30, 15, 10],
                backgroundColor: [
                    '#10B981', // green
                    '#F59E0B', // yellow
                    '#EF4444', // red
                    '#3B82F6', // blue
                ],
                borderColor: [
                    '#FFFFFF', // white border
                    '#FFFFFF',
                    '#FFFFFF',
                    '#FFFFFF',
                ],
                borderWidth: 2,
                cutout: '60%',
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: 'Inter, sans-serif',
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        },
        maintainAspectRatio: false,
        responsive: true,
    };

    return (
        <div className="bg-white rounded-lg shadow p-6 w-full flex flex-col items-center justify-start gap-5 max-w-md h-[440px]">
            <div className="flex flex-col items-start justify-center w-full text-center text-gray-600">
                <h2 className="text-lg font-semibold text-gray-900">Order Status</h2>
                <p className='text-sm text-gray-500'>Total orders {data?.total || 1000}</p>   
            </div>
            <div className="h-[300px]">
                <Doughnut data={chartData} options={options} />
            </div>

        </div>
    );
};

export default OrderStatusChart;