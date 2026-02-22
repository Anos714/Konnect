import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRegister } from "../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: RegisterMutation, isPending } = useMutation({
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
  return { RegisterMutation, isPending };
};
