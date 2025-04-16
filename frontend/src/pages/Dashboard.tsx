import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard: React.FC = () => {
  const categoryData = [
    { name: "Food", value: 300 },
    { name: "Travel", value: 150 },
    { name: "Entertainment", value: 100 },
  ];

  const monthlyData = [
    { month: "January", expense: 400, budget: 300 },
    { month: "February", expense: 250, budget: 300 },
    { month: "March", expense: 350, budget: 300 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <h1>Dashboard Page</h1>

      {/* Category-Wise Expense (Pie Chart) */}
      <h3>Category-Wise Expense</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={categoryData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {categoryData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      {/* Monthly Expense (Bar Chart with Conditional Highlighting) */}
      <h3>Monthly Expense</h3>
      <BarChart width={500} height={300} data={monthlyData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="expense"
          fill="#8884d8"
          name="Expense"
          label={{ position: "top" }}
        >
          {monthlyData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.expense > entry.budget ? "#FF0000" : "#0088FE"} // Highlight if expense > budget
            />
          ))}
        </Bar>
        <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
