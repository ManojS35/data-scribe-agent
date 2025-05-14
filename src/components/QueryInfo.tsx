
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GeneratedQuery } from "@/types";

interface QueryInfoProps {
  query: GeneratedQuery;
}

const QueryInfo = ({ query }: QueryInfoProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex justify-between items-center">
          <span>SQL Query</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide Details" : "Show Details"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isExpanded ? (
          <>
            <div className="bg-muted rounded-md p-3 overflow-x-auto">
              <pre className="text-xs">{query.sql}</pre>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{query.explanation}</p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">{query.explanation}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default QueryInfo;
