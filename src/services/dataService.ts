
import { Visualization, TableData, GeneratedQuery } from "@/types";

// Sample complex business dataset with bad schema, unnamed columns, inconsistent formatting
const sampleSalesData = [
  { month: 'Jan', sales: 4000, profit: 1200, customers: 120, 'Unnamed#1': 'region-A', 'status': 'active' },
  { month: 'Feb', sales: 3000, profit: 900, customers: 98, 'Unnamed#1': 'region-B', 'status': 'active'  },
  { month: 'Mar', sales: 5000, profit: 1500, customers: 140, 'Unnamed#1': 'region-A', 'status': 'pending'  },
  { month: 'Apr', sales: 4500, profit: 1350, customers: 125, 'Unnamed#1': 'region-C', 'status': 'active'  },
  { month: 'May', sales: 6000, profit: 1800, customers: 160, 'Unnamed#1': 'region-B', 'status': 'active'  },
  { month: 'Jun', sales: 7000, profit: 2100, customers: 180, 'Unnamed#1': 'region-A', 'status': 'inactive'  },
  { month: 'Jul', sales: 8000, profit: 2400, customers: 210, 'Unnamed#1': 'region-C', 'status': 'active'  },
  { month: 'Aug', sales: 7500, profit: 2250, customers: 200, 'Unnamed#1': 'region-A', 'status': null  },
  { month: 'Sep', sales: 6500, profit: 1950, customers: 170, 'Unnamed#1': 'region-B', 'status': 'inactive'  },
  { month: 'Oct', sales: 5500, profit: 1650, customers: 150, 'Unnamed#1': 'region-A', 'status': 'active'  },
  { month: 'Nov', sales: 7000, profit: 2100, customers: 190, 'Unnamed#1': 'region-C', 'status': 'pending'  },
  { month: 'Dec', sales: 9000, profit: 2700, customers: 230, 'Unnamed#1': 'region-B', 'status': 'active'  },
];

// Sample employee data with dirty/inconsistent values
const employeeData = [
  { id: 1, name: 'John Smith', department: 'Sales', performance: 92, salary: 75000 },
  { id: 2, name: 'Jane Doe', department: 'Marketing', performance: 88, salary: '70000' },
  { id: 3, name: 'Robert Brown', department: 'Engineering', performance: 95, salary: 95000 },
  { id: 4, name: 'Emily Wilson', department: 'sales', performance: 85, salary: 72000 },
  { id: 5, name: 'Michael Davis', department: 'Finance', performance: '90', salary: 85000 },
  { id: 6, name: 'Sarah Miller', department: 'eng', performance: 94, salary: 92000 },
  { id: 7, name: 'David Garcia', department: 'Marketing', performance: 86, salary: '68000' },
  { id: 8, name: 'Lisa Johnson', department: 'Sales', performance: 89, salary: 74000 },
  { id: 9, name: 'James Wilson', department: 'finance', performance: null, salary: 82000 },
  { id: 10, name: 'Jessica Lee', department: 'engineering', performance: 97, salary: 98000 },
];

// Sample data with missing values, inconsistent casing and formatting
const productData = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1200, cost: 800, inventory: 45 },
  { id: 2, name: 'Smartphone X', category: 'electronics', price: 800, cost: 500, inventory: 120 },
  { id: 3, name: 'Office Chair', category: 'Furniture', price: 250, cost: null, inventory: 30 },
  { id: 4, name: 'Desk Lamp', category: 'Home', price: 45, cost: 20, inventory: 80 },
  { id: 5, name: 'Coffee Maker', category: 'Kitchen', price: '95', cost: '60', inventory: 25 },
  { id: 6, name: 'Bluetooth Speaker', category: 'electronics', price: 120, cost: 70, inventory: 60 },
  { id: 7, name: 'Ergonomic Desk', category: 'furniture', price: 350, cost: 220, inventory: 15 },
  { id: 8, name: 'Fitness Tracker', category: 'Wearables', price: 130, cost: 75, inventory: '90' },
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
      sql: "SELECT month, sales FROM tbl_sales_data ORDER BY CASE month WHEN 'Jan' THEN 1 WHEN 'Feb' THEN 2 WHEN 'Mar' THEN 3 WHEN 'Apr' THEN 4 WHEN 'May' THEN 5 WHEN 'Jun' THEN 6 WHEN 'Jul' THEN 7 WHEN 'Aug' THEN 8 WHEN 'Sep' THEN 9 WHEN 'Oct' THEN 10 WHEN 'Nov' THEN 11 WHEN 'Dec' THEN 12 END",
      explanation: "Retrieving monthly sales data to analyze trends over time. Had to apply custom sorting for month names."
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
      headers: ["Month", "Sales ($)", "Region"],
      rows: sampleSalesData.map(item => [item.month, item.sales.toLocaleString(), item['Unnamed#1']])
    }
  },
  "profit margin": {
    query: { 
      sql: "SELECT month, CAST((profit/sales)*100 as DECIMAL(10,2)) as profit_margin FROM tbl_sales_data",
      explanation: "Calculating monthly profit margins (profit as percentage of sales). Had to use CAST to handle decimal precision."
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
      headers: ["Month", "Sales ($)", "Profit ($)", "Profit Margin (%)", "Status"],
      rows: sampleSalesData.map(item => [
        item.month, 
        item.sales.toLocaleString(), 
        item.profit.toLocaleString(), 
        ((item.profit / item.sales) * 100).toFixed(1) + '%',
        item.status || 'unknown'
      ])
    }
  },
  "department performance": {
    query: { 
      sql: "SELECT LOWER(department) as dept, AVG(CAST(performance as DECIMAL(10,2))) as avg_performance, AVG(CAST(salary as DECIMAL(10,2))) as avg_salary FROM employees GROUP BY LOWER(department)",
      explanation: "Grouping employees by department and calculating average performance scores and salaries. Required data cleaning: normalizing department names to lowercase and casting performance and salary to numeric values to handle inconsistent data types."
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
      sql: "SELECT name, INITCAP(category) as category, COALESCE(CAST(price as DECIMAL) - CAST(cost as DECIMAL), 0) as profit_per_unit, CASE WHEN CAST(cost as DECIMAL) > 0 THEN ((CAST(price as DECIMAL) - CAST(cost as DECIMAL))/CAST(cost as DECIMAL))*100 ELSE 0 END as roi FROM products WHERE cost IS NOT NULL ORDER BY roi DESC",
      explanation: "Calculating profit per unit and return on investment for each product. Had to handle: string to numeric conversion, NULL values for cost, case normalization for categories, and avoid division by zero."
    },
    response: "The product profitability analysis reveals that Desk Lamp has the highest ROI at 125%, generating $25 profit on a $20 cost. Among electronics, Laptop Pro has the best profit per unit at $400, but a lower ROI (50%) compared to Smartphone X (60%). Furniture items show moderate profitability, with the Ergonomic Desk generating $130 profit per unit with a 59% ROI. Kitchen and Home categories generally show higher ROI percentages despite lower absolute profit values. Note that Office Chair was excluded from ROI calculations due to missing cost data.",
    visualizations: [
      {
        id: "product-profit",
        type: "bar",
        title: "Profit per Unit by Product",
        data: productData.filter(p => p.cost !== null).map(p => ({
          name: p.name,
          profitPerUnit: typeof p.price === 'string' ? parseInt(p.price) - (typeof p.cost === 'string' ? parseInt(p.cost) : p.cost) : p.price - p.cost
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
      rows: productData.filter(p => p.cost !== null).map(p => {
        const price = typeof p.price === 'string' ? parseInt(p.price) : p.price;
        const cost = typeof p.cost === 'string' ? parseInt(p.cost) : p.cost;
        return [
          p.name,
          p.category,
          price,
          cost,
          (price - cost),
          (((price - cost) / cost) * 100).toFixed(1) + '%'
        ];
      })
    }
  },
  "customer acquisition": {
    query: { 
      sql: "SELECT month, customers, CAST(sales as DECIMAL)/CAST(customers as DECIMAL) as revenue_per_customer FROM tbl_sales_data",
      explanation: "Calculating revenue per customer for each month. Required explicit casting to ensure correct division operation."
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
  },
  "regional analysis": {
    query: { 
      sql: "SELECT \"Unnamed#1\" as region, SUM(sales) as total_sales, SUM(profit) as total_profit, COUNT(*) as months_active FROM tbl_sales_data GROUP BY \"Unnamed#1\"",
      explanation: "Analyzing sales by region. Had to reference the unnamed column using quotes and alias it properly for clarity."
    },
    response: "The regional analysis shows varying performance across our three regions. Region A, which was active in 5 months, generated the highest total sales at $30,000 with profits of $9,000. Region B was active in 4 months with $25,500 in sales and $7,650 in profit. Region C had the lowest overall figures with $17,000 in sales and $5,100 in profit across just 3 months. However, when normalizing for the number of active months, Region C actually shows the highest average monthly sales at $5,667.",
    visualizations: [
      {
        id: "regional-sales",
        type: "pie",
        title: "Total Sales by Region",
        data: [
          { region: "Region A", value: 30000 },
          { region: "Region B", value: 25500 },
          { region: "Region C", value: 17000 },
        ],
        config: {
          xAxis: "region",
          yAxis: "value",
          dataKey: "region",
          colors: ["#8b5cf6", "#ec4899", "#3b82f6"]
        }
      }
    ],
    tableData: {
      headers: ["Region", "Total Sales ($)", "Total Profit ($)", "Months Active", "Avg. Monthly Sales ($)"],
      rows: [
        ["Region A", "30,000", "9,000", "5", "6,000"],
        ["Region B", "25,500", "7,650", "4", "6,375"],
        ["Region C", "17,000", "5,100", "3", "5,667"]
      ]
    }
  }  
};

// Function to handle vague queries by analyzing keywords and context
const handleVagueQuery = (query: string): {
  generatedQuery: GeneratedQuery;
  response: string;
  visualizations: Visualization[];
  tableData?: TableData;
} => {
  // Simple keyword extraction
  const keywords = query.toLowerCase().split(/\s+/);
  
  // Check for business metric keywords
  const hasPerformanceKeywords = keywords.some(word => 
    ["performance", "doing", "results", "metrics", "kpi"].includes(word));
    
  const hasSalesKeywords = keywords.some(word => 
    ["sales", "revenue", "selling", "sell", "sold", "money", "income"].includes(word));
    
  const hasRegionKeywords = keywords.some(word => 
    ["region", "area", "location", "where", "regional", "geography", "geographic"].includes(word));
    
  const hasProfitKeywords = keywords.some(word => 
    ["profit", "margin", "earnings", "roi", "return", "profitability"].includes(word));
    
  const hasProductKeywords = keywords.some(word => 
    ["product", "item", "offering", "merchandise", "goods", "inventory"].includes(word));
    
  const hasCustomerKeywords = keywords.some(word => 
    ["customer", "client", "consumer", "buyer", "user", "people"].includes(word));
    
  const hasDepartmentKeywords = keywords.some(word => 
    ["department", "team", "group", "division", "staff", "employee", "personnel"].includes(word));
  
  // Decision logic for vague queries
  if (hasPerformanceKeywords) {
    if (hasDepartmentKeywords) {
      return responseTemplates["department performance"];
    } else if (hasProductKeywords) {
      return responseTemplates["product profitability"];
    } else {
      // Default to overall sales trend for general performance questions
      return responseTemplates["sales trend"];
    }
  } else if (hasSalesKeywords) {
    if (hasRegionKeywords) {
      return responseTemplates["regional analysis"];
    } else {
      return responseTemplates["sales trend"];
    }
  } else if (hasProfitKeywords) {
    if (hasProductKeywords) {
      return responseTemplates["product profitability"];
    } else {
      return responseTemplates["profit margin"];
    }
  } else if (hasCustomerKeywords) {
    return responseTemplates["customer acquisition"];
  } else if (hasDepartmentKeywords) {
    return responseTemplates["department performance"];
  } else if (hasProductKeywords) {
    return responseTemplates["product profitability"];
  } else if (hasRegionKeywords) {
    return responseTemplates["regional analysis"];
  }
  
  // If no clear direction, provide a general overview
  return {
    generatedQuery: { 
      sql: "-- General overview query\nSELECT 'Overall Business Performance' as metric, \n  SUM(sales) as total_sales, \n  AVG(profit/sales)*100 as avg_margin\nFROM tbl_sales_data",
      explanation: "This is a general overview query to provide high-level business metrics since the question was vague."
    },
    response: "Based on your general inquiry, here's an overview of our business performance: Total sales across all periods were $73,000 with an average profit margin of 30%. Sales have shown an overall positive trend throughout the year, with December being our strongest month at $9,000. Our customer base grew from 120 in January to 230 in December, showing consistent growth. For more specific insights, you could ask about sales trends, regional performance, profit margins, department performance, or product profitability.",
    visualizations: [
      {
        id: "overall-performance",
        type: "area",
        title: "Sales & Profit Overview",
        data: sampleSalesData,
        config: {
          xAxis: "month",
          yAxis: "sales",
          dataKey: "month",
          colors: ["#3b82f6"]
        }
      }
    ],
    tableData: {
      headers: ["Month", "Sales ($)", "Profit ($)", "Profit Margin (%)", "Customers"],
      rows: sampleSalesData.map(item => [
        item.month, 
        item.sales.toLocaleString(), 
        item.profit.toLocaleString(), 
        ((item.profit / item.sales) * 100).toFixed(1) + '%',
        item.customers
      ])
    }
  };
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
  
  const queryLower = query.toLowerCase();
  
  // Check if the query is very vague
  const vagueQueryIndicators = [
    "how are we doing",
    "how is business",
    "what's going on",
    "tell me about",
    "show me",
    "give me",
    "what can you tell me",
    "what do we know",
    "overview",
    "performance",
    "summary"
  ];
  
  // Check if query is extremely vague with minimal context
  const isVeryVague = vagueQueryIndicators.some(indicator => 
    queryLower.includes(indicator)) && queryLower.split(' ').length < 6;
    
  if (isVeryVague) {
    return handleVagueQuery(query);
  }
  
  // For more specific queries, try to match with templates
  if (queryLower.includes("sales") && queryLower.includes("trend")) {
    return responseTemplates["sales trend"];
  } else if (queryLower.includes("profit") && queryLower.includes("margin")) {
    return responseTemplates["profit margin"];
  } else if (queryLower.includes("department") && queryLower.includes("performance")) {
    return responseTemplates["department performance"];
  } else if (queryLower.includes("product") && 
            (queryLower.includes("profitability") || queryLower.includes("profit"))) {
    return responseTemplates["product profitability"];
  } else if (queryLower.includes("customer") && 
            (queryLower.includes("acquisition") || queryLower.includes("growth"))) {
    return responseTemplates["customer acquisition"];
  } else if (queryLower.includes("region") || queryLower.includes("regional")) {
    return responseTemplates["regional analysis"];
  } else {
    // For queries that don't match exactly but have some relevant keywords
    return handleVagueQuery(query);
  }
};
