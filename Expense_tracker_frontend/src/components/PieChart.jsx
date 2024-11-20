import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const EnhancedPieChart = ({ token }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for the chart
  const [error, setError] = useState(null); // Error state to handle fetch errors

  // Fetch aggregated expense data for the pie chart
  useEffect(() => {
    const fetchPieChartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenseRoutes/pie', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Fetched Pie Chart Data:', response.data); // Debugging log
        setData(response.data);
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching aggregated data:', error);
        setError('Failed to fetch data'); // Set error state on failure
        setLoading(false);
      }
    };

    if (token) {
      fetchPieChartData();
    } else {
      setLoading(false); // Stop loading if no token is available
    }
  }, [token]);

  // Show loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle empty data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="no-data">No expense data available</div>;
  }

  // Define a broader, visually distinct color palette
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    '#E7E9ED', '#85E085', '#FF6384', '#F06292', '#64B5F6', '#81C784'
  ];

  return (
    <div className="enhanced-piechart-container">
      <h2 className="chart-title"></h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%" 
            cy="50%"
            outerRadius={80} // Smaller radius
            innerRadius={40}  // Smaller inner radius for donut effect
            fill="#8884d8"
            paddingAngle={5}  // Reduced padding angle
            label={({ category, value }) => `${category}: ₹${value}`} 
            labelStyle={{
              fontSize: '12px',  // Adjust label font size for better visibility
              fill: '#fff',
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            wrapperStyle={{
              paddingTop: '10px',
              fontSize: '12px',
              fontWeight: '500',
              color: '#ffffff',
            }}
          />
          <Tooltip
            formatter={(value, name) => [`₹${value}`, `${name}`]}
            wrapperStyle={{
              backgroundColor: '#333',
              border: 'none',
              borderRadius: '8px',
              padding: '8px',
              color: '#fff',
              fontSize: '12px',  // Reduced tooltip font size
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EnhancedPieChart;
