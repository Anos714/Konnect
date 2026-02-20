import { useForm } from "react-hook-form";
import {
  type RegisterFormData,
  registerSchema,
} from "../validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userRegister } from "../lib/api";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: userRegister,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Registeration successful 🚀");
      navigate("/onboarding");
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || "Registeration failed";
      toast.error(message);
    },
  });

  const hanldeRegisterForm = (data: RegisterFormData) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#0a0a0a] text-white font-sans">
      {/* Left Section: Form */}
      <div className="w-full md:w-[45%] flex flex-col justify-center px-8 py-12 lg:px-20 bg-[#0d0d0d]">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-8">
            <Send className="text-[#22c55e] w-8 h-8" />
            <span className="text-2xl font-bold tracking-tight text-[#22c55e]">
              Konnect
            </span>
          </div>

          <h1 className="text-2xl font-semibold mb-1">Create an Account</h1>
          <p className="text-gray-400 text-sm">
            Join Konnect and start your language learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit(hanldeRegisterForm)} className="space-y-5">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              {...register("fullName")}
              className="bg-[#141414] border border-[#2a2a2a] rounded-2xl px-4 py-3 outline-none focus:border-[#22c55e] transition-all"
            />
            {errors.fullName && (
              <span className="text-red-500 text-xs">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Email</label>
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
            <label className="text-sm font-medium text-gray-300">
              Password
            </label>
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

          {/* Terms */}
          <div className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 rounded border-gray-700 bg-transparent accent-[#22c55e]"
            />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the{" "}
              <span className="text-[#22c55e] cursor-pointer hover:underline">
                terms of service
              </span>{" "}
              and{" "}
              <span className="text-[#22c55e] cursor-pointer hover:underline">
                privacy policy
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-black font-bold py-3 rounded-full transition-colors mt-4"
          >
            {isPending ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <span
              className="text-[#22c55e] cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>

      {/* Right Section: Visual */}
      <div className="hidden md:flex w-[55%] bg-[#0f1a14] flex-col items-center justify-center p-12 text-center">
        <div className="relative w-full max-w-md mb-12">
          <img
            src="register.png"
            alt="Language learning illustration"
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>

        <div className="max-w-md space-y-4">
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight">
            The world is waiting <br />
            <span className="text-[#22c55e]">to talk to you.</span>
          </h2>
          <p className="text-gray-300 text-lg font-light leading-relaxed px-4">
            Don't just learn a language—
            <span className="text-white font-medium">live it.</span> Join a
            community where every conversation is a step closer to fluency.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
