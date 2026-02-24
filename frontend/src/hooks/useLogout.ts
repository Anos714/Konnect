import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { userLogout } from "../lib/api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  const { mutate: LogoutMutation } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logout successful 🚀");

      //   navigate("/login");
    },
    onError: (error: any) => {
      const message = error.response?.data?.msg || "Logout failed";
      toast.error(message);
    },
  });

  return { LogoutMutation };
};
