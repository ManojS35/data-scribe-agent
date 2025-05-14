
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  visualizations?: Visualization[];
  tableData?: TableData;
  insights?: AnalyticalInsights;
}

export interface Visualization {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  title: string;
  data: any[];
  config: {
    xAxis?: string;
    yAxis?: string;
    dataKey?: string;
    colors?: string[];
  };
}

export interface TableData {
  headers: string[];
  rows: any[];
}

export interface GeneratedQuery {
  sql: string;
  explanation: string;
}

export interface AnalyticalInsights {
  regional?: RegionalInsight[];
  trends?: TrendInsight[];
  anomalies?: AnomalyInsight[];
}

export interface RegionalInsight {
  region: string;
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  percentageChange?: number;
  comparison?: string;
}

export interface TrendInsight {
  metric: string;
  period: string;
  direction: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
  percentageChange: number;
  seasonality?: string;
  forecast?: string;
}

export interface AnomalyInsight {
  metric: string;
  value: number;
  expectedRange: [number, number];
  deviation: number;
  period: string;
  possibleCause?: string;
}
