
import { Visualization, TableData, GeneratedQuery } from "@/types";

// Sample business dataset
const sampleSalesData = [
  { month: 'Jan', sales: 4000, profit: 1200, customers: 120 },
  { month: 'Feb', sales: 3000, profit: 900, customers: 98 },
  { month: 'Mar', sales: 5000, profit: 1500, customers: 140 },
  { month: 'Apr', sales: 4500, profit: 1350, customers: 125 },
  { month: 'May', sales: 6000, profit: 1800, customers: 160 },
  { month: 'Jun', sales: 7000, profit: 2100, customers: 180 },
  { month: 'Jul', sales: 8000, profit: 2400, customers: 210 },
  { month: 'Aug', sales: 7500, profit: 2250, customers: 200 },
  { month: 'Sep', sales: 6500, profit: 1950, customers: 170 },
  { month: 'Oct', sales: 5500, profit: 1650, customers: 150 },
  { month: 'Nov', sales: 7000, profit: 2100, customers: 190 },
  { month: 'Dec', sales: 9000, profit: 2700, customers: 230 },
];

const employeeData = [
  { id: 1, name: 'John Smith', department: 'Sales', performance: 92, salary: 75000 },
  { id: 2, name: 'Jane Doe', department: 'Marketing', performance: 88, salary: 70000 },
  { id: 3, name: 'Robert Brown', department: 'Engineering', performance: 95, salary: 95000 },
  { id: 4, name: 'Emily Wilson', department: 'Sales', performance: 85, salary: 72000 },
  { id: 5, name: 'Michael Davis', department: 'Finance', performance: 90, salary: 85000 },
  { id: 6, name: 'Sarah Miller', department: 'Engineering', performance: 94, salary: 92000 },
  { id: 7, name: 'David Garcia', department: 'Marketing', performance: 86, salary: 68000 },
  { id: 8, name: 'Lisa Johnson', department: 'Sales', performance: 89, salary: 74000 },
  { id: 9, name: 'James Wilson', department: 'Finance', performance: 91, salary: 82000 },
  { id: 10, name: 'Jessica Lee', department: 'Engineering', performance: 97, salary: 98000 },
];

const productData = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1200, cost: 800, inventory: 45 },
  { id: 2, name: 'Smartphone X', category: 'Electronics', price: 800, cost: 500, inventory: 120 },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 250, cost: 150, inventory: 30 },
  { id: 4, name: 'Desk Lamp', category: 'Home', price: 45, cost: 20, inventory: 80 },
  { id: 5, name: 'Coffee Maker', category: 'Kitchen', price: 95, cost: 60, inventory: 25 },
  { id: 6, name: 'Bluetooth Speaker', category: 'Electronics', price: 120, cost: 70, inventory: 60 },
  { id: 7, name: 'Ergonomic Desk', category: 'Furniture', price: 350, cost: 220, inventory: 15 },
  { id: 8, name: 'Fitness Tracker', category: 'Wearables', price: 130, cost: 75, inventory: 90 },
];

// Predefined responses for common business questions
const responseTemplates: Record<string, {
  query: GeneratedQuery,
  response: string,
  visualizations: Visualization[],
  tableData?: TableData
}> = {
  "sales trend": {
    query: { 
      sql: "SELECT month, sales FROM sales_data ORDER BY month",
      explanation: "Retrieving monthly sales data to analyze trends over time"
    },
    response: "Looking at our sales data for the past year, we can observe a consistent upward trend with some seasonal fluctuations. Sales started at $4,000 in January and peaked at $9,000 in December, representing a 125% increase. The summer months (June-August) showed particularly strong performance with sales exceeding $7,000 each month. This positive trend suggests our business strategies have been effective at driving revenue growth throughout the year.",
    visualizations: [
      {
        id: "sales-trend",
        type: "line",
        title: "Monthly Sales Trend",
        data: sampleSalesData,
        config: {
          xAxis: "month",
          yAxis: "sales",
          dataKey: "month",
          colors: ["#4f46e5"]
        }
      }
    ],
    tableData: {
      headers: ["Month", "Sales ($)"],
      rows: sampleSalesData.map(item => [item.month, item.sales.toLocaleString()])
    }
  },
  "profit margin": {
    query: { 
      sql: "SELECT month, (profit/sales)*100 as profit_margin FROM sales_data",
      explanation: "Calculating monthly profit margins (profit as percentage of sales)"
    },
    response: "The profit margin has remained consistent at approximately 30% throughout the year. This indicates that for every dollar in sales, the company retains about 30 cents as profit after accounting for costs. This consistency suggests stable cost management practices and pricing strategies across all months, despite the variations in total sales volume.",
    visualizations: [
      {
        id: "profit-margin",
        type: "bar",
        title: "Monthly Profit Margins",
        data: sampleSalesData.map(item => ({
          month: item.month,
          profitMargin: ((item.profit / item.sales) * 100).toFixed(1)
        })),
        config: {
          xAxis: "month",
          yAxis: "profitMargin",
          dataKey: "month",
          colors: ["#10b981"]
        }
      }
    ],
    tableData: {
      headers: ["Month", "Sales ($)", "Profit ($)", "Profit Margin (%)"],
      rows: sampleSalesData.map(item => [
        item.month, 
        item.sales.toLocaleString(), 
        item.profit.toLocaleString(), 
        ((item.profit / item.sales) * 100).toFixed(1) + '%'
      ])
    }
  },
  "department performance": {
    query: { 
      sql: "SELECT department, AVG(performance) as avg_performance, AVG(salary) as avg_salary FROM employees GROUP BY department",
      explanation: "Grouping employees by department and calculating average performance scores and salaries"
    },
    response: "Analysis of departmental performance shows that the Engineering department has the highest average performance score at 95.3, followed by Finance at 90.5. The Engineering department also has the highest average salary at $95,000, which aligns with their superior performance metrics. Sales and Marketing departments show comparable performance levels at 88.7 and 87.0 respectively, with corresponding salary levels that reflect this performance hierarchy.",
    visualizations: [
      {
        id: "dept-performance",
        type: "bar",
        title: "Average Performance by Department",
        data: [
          { department: "Engineering", avgPerformance: 95.3 },
          { department: "Finance", avgPerformance: 90.5 },
          { department: "Sales", avgPerformance: 88.7 },
          { department: "Marketing", avgPerformance: 87.0 },
        ],
        config: {
          xAxis: "department",
          yAxis: "avgPerformance",
          dataKey: "department",
          colors: ["#3b82f6"]
        }
      }
    ],
    tableData: {
      headers: ["Department", "Avg. Performance", "Avg. Salary ($)"],
      rows: [
        ["Engineering", "95.3", "95,000"],
        ["Finance", "90.5", "83,500"],
        ["Sales", "88.7", "73,667"],
        ["Marketing", "87.0", "69,000"],
      ]
    }
  },
  "product profitability": {
    query: { 
      sql: "SELECT name, category, (price - cost) as profit_per_unit, ((price - cost)/cost)*100 as roi FROM products ORDER BY roi DESC",
      explanation: "Calculating profit per unit and return on investment for each product"
    },
    response: "The product profitability analysis reveals that Desk Lamp has the highest ROI at 125%, generating $25 profit on a $20 cost. Among electronics, Laptop Pro has the best profit per unit at $400, but a lower ROI (50%) compared to Smartphone X (60%). Furniture items show moderate profitability, with the Ergonomic Desk generating $130 profit per unit with a 59% ROI. Kitchen and Home categories generally show higher ROI percentages despite lower absolute profit values.",
    visualizations: [
      {
        id: "product-profit",
        type: "bar",
        title: "Profit per Unit by Product",
        data: productData.map(p => ({
          name: p.name,
          profitPerUnit: p.price - p.cost
        })),
        config: {
          xAxis: "name",
          yAxis: "profitPerUnit",
          dataKey: "name",
          colors: ["#f59e0b"]
        }
      }
    ],
    tableData: {
      headers: ["Product", "Category", "Price ($)", "Cost ($)", "Profit ($)", "ROI (%)"],
      rows: productData.map(p => [
        p.name,
        p.category,
        p.price,
        p.cost,
        (p.price - p.cost),
        (((p.price - p.cost) / p.cost) * 100).toFixed(1) + '%'
      ])
    }
  },
  "customer acquisition": {
    query: { 
      sql: "SELECT month, customers, sales/customers as revenue_per_customer FROM sales_data",
      explanation: "Calculating revenue per customer for each month"
    },
    response: "Our customer acquisition analysis shows that we've grown from 120 customers in January to 230 in December, a 91.7% increase. The revenue per customer has remained relatively stable, averaging around $35 throughout the year. There was a slight upward trend in per-customer value during the second half of the year, suggesting improvements in either customer quality or average purchase value. The correlation between total customers and overall sales is strong, indicating customer growth as a primary driver of our revenue increases.",
    visualizations: [
      {
        id: "customer-growth",
        type: "line",
        title: "Monthly Customer Growth",
        data: sampleSalesData,
        config: {
          xAxis: "month",
          yAxis: "customers",
          dataKey: "month",
          colors: ["#ec4899"]
        }
      }
    ],
    tableData: {
      headers: ["Month", "Customers", "Sales ($)", "Revenue per Customer ($)"],
      rows: sampleSalesData.map(item => [
        item.month, 
        item.customers, 
        item.sales.toLocaleString(), 
        (item.sales / item.customers).toFixed(2)
      ])
    }
  }
};

// Function to process a natural language query and return results
export const processQuery = async (query: string): Promise<{
  generatedQuery: GeneratedQuery;
  response: string;
  visualizations: Visualization[];
  tableData?: TableData;
}> => {
  // Wait to simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple keyword matching for demo purposes
  let result;
  if (query.toLowerCase().includes("sales") && query.toLowerCase().includes("trend")) {
    result = responseTemplates["sales trend"];
  } else if (query.toLowerCase().includes("profit") && query.toLowerCase().includes("margin")) {
    result = responseTemplates["profit margin"];
  } else if (query.toLowerCase().includes("department") && query.toLowerCase().includes("performance")) {
    result = responseTemplates["department performance"];
  } else if (query.toLowerCase().includes("product") && 
            (query.toLowerCase().includes("profitability") || query.toLowerCase().includes("profit"))) {
    result = responseTemplates["product profitability"];
  } else if (query.toLowerCase().includes("customer") && 
            (query.toLowerCase().includes("acquisition") || query.toLowerCase().includes("growth"))) {
    result = responseTemplates["customer acquisition"];
  } else {
    // Default response if no matching query is found
    return {
      generatedQuery: { 
        sql: "-- No specific SQL generated for this query",
        explanation: "The system couldn't determine the exact SQL needed for this question"
      },
      response: "I'm not sure how to answer that specific business question with the available data. Try asking about sales trends, profit margins, department performance, product profitability, or customer acquisition for more detailed analysis.",
      visualizations: []
    };
  }
  
  return {
    generatedQuery: result.query,
    response: result.response,
    visualizations: result.visualizations,
    tableData: result.tableData
  };
};
