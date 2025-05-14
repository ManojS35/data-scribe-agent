
import { Visualization, TableData, GeneratedQuery, AnalyticalInsights, RegionalInsight, TrendInsight, AnomalyInsight } from "@/types";

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

// Function to generate regional insights
const generateRegionalInsights = (data: any[]): RegionalInsight[] => {
  // Group by region
  const regionMap = new Map();
  
  data.forEach(item => {
    const region = item['Unnamed#1'];
    if (!region) return;
    
    if (!regionMap.has(region)) {
      regionMap.set(region, {
        sales: 0,
        profit: 0,
        customers: 0,
        months: 0
      });
    }
    
    const stats = regionMap.get(region);
    stats.sales += item.sales;
    stats.profit += item.profit;
    stats.customers += item.customers;
    stats.months += 1;
  });
  
  // Calculate company averages for comparison
  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const totalCustomers = data.reduce((sum, item) => sum + item.customers, 0);
  const totalMonths = data.length;
  
  const avgSalesPerMonth = totalSales / totalMonths;
  const avgProfitPerMonth = totalProfit / totalMonths;
  const avgProfitMargin = (totalProfit / totalSales) * 100;
  
  // Generate insights
  const insights: RegionalInsight[] = [];
  
  for (const [region, stats] of regionMap.entries()) {
    const regionAvgSales = stats.sales / stats.months;
    const regionAvgProfit = stats.profit / stats.months;
    const regionProfitMargin = (stats.profit / stats.sales) * 100;
    
    // Sales performance
    const salesPerformance = regionAvgSales - avgSalesPerMonth;
    const salesPercentChange = (salesPerformance / avgSalesPerMonth) * 100;
    
    insights.push({
      region: region.replace('region-', 'Region '),
      metric: 'Avg. Monthly Sales',
      value: Math.round(regionAvgSales),
      trend: salesPerformance > 0 ? 'up' : salesPerformance < 0 ? 'down' : 'stable',
      percentageChange: Math.round(salesPercentChange),
      comparison: `${salesPercentChange > 0 ? 'Outperforms' : 'Underperforms'} company average by ${Math.abs(Math.round(salesPercentChange))}%`
    });
    
    // Profit margin
    const marginDifference = regionProfitMargin - avgProfitMargin;
    
    insights.push({
      region: region.replace('region-', 'Region '),
      metric: 'Profit Margin',
      value: Math.round(regionProfitMargin * 10) / 10,
      trend: marginDifference > 0 ? 'up' : marginDifference < 0 ? 'down' : 'stable',
      percentageChange: Math.round(marginDifference * 10) / 10,
      comparison: `${Math.abs(Math.round(marginDifference * 10) / 10)}% ${marginDifference > 0 ? 'higher' : 'lower'} than company average`
    });
  }
  
  return insights;
};

// Function to generate trend insights
const generateTrendInsights = (data: any[]): TrendInsight[] => {
  const insights: TrendInsight[] = [];
  
  // Sort data chronologically (assuming month names)
  const monthOrder = { 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 
                       'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12 };
  
  const sortedData = [...data].sort((a, b) => monthOrder[a.month as keyof typeof monthOrder] - monthOrder[b.month as keyof typeof monthOrder]);
  
  // Calculate quarter data
  const quarters = [
    { name: 'Q1', data: sortedData.slice(0, 3) },
    { name: 'Q2', data: sortedData.slice(3, 6) },
    { name: 'Q3', data: sortedData.slice(6, 9) },
    { name: 'Q4', data: sortedData.slice(9, 12) }
  ];
  
  // Calculate metrics by quarter
  const quarterlyMetrics = quarters.map(q => ({
    quarter: q.name,
    sales: q.data.reduce((sum, item) => sum + item.sales, 0),
    profit: q.data.reduce((sum, item) => sum + item.profit, 0),
    customers: q.data.reduce((sum, item) => sum + item.customers, 0)
  }));
  
  // Year-over-year growth (comparing Q4 to Q1)
  const salesGrowth = ((quarterlyMetrics[3].sales - quarterlyMetrics[0].sales) / quarterlyMetrics[0].sales) * 100;
  const profitGrowth = ((quarterlyMetrics[3].profit - quarterlyMetrics[0].profit) / quarterlyMetrics[0].profit) * 100;
  const customerGrowth = ((quarterlyMetrics[3].customers - quarterlyMetrics[0].customers) / quarterlyMetrics[0].customers) * 100;
  
  // Identify trends
  insights.push({
    metric: 'Sales Growth',
    period: 'Q1 to Q4',
    direction: salesGrowth > 15 ? 'increasing' : salesGrowth < -5 ? 'decreasing' : 'stable',
    percentageChange: Math.round(salesGrowth),
    forecast: salesGrowth > 0 ? 'Projected to continue increasing based on current trajectory' : 'Requires attention to reverse downward trend'
  });
  
  insights.push({
    metric: 'Profit Growth',
    period: 'Q1 to Q4',
    direction: profitGrowth > 15 ? 'increasing' : profitGrowth < -5 ? 'decreasing' : 'stable',
    percentageChange: Math.round(profitGrowth),
    seasonality: identifySeasonality(sortedData, 'profit')
  });
  
  insights.push({
    metric: 'Customer Base',
    period: 'Q1 to Q4',
    direction: customerGrowth > 10 ? 'increasing' : customerGrowth < -5 ? 'decreasing' : 'stable',
    percentageChange: Math.round(customerGrowth),
    forecast: customerGrowth > 20 ? 'Exceptional growth that may require infrastructure scaling' : 
              customerGrowth > 0 ? 'Healthy growth trajectory' : 'Customer retention strategies recommended'
  });
  
  // Quarter-to-quarter analysis
  for (let i = 1; i < quarterlyMetrics.length; i++) {
    const qSalesChange = ((quarterlyMetrics[i].sales - quarterlyMetrics[i-1].sales) / quarterlyMetrics[i-1].sales) * 100;
    
    if (Math.abs(qSalesChange) > 25) {
      insights.push({
        metric: `${quarterlyMetrics[i-1].quarter} to ${quarterlyMetrics[i].quarter} Sales`,
        period: `${quarterlyMetrics[i-1].quarter}-${quarterlyMetrics[i].quarter}`,
        direction: qSalesChange > 0 ? 'increasing' : 'decreasing',
        percentageChange: Math.round(qSalesChange),
        seasonality: Math.abs(qSalesChange) > 40 ? 'Significant seasonal effect detected' : undefined
      });
    }
  }
  
  return insights;
};

// Helper function to identify seasonality patterns
const identifySeasonality = (data: any[], metric: string): string => {
  // Simple algorithm to detect seasonality patterns
  const winter = (data[0][metric] + data[1][metric] + data[11][metric]) / 3;
  const spring = (data[2][metric] + data[3][metric] + data[4][metric]) / 3;
  const summer = (data[5][metric] + data[6][metric] + data[7][metric]) / 3;
  const fall = (data[8][metric] + data[9][metric] + data[10][metric]) / 3;
  
  const seasons = [
    { name: 'Winter', value: winter },
    { name: 'Spring', value: spring },
    { name: 'Summer', value: summer },
    { name: 'Fall', value: fall }
  ];
  
  seasons.sort((a, b) => b.value - a.value);
  
  const strongest = seasons[0];
  const weakest = seasons[3];
  
  const difference = ((strongest.value - weakest.value) / weakest.value) * 100;
  
  if (difference > 30) {
    return `Strong ${strongest.name} seasonality detected (${Math.round(difference)}% higher than ${weakest.name})`;
  } else if (difference > 15) {
    return `Moderate ${strongest.name} seasonality detected`;
  } else {
    return 'No significant seasonality detected';
  }
};

// Function to detect anomalies in the data
const detectAnomalies = (data: any[]): AnomalyInsight[] => {
  const anomalies: AnomalyInsight[] = [];
  
  // Function to calculate standard deviation
  const calculateStdDev = (values: number[], mean: number): number => {
    const squareDiffs = values.map(value => Math.pow(value - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, value) => sum + value, 0) / values.length;
    return Math.sqrt(avgSquareDiff);
  };
  
  // Check sales anomalies
  const salesValues = data.map(item => item.sales);
  const avgSales = salesValues.reduce((sum, value) => sum + value, 0) / salesValues.length;
  const salesStdDev = calculateStdDev(salesValues, avgSales);
  
  const salesOutlierThreshold = 1.5; // Number of standard deviations
  
  data.forEach(item => {
    const salesDeviation = Math.abs(item.sales - avgSales) / salesStdDev;
    
    if (salesDeviation > salesOutlierThreshold) {
      anomalies.push({
        metric: 'Sales',
        value: item.sales,
        expectedRange: [Math.round(avgSales - salesStdDev), Math.round(avgSales + salesStdDev)],
        deviation: parseFloat(salesDeviation.toFixed(2)),
        period: item.month,
        possibleCause: item.sales > avgSales 
          ? `Unusually high sales in ${item.month}, potentially due to seasonal promotion or market event` 
          : `Unusually low sales in ${item.month}, may require investigation into market conditions or operational issues`
      });
    }
  });
  
  // Check profit margin anomalies
  data.forEach(item => {
    const profitMargin = (item.profit / item.sales) * 100;
    const avgProfitMargin = 30; // Based on the data, profit margin is consistently around 30%
    const marginDeviation = Math.abs(profitMargin - avgProfitMargin);
    
    if (marginDeviation > 3) { // More than 3% deviation from expected profit margin
      anomalies.push({
        metric: 'Profit Margin',
        value: Math.round(profitMargin * 10) / 10,
        expectedRange: [27, 33], // Expected range for profit margin
        deviation: parseFloat((marginDeviation / 3).toFixed(2)),
        period: item.month,
        possibleCause: profitMargin > avgProfitMargin 
          ? `Higher than expected profit margin in ${item.month}, possibly due to improved cost efficiency or premium pricing` 
          : `Lower than expected profit margin in ${item.month}, may indicate cost issues or pricing pressure`
      });
    }
  });
  
  // Check for customer-to-sales ratio anomalies
  data.forEach(item => {
    const salesPerCustomer = item.sales / item.customers;
    const avgSalesPerCustomer = 35; // Approximate average based on the data
    const spendingDeviation = Math.abs(salesPerCustomer - avgSalesPerCustomer) / 5; // Using 5 as a normalizing factor
    
    if (spendingDeviation > 1.2) {
      anomalies.push({
        metric: 'Revenue per Customer',
        value: Math.round(salesPerCustomer * 100) / 100,
        expectedRange: [30, 40],
        deviation: parseFloat(spendingDeviation.toFixed(2)),
        period: item.month,
        possibleCause: salesPerCustomer > avgSalesPerCustomer 
          ? `Customers spent more than usual in ${item.month}, possibly due to higher-value purchases or upselling success` 
          : `Lower customer spending in ${item.month}, may indicate product mix issues or discount pressure`
      });
    }
  });
  
  return anomalies;
};

// Enhanced predefined responses for common business questions
const responseTemplates: Record<string, {
  query: GeneratedQuery,
  response: string,
  visualizations: Visualization[],
  tableData?: TableData,
  insights?: AnalyticalInsights
}> = {
  "sales trend": {
    query: { 
      sql: "SELECT month, sales FROM tbl_sales_data ORDER BY CASE month WHEN 'Jan' THEN 1 WHEN 'Feb' THEN 2 WHEN 'Mar' THEN 3 WHEN 'Apr' THEN 4 WHEN 'May' THEN 5 WHEN 'Jun' THEN 6 WHEN 'Jul' THEN 7 WHEN 'Aug' THEN 8 WHEN 'Sep' THEN 9 WHEN 'Oct' THEN 10 WHEN 'Nov' THEN 11 WHEN 'Dec' THEN 12 END",
      explanation: "Retrieving monthly sales data to analyze trends over time. Had to apply custom sorting for month names."
    },
    response: "Looking at our sales data for the past year, we can observe a consistent upward trend with some seasonal fluctuations. Sales started at $4,000 in January and peaked at $9,000 in December, representing a 125% increase. The summer months (June-August) showed particularly strong performance with sales exceeding $7,000 each month. This positive trend suggests our business strategies have been effective at driving revenue growth throughout the year. Analyzing deeper patterns, we've identified strong quarterly growth with a notable acceleration in Q3 and Q4. Regional analysis shows Region B with the highest per-month average. Several months show significant deviation from expected sales patterns, particularly December and June which exceeded forecasts substantially.",
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
    },
    insights: {
      regional: generateRegionalInsights(sampleSalesData),
      trends: generateTrendInsights(sampleSalesData),
      anomalies: detectAnomalies(sampleSalesData)
    }
  },
  "profit margin": {
    query: { 
      sql: "SELECT month, CAST((profit/sales)*100 as DECIMAL(10,2)) as profit_margin FROM tbl_sales_data",
      explanation: "Calculating monthly profit margins (profit as percentage of sales). Had to use CAST to handle decimal precision."
    },
    response: "The profit margin has remained consistent at approximately 30% throughout the year. This indicates that for every dollar in sales, the company retains about 30 cents as profit after accounting for costs. This consistency suggests stable cost management practices and pricing strategies across all months, despite the variations in total sales volume. When analyzing by region, we find that Region C has the highest profit margin at 30.5%, slightly above the company average. Interestingly, we've detected several monthly anomalies where profit margins deviated from the expected range, particularly in February and September, which may warrant further investigation into cost factors or pricing strategies during these periods.",
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
    },
    insights: {
      regional: [
        {
          region: "Region A",
          metric: "Profit Margin",
          value: 30.0,
          trend: "stable",
          comparison: "Equal to company average"
        },
        {
          region: "Region B",
          metric: "Profit Margin",
          value: 29.8,
          trend: "down",
          percentageChange: -0.2,
          comparison: "0.2% lower than company average"
        },
        {
          region: "Region C",
          metric: "Profit Margin",
          value: 30.5,
          trend: "up",
          percentageChange: 0.5,
          comparison: "0.5% higher than company average"
        }
      ],
      trends: [
        {
          metric: "Profit Margin Stability",
          period: "Full Year",
          direction: "stable",
          percentageChange: 0.2,
          seasonality: "No significant seasonality detected in profit margins"
        }
      ],
      anomalies: [
        {
          metric: "Profit Margin",
          value: 28.9,
          expectedRange: [29.5, 30.5],
          deviation: 1.2,
          period: "Feb",
          possibleCause: "Lower than expected profit margin, possibly due to increased marketing expenses or seasonal discounts"
        },
        {
          metric: "Profit Margin",
          value: 31.2,
          expectedRange: [29.5, 30.5],
          deviation: 1.4,
          period: "Sep",
          possibleCause: "Higher than expected profit margin, potentially from improved operational efficiency or reduced costs"
        }
      ]
    }
  },
  "department performance": {
    query: { 
      sql: "SELECT LOWER(department) as dept, AVG(CAST(performance as DECIMAL(10,2))) as avg_performance, AVG(CAST(salary as DECIMAL(10,2))) as avg_salary FROM employees GROUP BY LOWER(department)",
      explanation: "Grouping employees by department and calculating average performance scores and salaries. Required data cleaning: normalizing department names to lowercase and casting performance and salary to numeric values to handle inconsistent data types."
    },
    response: "Analysis of departmental performance shows that the Engineering department has the highest average performance score at 95.3, followed by Finance at 90.5. The Engineering department also has the highest average salary at $95,000, which aligns with their superior performance metrics. Sales and Marketing departments show comparable performance levels at 88.7 and 87.0 respectively, with corresponding salary levels that reflect this performance hierarchy. Further trend analysis reveals that Engineering has shown consistent improvement quarter over quarter, while Sales experienced more variable performance. We've detected a potential anomaly in the Marketing department where performance metrics and compensation appear less correlated than in other departments.",
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
    },
    insights: {
      trends: [
        {
          metric: "Engineering Performance",
          period: "YTD",
          direction: "increasing",
          percentageChange: 3.5,
          forecast: "Strong consistent improvement suggests potential for continued excellence"
        },
        {
          metric: "Sales Performance",
          period: "YTD",
          direction: "fluctuating",
          percentageChange: 1.2,
          seasonality: "Performance shows quarterly fluctuations aligned with sales targets"
        },
        {
          metric: "Salary to Performance Ratio",
          period: "Current",
          direction: "stable",
          percentageChange: 0.8,
          forecast: "Compensation structure appears properly aligned with performance metrics"
        }
      ],
      anomalies: [
        {
          metric: "Marketing Compensation Alignment",
          value: 87.0,
          expectedRange: [70000, 75000],
          deviation: 1.3,
          period: "Current",
          possibleCause: "Performance metrics in Marketing show less correlation with compensation compared to other departments"
        }
      ]
    }
  },
  "product profitability": {
    query: { 
      sql: "SELECT name, INITCAP(category) as category, COALESCE(CAST(price as DECIMAL) - CAST(cost as DECIMAL), 0) as profit_per_unit, CASE WHEN CAST(cost as DECIMAL) > 0 THEN ((CAST(price as DECIMAL) - CAST(cost as DECIMAL))/CAST(cost as DECIMAL))*100 ELSE 0 END as roi FROM products WHERE cost IS NOT NULL ORDER BY roi DESC",
      explanation: "Calculating profit per unit and return on investment for each product. Had to handle: string to numeric conversion, NULL values for cost, case normalization for categories, and avoid division by zero."
    },
    response: "The product profitability analysis reveals that Desk Lamp has the highest ROI at 125%, generating $25 profit on a $20 cost. Among electronics, Laptop Pro has the best profit per unit at $400, but a lower ROI (50%) compared to Smartphone X (60%). Furniture items show moderate profitability, with the Ergonomic Desk generating $130 profit per unit with a 59% ROI. Kitchen and Home categories generally show higher ROI percentages despite lower absolute profit values. Note that Office Chair was excluded from ROI calculations due to missing cost data. Our trend analysis indicates that electronics profitability has remained strong but with increasing cost pressures in recent quarters. We've detected potential inventory anomalies in the furniture category that may require attention to optimize stock levels.",
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
    },
    insights: {
      trends: [
        {
          metric: "Electronics Profitability",
          period: "Last 4 Quarters",
          direction: "stable",
          percentageChange: -2.3,
          forecast: "Maintaining strong profitability but facing increasing cost pressures"
        },
        {
          metric: "Furniture Category Margin",
          period: "Last 4 Quarters",
          direction: "increasing",
          percentageChange: 5.8,
          seasonality: "Shows seasonal strength in Q2 and Q4"
        },
        {
          metric: "Category Diversification",
          period: "Current State",
          direction: "increasing",
          percentageChange: 8.2,
          forecast: "Healthy product mix with balanced profit contribution across categories"
        }
      ],
      anomalies: [
        {
          metric: "Inventory to Sales Ratio",
          value: 15,
          expectedRange: [25, 40],
          deviation: 1.8,
          period: "Current",
          possibleCause: "Ergonomic Desk inventory levels unusually low relative to profitability, may indicate supply issues or unexpectedly high demand"
        },
        {
          metric: "Cost Structure",
          value: null,
          expectedRange: [150, 200],
          deviation: 2.1,
          period: "Current",
          possibleCause: "Missing cost data for Office Chair prevents proper profitability analysis and may indicate data collection issues"
        }
      ]
    }
  },
  "customer acquisition": {
    query: { 
      sql: "SELECT month, customers, CAST(sales as DECIMAL)/CAST(customers as DECIMAL) as revenue_per_customer FROM tbl_sales_data",
      explanation: "Calculating revenue per customer for each month. Required explicit casting to ensure correct division operation."
    },
    response: "Our customer acquisition analysis shows that we've grown from 120 customers in January to 230 in December, a 91.7% increase. The revenue per customer has remained relatively stable, averaging around $35 throughout the year. There was a slight upward trend in per-customer value during the second half of the year, suggesting improvements in either customer quality or average purchase value. The correlation between total customers and overall sales is strong, indicating customer growth as a primary driver of our revenue increases. Regional analysis reveals that Region B has achieved the highest customer retention rate at 87%, while Region A shows the fastest growth in new customer acquisition. We've identified several months with anomalous customer behavior patterns that provide opportunities for optimizing our acquisition and retention strategies.",
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
    },
    insights: {
      regional: [
        {
          region: "Region A",
          metric: "Customer Growth Rate",
          value: 15.5,
          trend: "up",
          percentageChange: 15.5,
          comparison: "Highest growth rate across all regions"
        },
        {
          region: "Region B",
          metric: "Customer Retention",
          value: 87,
          trend: "up",
          percentageChange: 5.2,
          comparison: "Best retention rate among all regions"
        },
        {
          region: "Region C",
          metric: "Revenue per Customer",
          value: 38.50,
          trend: "up",
          percentageChange: 7.8,
          comparison: "7.8% higher than company average"
        }
      ],
      trends: [
        {
          metric: "Customer Base Growth",
          period: "Full Year",
          direction: "increasing",
          percentageChange: 91.7,
          forecast: "Current trajectory suggests continued strong growth potential"
        },
        {
          metric: "Customer Value",
          period: "H1 vs H2",
          direction: "increasing",
          percentageChange: 6.3,
          seasonality: "Higher customer spending in Q3 and Q4 indicates seasonal patterns"
        }
      ],
      anomalies: [
        {
          metric: "Revenue per Customer",
          value: 30.61,
          expectedRange: [33, 38],
          deviation: 1.5,
          period: "Feb",
          possibleCause: "Unusually low per-customer spending, possibly due to post-holiday slowdown or ineffective promotions"
        },
        {
          metric: "Customer Acquisition Rate",
          value: 42,
          expectedRange: [15, 30],
          deviation: 1.8,
          period: "Jul",
          possibleCause: "Spike in new customer acquisition, potentially related to summer promotion or market expansion"
        }
      ]
    }
  },
  "regional analysis": {
    query: { 
      sql: "SELECT \"Unnamed#1\" as region, SUM(sales) as total_sales, SUM(profit) as total_profit, COUNT(*) as months_active FROM tbl_sales_data GROUP BY \"Unnamed#1\"",
      explanation: "Analyzing sales by region. Had to reference the unnamed column using quotes and alias it properly for clarity."
    },
    response: "The regional analysis shows varying performance across our three regions. Region A, which was active in 5 months, generated the highest total sales at $30,000 with profits of $9,000. Region B was active in 4 months with $25,500 in sales and $7,650 in profit. Region C had the lowest overall figures with $17,000 in sales and $5,100 in profit across just 3 months. However, when normalizing for the number of active months, Region C actually shows the highest average monthly sales at $5,667. Deeper trend analysis reveals that Region A has the most consistent growth pattern, while Region B shows stronger seasonal fluctuations. We've identified several regional anomalies, particularly in customer acquisition metrics, that suggest opportunities for targeted marketing campaigns and operational improvements.",
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
    },
    insights: {
      regional: generateRegionalInsights(sampleSalesData),
      trends: [
        {
          metric: "Regional Growth Distribution",
          period: "Full Year",
          direction: "increasing",
          percentageChange: 22.5,
          seasonality: "Growth patterns vary significantly by region, with Region B showing strongest seasonality effects"
        },
        {
          metric: "Region A Performance",
          period: "Q1 to Q4",
          direction: "increasing",
          percentageChange: 18.7,
          forecast: "Most consistent growth trend, projected to maintain leadership position"
        },
        {
          metric: "Region C Efficiency",
          period: "Months Active",
          direction: "increasing",
          percentageChange: 12.4,
          forecast: "Highest efficiency metrics suggest potential for expansion"
        }
      ],
      anomalies: [
        {
          metric: "Region B Sales Volatility",
          value: 9000,
          expectedRange: [5500, 7500],
          deviation: 1.9,
          period: "Dec",
          possibleCause: "Exceptional December performance in Region B skews annual metrics and may indicate untapped seasonal opportunity"
        },
        {
          metric: "Region C Customer Acquisition Cost",
          value: 120,
          expectedRange: [80, 100],
          deviation: 2.0,
          period: "Jul",
          possibleCause: "Higher than expected customer acquisition costs in Region C during summer months"
        }
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
  insights?: AnalyticalInsights;
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
  
  // If no clear direction, provide a general overview with enhanced insights
  return {
    generatedQuery: { 
      sql: "-- General overview query\nSELECT 'Overall Business Performance' as metric, \n  SUM(sales) as total_sales, \n  AVG(profit/sales)*100 as avg_margin\nFROM tbl_sales_data",
      explanation: "This is a general overview query to provide high-level business metrics since the question was vague."
    },
    response: "Based on your general inquiry, here's an overview of our business performance: Total sales across all periods were $73,000 with an average profit margin of 30%. Sales have shown an overall positive trend throughout the year, with December being our strongest month at $9,000. Our customer base grew from 120 in January to 230 in December, showing consistent growth. Regional analysis reveals significant performance variations, with Region A generating the highest total sales but Region C showing the best per-month efficiency. We've identified several key trends, including strong Q3 and Q4 growth acceleration and seasonal patterns affecting both sales and customer acquisition. Notable anomalies include unexpectedly high December performance and fluctuating profit margins in specific months that warrant further investigation.",
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
    },
    insights: {
      regional: generateRegionalInsights(sampleSalesData),
      trends: generateTrendInsights(sampleSalesData),
      anomalies: detectAnomalies(sampleSalesData)
    }
  };
};

// Function to process a natural language query and return results
export const processQuery = async (query: string): Promise<{
  generatedQuery: GeneratedQuery;
  response: string;
  visualizations: Visualization[];
  tableData?: TableData;
  insights?: AnalyticalInsights;
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
