import { CheckCircleIcon, MapPin, UserPlus } from "lucide-react";
import type { FriendType } from "../../types";
import { sendFriendReqs } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const RecommendUserCard = ({
  user,
  hasRequestSent,
}: {
  user: FriendType;
  hasRequestSent: boolean;
}) => {
  const queryClient = useQueryClient();
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendReqs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      toast.success("Friend request sent");
    },
    onError: (error: any) => {
      const message = error.response?.data.msg;
      toast.error(message);
    },
  });

  return (
    <div className="card bg-base-100 shadow-2xl border border-base-content/5 hover:border-primary/20 transition-all h-full">
      <div className="card-body p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="avatar">
            <div className="w-14 h-14 rounded-full ring ring-primary/10 ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} alt="avatar" />
            </div>
          </div>
          <div className="overflow-hidden">
            <h3 className="font-bold text-xl truncate">{user.fullName}</h3>
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
          className={`btn btn-primary btn-block rounded-2xl shadow-lg shadow-primary/10 mt-auto ${hasRequestSent || isPending ? "cursor-not-allowed opacity-70" : "hover:btn-primary-focus"}`}
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
