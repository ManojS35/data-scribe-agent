
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message as MessageType } from "@/types";
import { processQuery } from "@/services/dataService";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import ChatInput from "./ChatInput";
import QueryInfo from "./QueryInfo";
import TypingIndicator from "./TypingIndicator";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const ChatInterface = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content: "Hello! I'm your DataScribe Assistant. Ask me any business question about your data, and I'll analyze it for you. You can ask about sales trends, profit margins, department performance, product profitability, customer acquisition, or regional performance with advanced insights.",
      timestamp: new Date(),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuery, setCurrentQuery] = useState<any>(null);

  const addUserMessage = (content: string) => {
    const userMessage: MessageType = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  const addAssistantMessage = (
    content: string,
    visualizations?: any[],
    tableData?: any,
    insights?: any
  ) => {
    const assistantMessage: MessageType = {
      id: uuidv4(),
      role: "assistant",
      content,
      timestamp: new Date(),
      visualizations,
      tableData,
      insights,
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  const handleSendMessage = async (message: string) => {
    addUserMessage(message);
    setIsProcessing(true);

    try {
      const result = await processQuery(message);
      setCurrentQuery(result.generatedQuery);
      
      // Slight delay to simulate processing and show typing indicator
      setTimeout(() => {
        addAssistantMessage(
          result.response, 
          result.visualizations,
          result.tableData,
          result.insights
        );
        setIsProcessing(false);
      }, 1000);
    } catch (error) {
      console.error("Error processing query:", error);
      toast({
        title: "Error",
        description: "There was an error processing your query. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-full flex flex-col chat-container">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto py-4">
        {messages.map((msg, index) => (
          <Message
            key={msg.id}
            message={msg}
            isLatest={index === messages.length - 1}
          />
        ))}
        {isProcessing && <TypingIndicator />}
      </div>

      {currentQuery && (
        <div className="px-4">
          <Separator className="my-3" />
          <QueryInfo query={currentQuery} />
        </div>
      )}
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isProcessing} />
    </div>
  );
};

export default ChatInterface;
