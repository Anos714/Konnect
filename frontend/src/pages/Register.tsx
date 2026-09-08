import { useForm } from "react-hook-form";
import {
  type RegisterFormData,
  registerSchema,
} from "../validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";
import { useRegister } from "../hooks/useRegister";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const { RegisterMutation, isPending } = useRegister();

  const hanldeRegisterForm = (data: RegisterFormData) => {
    RegisterMutation(data);
    reset();
  };

  return (
    <div className="auth-page flex min-h-screen w-full items-center justify-center p-4 text-base-content md:p-8">
      <div className="auth-panel grid w-full max-w-5xl overflow-hidden rounded-[28px] md:grid-cols-[1.1fr_.9fr]">
      <div className="flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-16">
          <div className="mb-9">
          <div className="mb-10 flex items-center gap-3">
            <span className="brand-mark"><MessageCircle size={18} /></span>
            <span className="text-lg font-semibold tracking-tight text-white">Konnect</span>
          </div>

          <p className="auth-kicker mb-3">Start your story</p>
          <h1 className="page-heading text-4xl font-semibold text-white">Make room for more voices.</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Join Konnect and start your language learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit(hanldeRegisterForm)} className="space-y-5">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className={`input input-bordered w-full transition-all ${
                errors.fullName ? "input-error" : ""
              }`}
            />
            {errors.fullName && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.fullName.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email</span>
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
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
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

          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="terms"
              className="checkbox checkbox-primary checkbox-sm"
            />
            <label htmlFor="terms" className="text-sm text-base-content/70">
              I agree to the{" "}
              <span className="text-primary cursor-pointer hover:underline">
                terms of service
              </span>{" "}
              and{" "}
              <span className="text-primary cursor-pointer hover:underline">
                privacy policy
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary btn-block mt-4"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Creating account...</span>
              </div>
            ) : (
              <>Create account <ArrowRight size={16} /></>
            )}
          </button>

          <p className="text-center text-sm text-base-content/70 mt-4">
            Already have an account?{" "}
            <span
              className="text-primary cursor-pointer font-medium hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
      <div className="auth-art relative hidden min-h-[620px] flex-col justify-end overflow-hidden p-12 md:flex">
        <div className="auth-orbit absolute left-12 top-16 w-64 rounded-3xl p-5">
          <div className="text-xs uppercase tracking-[.18em] text-cyan-200">A better way to learn</div>
          <div className="mt-5 grid grid-cols-3 gap-2"><span className="h-9 rounded-xl bg-cyan-200/80" /><span className="h-9 rounded-xl bg-indigo-300/70" /><span className="h-9 rounded-xl bg-white/20" /></div>
        </div>
        <div className="relative z-10 max-w-sm">
          <Sparkles className="mb-5 text-cyan-200" size={22} />
          <h2 className="page-heading text-4xl font-semibold leading-tight text-white">Every hello is a step forward.</h2>
          <p className="mt-4 leading-7 text-slate-300">Find a conversation partner, share a little curiosity, and let fluency follow.</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
