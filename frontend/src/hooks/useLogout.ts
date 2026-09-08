import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { userLogout } from "../lib/api";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: LogoutMutation } = useMutation({
    mutationFn: userLogout,
    onMutate: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();
      navigate("/", { replace: true });
    },
    onSuccess: () => {
      toast.success("Logout successful 🚀");
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || "Logout failed";
      toast.error(message);
    },
  });

  return { LogoutMutation };
};
