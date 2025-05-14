
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Database } from "lucide-react";

const ChatHeader = () => {
  return (
    <Card className="border-b rounded-t-lg rounded-b-none">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">DataScribe Assistant</CardTitle>
            <CardDescription>
              Ask complex business questions in natural language. I'll analyze your SQL database and provide visual insights.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ChatHeader;
