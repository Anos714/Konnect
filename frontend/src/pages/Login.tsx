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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-base-300 text-base-content font-sans">
      <div className="w-full md:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-20 bg-base-100 shadow-xl">
        <div className="mb-8 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-8">
            <Send className="text-primary w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight text-primary">
              Konnect
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
          <p className="text-base-content/60 text-sm">
            Log in to continue your language journey
          </p>
        </div>

        <form onSubmit={handleSubmit(hanldeLoginForm)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              {...register("email")}
              className={`input input-bordered w-full rounded-2xl focus:input-primary transition-all ${
                errors.email ? "input-error" : ""
              }`}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <div className="flex justify-between items-center mb-1">
              <label className="label-text font-medium">Password</label>
              <span className="text-xs text-primary cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`input input-bordered w-full rounded-2xl focus:input-primary transition-all ${
                errors.password ? "input-error" : ""
              }`}
            />
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary btn-block rounded-full mt-2"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Signing In...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="text-center text-sm text-base-content/70">
            Don't have an account?{" "}
            <span
              className="text-primary cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/register")}
            >
              Create Account
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:flex w-[55%] bg-base-200 flex-col items-center justify-center p-12 text-center border-l border-base-content/5">
        <div className="relative w-full max-w-sm mb-12">
          <img
            src="register.png"
            alt="Welcome back"
            className="w-full h-auto opacity-90 drop-shadow-2xl brightness-90"
          />
        </div>

        <div className="max-w-sm space-y-4">
          <h2 className="text-2xl font-bold leading-tight">
            Ready to jump back in?
          </h2>
          <p className="text-base-content/60">
            Your partners are waiting. Pick up right where you left off and keep
            the conversation going.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
