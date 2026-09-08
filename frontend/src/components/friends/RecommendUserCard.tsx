import { CheckCircleIcon, MapPin, UserPlus } from "lucide-react";
import type { FriendType } from "../../types";
import { sendFriendReqs } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UserAvatar from "../ui/UserAvatar";

const RecommendUserCard = ({
  user,
  hasRequestSent,
  onRequestStateChange,
}: {
  user: FriendType;
  hasRequestSent: boolean;
  onRequestStateChange: (sent: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendReqs,
    onMutate: () => {
      onRequestStateChange(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      toast.success("Friend request sent");
    },
    onError: (error: any) => {
      onRequestStateChange(false);
      const message = error.response?.data?.msg || "Could not send friend request";
      toast.error(message);
    },
  });

  return (
    <div className="app-card card h-full transition hover:-translate-y-1 hover:border-primary/30">
      <div className="card-body p-5">
        <div className="flex items-start gap-4 mb-4">
          <UserAvatar
            name={user.fullName}
            className="h-14 w-14"
            ring="ring ring-primary/10 ring-offset-base-100 ring-offset-2"
          />
          <div className="overflow-hidden">
            <h3 className="font-semibold text-lg truncate">{user.fullName}</h3>
            <div className="flex items-center gap-1 text-base-content/50 text-sm">
              <MapPin className="w-3 h-3" />
              {user.location}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="badge badge-primary badge-sm py-3 px-3">
            Native: {user.nativeLang}
          </span>
          <span className="badge badge-outline badge-sm py-3 px-3">
            Learning: {user.learningLang}
          </span>
        </div>

        {user.bio && (
          <p className="text-sm text-base-content/70 min-h-[40px] mb-6 line-clamp-2 italic">
            "{user.bio}"
          </p>
        )}

        <button
          className={`btn btn-primary btn-block mt-auto ${hasRequestSent || isPending ? "cursor-not-allowed opacity-70" : ""}`}
          onClick={() => sendRequestMutation(user._id)}
          disabled={hasRequestSent || isPending}
        >
          {hasRequestSent ? (
            <>
              <CheckCircleIcon className="size-4 mr-2" />
              Request Sent
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4 mr-2" />
              Send Friend Request
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RecommendUserCard;
