import { Send } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-base-100 text-base-content">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping"></div>

        <div className="relative bg-base-300 p-4 rounded-full border border-primary/20">
          <Send className="w-10 h-10 text-primary animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.2em] opacity-50">
          Connecting
        </span>
        <span className="flex gap-1">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
        </span>
      </div>
    </div>
  );
};

export default Loader;
