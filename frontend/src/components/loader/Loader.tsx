import { Send } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#22c55e] opacity-20 animate-ping"></div>

        <div className="relative bg-[#0d0d0d] p-4 rounded-full border border-[#22c55e]/30">
          <Send className="w-10 h-10 text-[#22c55e] animate-pulse" />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
          Connecting
        </span>
        <span className="flex gap-1">
          <span className="w-1 h-1 bg-[#22c55e] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1 h-1 bg-[#22c55e] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1 h-1 bg-[#22c55e] rounded-full animate-bounce"></span>
        </span>
      </div>
    </div>
  );
};

export default Loader;
