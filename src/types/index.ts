
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  visualizations?: Visualization[];
  tableData?: TableData;
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
