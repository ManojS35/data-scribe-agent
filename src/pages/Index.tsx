
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full bg-card py-4 border-b">
        <div className="container">
          <h1 className="text-2xl font-bold text-center">DataScribe</h1>
          <p className="text-center text-muted-foreground">Business Intelligence Conversational Agent</p>
        </div>
      </header>
      
      <main className="container mx-auto flex-1 py-6 px-4 md:px-6">
        <div className="max-w-4xl mx-auto h-[calc(100vh-180px)]">
          <ChatInterface />
        </div>
      </main>
      
      <footer className="w-full py-4 border-t text-center text-sm text-muted-foreground">
        <div className="container">
          <p>DataScribe AI Assistant &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
