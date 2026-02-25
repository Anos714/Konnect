import { MessageSquare } from "lucide-react";
import type { FriendType } from "../../types";
import { Link } from "react-router";

const FriendCard = ({ friend }: { friend: FriendType }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-content/5">
      <div className="card-body p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="avatar">
            <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={friend.avatar} alt="avatar" />
            </div>
          </div>
          <h3 className="font-bold text-lg">{friend.fullName}</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="badge badge-primary gap-1 py-3 px-4 font-medium">
            Native: {friend.nativeLang}
          </div>
          <div className="badge badge-outline gap-1 py-3 px-4 font-medium">
            Learning: {friend.learningLang}
          </div>
        </div>
        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline btn-block rounded-2xl hover:btn-primary"
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Message
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;
