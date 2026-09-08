import { zodResolver } from "@hookform/resolvers/zod";
import { Dices, Globe, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  onBoardingSchema,
  type OnBoardingData,
} from "../validation/authSchema";
import type { OnBoardRequest } from "../types";
import { languages } from "../assets/assets";
import useAuthUser from "../hooks/useAuthUser";
import { useOnBoard } from "../hooks/useOnBoard";
import UserAvatar from "../components/ui/UserAvatar";

const OnBoarding = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OnBoardRequest>({
    resolver: zodResolver(onBoardingSchema),
    mode: "onSubmit",
  });

  const { OnBoardMutation, isPending } = useOnBoard();

  const hanldeOnBoardForm = (data: OnBoardingData) => {
    OnBoardMutation(data);
    reset();
  };

  const { authUser } = useAuthUser();

  return (
    <div className="auth-page flex min-h-screen items-center justify-center p-4 font-sans text-base-content sm:p-8">
      <div className="auth-panel w-full max-w-2xl rounded-[28px] p-7 sm:p-10 md:p-12">
        <div className="flex flex-col items-center mb-10">
          <p className="auth-kicker mb-2">One last step</p>
          <h1 className="page-heading mb-8 text-3xl font-semibold text-white">Make your profile feel like you.</h1>

          <div className="relative mb-6">
            <UserAvatar
              name={authUser?.fullName}
              className="h-32 w-32 text-5xl"
              ring="border-4 border-base-200 shadow-inner"
            />
          </div>

          <button className="btn btn-outline btn-sm gap-2">
            <Dices className="w-4 h-4" />
            Generate Random Avatar
          </button>
        </div>

        <form onSubmit={handleSubmit(hanldeOnBoardForm)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              defaultValue={authUser?.fullName || ""}
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
              <span className="label-text font-medium">Bio</span>
            </label>
            <textarea
              placeholder="Tell others about yourself and your language learning goals"
              rows={4}
              {...register("bio")}
              className={`textarea textarea-bordered w-full rounded-3xl focus:textarea-primary transition-all resize-none ${
                errors.bio ? "textarea-error" : ""
              }`}
            />
            {errors.bio && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.bio.message}
                </span>
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">Native Language</span>
              </label>
              <select
                {...register("nativeLang")}
                className={`select select-bordered w-full rounded-2xl focus:select-primary ${
                  errors.nativeLang ? "select-error" : ""
                }`}
              >
                <option value="">Select language</option>
                {languages.map((lang, index) => (
                  <option key={index} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
              {errors.nativeLang && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.nativeLang.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium">
                  Learning Language
                </span>
              </label>
              <select
                {...register("learningLang")}
                className={`select select-bordered w-full rounded-2xl focus:select-primary ${
                  errors.learningLang ? "select-error" : ""
                }`}
              >
                <option value="">Select language</option>
                {languages.map((lang, index) => (
                  <option key={index} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
              {errors.learningLang && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.learningLang.message}
                  </span>
                </label>
              )}
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Location</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
              <input
                type="text"
                placeholder="City, Country"
                {...register("location")}
                className={`input input-bordered w-full pl-12 rounded-2xl focus:input-primary transition-all ${
                  errors.location ? "input-error" : ""
                }`}
              />
            </div>
            {errors.location && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.location.message}
                </span>
              </label>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary btn-block rounded-full shadow-lg shadow-primary/20"
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span>
                Onboarding...
              </>
            ) : (
              <>
                <Globe className="w-5 h-5" />
                Complete Onboarding
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnBoarding;
