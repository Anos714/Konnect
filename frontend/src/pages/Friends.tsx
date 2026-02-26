import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import FriendCard from "../components/friends/FriendCard";

const Friends = () => {
    const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}
export default Friends