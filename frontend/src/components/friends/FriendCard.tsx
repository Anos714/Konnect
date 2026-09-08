import { MessageSquare } from "lucide-react";
import type { FriendType } from "../../types";
import { Link } from "react-router";
import UserAvatar from "../ui/UserAvatar";

const FriendCard = ({ friend }: { friend: FriendType }) => {
  return (
    <div className="app-card card h-full transition hover:-translate-y-1 hover:border-primary/30">
      <div className="card-body p-5">
        <div className="flex items-center gap-4 mb-4">
          <UserAvatar
            name={friend.fullName}
            ring="ring ring-primary ring-offset-base-100 ring-offset-2"
          />
          <div><h3 className="font-semibold">{friend.fullName}</h3><p className="mt-1 text-xs text-base-content/50">Language partner</p></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="badge badge-primary gap-1 border-0 py-3 px-3 font-medium">
            Native: {friend.nativeLang}
          </div>
          <div className="badge badge-outline gap-1 py-3 px-4 font-medium">
            Learning: {friend.learningLang}
          </div>
        </div>
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline btn-block"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
