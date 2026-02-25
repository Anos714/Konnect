import { useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendReq, getFriendReqs } from "../lib/api";

const Notification = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getFriendReqs,
  });

  const { mutate: acceptFriendReqMutation, isPending } = useMutation({
    mutationFn: acceptFriendReq,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequest"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  return <div>Notification</div>;
};

export default Notification;
