import { Send, Home, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#22c55e] opacity-[0.03] blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#22c55e] opacity-[0.03] blur-[120px] pointer-events-none"></div>

      <div className="relative">
        <h1 className="text-[12rem] md:text-[18rem] font-black text-white/[0.03] select-none leading-none">
          404
        </h1>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-[#141414] p-4 rounded-3xl border border-[#2a2a2a] mb-6 shadow-2xl transform -rotate-6">
            <Send className="w-12 h-12 text-[#22c55e]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Lost in Translation?
          </h2>
          <p className="text-gray-400 max-w-sm mx-auto text-lg leading-relaxed">
            We couldn't{" "}
            <span className="text-[#22c55e] font-medium">Konnect</span> you to
            that page. It might have moved or never existed.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-8 py-3 rounded-full border border-[#2a2a2a] text-gray-300 hover:bg-white/5 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#22c55e] text-black font-bold hover:bg-[#1eb054] shadow-[0_10px_30px_rgba(34,197,94,0.2)] transition-all transform hover:-translate-y-1"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="mt-20 flex items-center gap-2 opacity-40">
        <div className="w-6 h-[1px] bg-gray-600"></div>
        <span className="text-xs tracking-[0.3em] uppercase font-bold text-[#22c55e]">
          Konnect
        </span>
        <div className="w-6 h-[1px] bg-gray-600"></div>
      </div>
    </div>
  );
};

export default NotFound;
