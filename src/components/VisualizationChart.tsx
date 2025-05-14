
import { Visualization } from "@/types";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface VisualizationChartProps {
  visualization: Visualization;
}

const VisualizationChart = ({ visualization }: VisualizationChartProps) => {
  const { type, title, data, config } = visualization;
  const colors = config.colors || ["#4f46e5", "#10b981", "#3b82f6", "#f59e0b", "#ec4899"];
  
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.dataKey || config.xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={config.yAxis} 
                stroke={colors[0]} 
                strokeWidth={2} 
                dot={{ r: 4 }} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.dataKey || config.xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={config.yAxis} fill={colors[0]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey={config.yAxis}
                nameKey={config.dataKey || config.xAxis}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={config.dataKey || config.xAxis} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey={config.yAxis} 
                stroke={colors[0]} 
                fill={colors[0]} 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      default:
        return <div>Unsupported visualization type</div>;
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {renderChart()}
    </div>
  );
};

export default VisualizationChart;
