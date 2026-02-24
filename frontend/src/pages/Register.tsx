import { useForm } from "react-hook-form";
import {
  type RegisterFormData,
  registerSchema,
} from "../validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
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
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-base-300 text-base-content font-sans">
      <div className="w-full md:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-20 bg-base-100 shadow-xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-8">
            <Send className="text-primary w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight text-primary">
              Konnect
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-1">Create an Account</h1>
          <p className="text-base-content/60 text-sm">
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
              className={`input input-bordered w-full rounded-2xl focus:input-primary transition-all ${
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
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
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
            className="btn btn-primary btn-block rounded-full mt-4"
          >
            {isPending ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loading loading-spinner loading-xs"></span>
                <span>Creating account...</span>
              </div>
            ) : (
              "Create Account"
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

      <div className="hidden md:flex w-[55%] bg-base-200 flex-col items-center justify-center p-12 text-center border-l border-base-content/5">
        <div className="relative w-full max-w-md mb-12">
          <img
            src="register.png"
            alt="Language learning"
            className="w-full h-auto drop-shadow-2xl brightness-95"
          />
        </div>

        <div className="max-w-md space-y-4">
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            The world is waiting <br />
            <span className="text-primary">to talk to you.</span>
          </h2>
          <p className="text-base-content/70 text-lg font-light leading-relaxed px-4">
            Don't just learn a language—
            <span className="text-base-content font-medium">live it.</span> Join
            a community where every conversation is a step closer to fluency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
