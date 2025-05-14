
const TypingIndicator = () => {
  return (
    <div className="flex justify-start my-2 px-4">
      <div className="px-4 py-3 rounded-lg bg-secondary text-secondary-foreground">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
