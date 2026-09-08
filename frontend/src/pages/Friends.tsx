import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/friends/FriendCard";

const Friends = () => {
    const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="space-y-8 py-4 lg:py-8">
      <div>
        <p className="section-label mb-2">Your circle</p>
        <h1 className="page-heading text-3xl font-semibold">Friends</h1>
        <p className="mt-2 text-base-content/60">Keep the conversations going.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {friendsLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : friends && friends?.user?.friends?.length === 0 ? (
            <p>No friends yet</p>
          ) : (
            friends?.user?.friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))
          )}
      </div>
    </div>
  )
}
export default Friends