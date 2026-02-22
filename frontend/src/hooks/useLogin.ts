import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "../lib/api";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: LoginMutation, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login successful 🚀");
      navigate("/");
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || "Login failed";
      toast.error(message);
    },
  });

  return { LoginMutation, isPending };
};
