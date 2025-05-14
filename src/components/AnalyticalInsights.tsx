
import { AnalyticalInsights as InsightsType } from "@/types";
import { TrendingUp, TrendingDown, Minus, AlertCircle, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalyticalInsightsProps {
  insights: InsightsType;
}

const AnalyticalInsights = ({ insights }: AnalyticalInsightsProps) => {
  const { regional, trends, anomalies } = insights;
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Advanced Insights</h3>
      
      {regional && regional.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Regional Insights
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {regional.map((item, index) => (
              <div key={index} className="border rounded-md p-3 bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.region}</span>
                  <Badge variant={item.trend === 'up' ? 'success' : item.trend === 'down' ? 'destructive' : 'default'}>
                    {item.trend === 'up' && <TrendingUp className="h-3 w-3 mr-1" />}
                    {item.trend === 'down' && <TrendingDown className="h-3 w-3 mr-1" />}
                    {item.trend === 'stable' && <Minus className="h-3 w-3 mr-1" />}
                    {item.percentageChange && `${item.percentageChange > 0 ? '+' : ''}${item.percentageChange}%`}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{item.metric}: {item.value}</p>
                {item.comparison && <p className="text-xs mt-1">{item.comparison}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {trends && trends.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trend Analysis
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {trends.map((item, index) => (
              <div key={index} className="border rounded-md p-3 bg-background">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <Badge variant={
                    item.direction === 'increasing' ? 'success' : 
                    item.direction === 'decreasing' ? 'destructive' : 
                    'default'
                  }>
                    {item.direction}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Period: {item.period} | Change: {item.percentageChange > 0 ? '+' : ''}{item.percentageChange}%
                </p>
                {item.seasonality && <p className="text-xs mt-1">Seasonality: {item.seasonality}</p>}
                {item.forecast && <p className="text-xs mt-1">Forecast: {item.forecast}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {anomalies && anomalies.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Detected Anomalies
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {anomalies.map((item, index) => (
              <div key={index} className="border border-destructive rounded-md p-3 bg-destructive/5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.metric}</span>
                  <Badge variant="destructive">
                    {Math.abs(item.deviation).toFixed(1)}σ deviation
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Value: {item.value} | Expected: {item.expectedRange[0]} - {item.expectedRange[1]}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Period: {item.period}</p>
                {item.possibleCause && <p className="text-xs mt-1">Possible Cause: {item.possibleCause}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticalInsights;
