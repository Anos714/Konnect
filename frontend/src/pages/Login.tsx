import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { type LoginFormData, loginSchema } from "../validation/authSchema";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const { LoginMutation, isPending } = useLogin();

  const hanldeLoginForm = (data: LoginFormData) => {
    LoginMutation(data);
    reset();
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row bg-[#0a0a0a] text-white font-sans"
      data-theme="forest"
    >
      {/* Left Section: Login Form */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-20 bg-[#0d0d0d]">
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
            <Send className="text-[#22c55e] w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight text-[#22c55e]">
              Konnect
            </span>
          </div>

          <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-sm">
            Log in to continue your language journey
          </p>
        </div>

        <form onSubmit={handleSubmit(hanldeLoginForm)} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              {...register("email")}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl px-4 py-3 outline-none focus:border-[#22c55e] transition-all"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>
              <span className="text-xs text-[#22c55e] cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              placeholder="........"
              {...register("password")}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl px-4 py-3 outline-none focus:border-[#22c55e] transition-all"
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-black font-bold py-3 rounded-full transition-colors mt-2"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <span
              className="text-[#22c55e] cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/register")}
            >
              Create Account
            </span>
          </p>
        </form>
      </div>

      {/* Right Section: Visual */}
      <div className="hidden md:flex w-[55%] bg-[#0f1a14] flex-col items-center justify-center p-12 text-center border-l border-white/5">
        <div className="relative w-full max-w-sm mb-12">
          <img
            src="register.png"
            alt="Welcome back illustration"
            className="w-full h-auto opacity-90 drop-shadow-2xl"
          />
        </div>

        <div className="max-w-sm space-y-4">
          <h2 className="text-2xl font-bold leading-tight">
            Ready to jump back in?
          </h2>
          <p className="text-gray-400">
            Your partners are waiting. Pick up right where you left off and keep
            the conversation going.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
