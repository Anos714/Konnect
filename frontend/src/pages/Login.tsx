import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
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
    <div className="auth-page flex min-h-screen w-full items-center justify-center p-4 text-base-content md:p-8">
      <div className="auth-panel grid w-full max-w-5xl overflow-hidden rounded-[28px] md:grid-cols-[.9fr_1.1fr]">
      <div className="flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-16">
        <div className="mb-9">
          <div className="mb-10 flex items-center gap-3">
            <span className="brand-mark"><MessageCircle size={18} /></span>
            <span className="text-lg font-semibold tracking-tight text-white">Konnect</span>
          </div>

          <p className="auth-kicker mb-3">Welcome back</p>
          <h1 className="page-heading text-4xl font-semibold text-white">Pick up where you left off.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Log in to continue your language journey
          </p>
        </div>

        <form onSubmit={handleSubmit(hanldeLoginForm)} className="space-y-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              {...register("email")}
              className={`input input-bordered w-full transition-all ${
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
              className={`input input-bordered w-full transition-all ${
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
            className="btn btn-primary btn-block mt-2"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Signing In...</span>
              </div>
            ) : (
              <>Sign in <ArrowRight size={16} /></>
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
      <div className="auth-art relative hidden min-h-[620px] flex-col justify-end overflow-hidden p-12 md:flex">
        <div className="auth-orbit absolute right-12 top-16 w-64 rounded-3xl p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300"><span className="h-2 w-2 rounded-full bg-emerald-300" /> Your people are online</div>
          <div className="mt-5 flex items-center gap-3"><span className="brand-mark h-10 w-10 text-sm">K</span><div><p className="text-sm font-medium text-white">Keep the conversation going.</p><p className="mt-1 text-xs text-slate-400">Small talk, big progress.</p></div></div>
        </div>
        <div className="relative z-10 max-w-sm">
          <Sparkles className="mb-5 text-cyan-200" size={22} />
          <h2 className="page-heading text-4xl font-semibold leading-tight text-white">The world is closer than you think.</h2>
          <p className="mt-4 leading-7 text-slate-300">Meet people who make learning feel less like studying and more like belonging.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
