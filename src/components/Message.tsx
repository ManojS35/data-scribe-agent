
import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Message as MessageType } from "@/types";
import VisualizationChart from "./VisualizationChart";
import DataTable from "./DataTable";

interface MessageProps {
  message: MessageType;
  isLatest: boolean;
}

const Message = ({ message, isLatest }: MessageProps) => {
  const isUser = message.role === "user";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLatest && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLatest]);

  return (
    <div
      ref={ref}
      className={`flex ${isUser ? "justify-end" : "justify-start"} my-2 px-4`}
    >
      <div className={`message-content ${isUser ? "ml-12" : "mr-12"}`}>
        <div 
          className={`px-4 py-3 rounded-lg 
            ${isUser 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground"
            }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {!isUser && message.visualizations && message.visualizations.length > 0 && (
          <div className="mt-3 space-y-4">
            {message.visualizations.map((visualization) => (
              <Card key={visualization.id} className="p-4">
                <VisualizationChart visualization={visualization} />
              </Card>
            ))}
          </div>
        )}

        {!isUser && message.tableData && (
          <Card className="mt-3 p-4 overflow-x-auto">
            <DataTable data={message.tableData} />
          </Card>
        )}
      </div>
    </div>
  );
};

export default Message;
