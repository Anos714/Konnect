import { zodResolver } from "@hookform/resolvers/zod";
import { Dices, Globe, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  onBoardingSchema,
  type OnBoardingData,
} from "../validation/authSchema";
import type { OnBoardRequest } from "../types";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { userOnBoarding } from "../lib/api";
import { languages } from "../assets/assets";
import { api } from "../lib/axios";

const OnBoarding = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OnBoardRequest>({
    resolver: zodResolver(onBoardingSchema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: userOnBoarding,
    onSuccess: () => {
      navigate("/");
      toast.success("Onboarded successfully ");
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || "Onboarded failed";
      toast.error(message);
    },
  });

  const hanldeOnBoardForm = (data: OnBoardingData) => {
    mutate(data);
  };

  const { data: userData } = useQuery({ queryKey: ["authUser"] });
  const user = userData?.user;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-2xl bg-[#0d0d0d] rounded-[40px] p-8 md:p-12 border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-8">
            Complete Your Profile
          </h1>

          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#141414] bg-white">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Beth"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <button className="flex items-center gap-2 bg-[#14b8a6] hover:bg-[#0d9488] text-black text-sm font-bold py-2.5 px-6 rounded-full transition-all">
            <Dices className="w-4 h-4" />
            Generate Random Avatar
          </button>
        </div>

        <form onSubmit={handleSubmit(hanldeOnBoardForm)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Full Name
            </label>
            <input
              type="text"
              value={user?.fullName || ""}
              placeholder="Jhon Doe"
              {...register("fullName")}
              className="bg-[#111111] border border-[#2a2a2a] rounded-2xl px-5 py-3.5 text-white outline-none focus:border-[#22c55e] transition-all"
            />
            {errors.fullName && (
              <span className="text-red-500 text-xs">
                {errors.fullName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Bio
            </label>
            <textarea
              placeholder="Tell others about yourself and your language learning goals"
              rows={4}
              {...register("bio")}
              className="bg-[#111111] border border-[#2a2a2a] rounded-3xl px-5 py-3.5 text-white outline-none focus:border-[#22c55e] transition-all resize-none"
            />
            {errors.bio && (
              <span className="text-red-500 text-xs">{errors.bio.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300 ml-1">
                Native Language
              </label>
              <select
                {...register("nativeLang")}
                className="bg-[#111111] border border-[#2a2a2a] rounded-2xl px-5 py-3.5 text-gray-400 outline-none focus:border-[#22c55e] appearance-none cursor-pointer"
              >
                <option value="">Select your native language</option>
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {errors.nativeLang && (
                <span className="text-red-500 text-xs">
                  {errors.nativeLang.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300 ml-1">
                Learning Language
              </label>
              <select
                {...register("learningLang")}
                className="bg-[#111111] border border-[#2a2a2a] rounded-2xl px-5 py-3.5 text-gray-400 outline-none focus:border-[#22c55e] appearance-none cursor-pointer"
              >
                <option value="">Select language you're learning</option>
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
              {errors.learningLang && (
                <span className="text-red-500 text-xs">
                  {errors.learningLang.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="City, Country"
                {...register("location")}
                className="w-full bg-[#111111] border border-[#2a2a2a] rounded-2xl pl-12 pr-5 py-3.5 text-white outline-none focus:border-[#22c55e] transition-all"
              />
              {errors.location && (
                <span className="text-red-500 text-xs">
                  {errors.location.message}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#22c55e] hover:bg-[#1eb054] text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 mt-4 transition-all shadow-lg shadow-[#22c55e]/10"
          >
            <Globe className="w-5 h-5" />
            {isPending ? "Onboarding..." : "Complete Onboarding"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnBoarding;
