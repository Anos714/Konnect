import { Send, Home, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-300 flex flex-col items-center justify-center p-6 text-center font-sans relative overflow-hidden text-base-content">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary opacity-5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary opacity-5 blur-[120px] pointer-events-none"></div>

      <div className="relative">
        <h1 className="text-[12rem] md:text-[18rem] font-black text-base-content/[0.05] select-none leading-none">
          404
        </h1>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-base-100 p-4 rounded-3xl border border-base-content/10 mb-6 shadow-2xl transform -rotate-6">
            <Send className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Lost in Translation?
          </h2>
          <p className="text-base-content/60 max-w-sm mx-auto text-lg leading-relaxed">
            We couldn't{" "}
            <span className="text-primary font-medium">Konnect</span> you to
            that page. It might have moved or never existed.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-12 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-outline rounded-full px-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Go Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/20 transform hover:-translate-y-1"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      <div className="mt-20 flex items-center gap-2 opacity-40">
        <div className="w-6 h-[1px] bg-base-content/30"></div>
        <span className="text-xs tracking-[0.3em] uppercase font-bold text-primary">
          Konnect
        </span>
        <div className="w-6 h-[1px] bg-base-content/30"></div>
      </div>
    </div>
  );
};

export default NotFound;
