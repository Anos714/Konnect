import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userOnBoarding } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useOnBoard = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: OnBoardMutation, isPending } = useMutation({
    mutationFn: userOnBoarding,
    onSuccess: () => {
      navigate("/");
      toast.success("Onboarded successfully ");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || "Onboarded failed";
      toast.error(message);
    },
  });
  return { OnBoardMutation, isPending };
};
