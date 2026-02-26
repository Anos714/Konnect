import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
} from "../lib/api";
import { Link } from "react-router";
import FriendCard from "../components/friends/FriendCard";
import RecommendUserCard from "../components/friends/RecommendUserCard";

const Home = () => {
  const [outgoingReqIds, setOutgoingIds] = useState(new Set());

  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers, isLoading: recommendedUsersLoading } =
    useQuery({
      queryKey: ["recommenfriends"],
      queryFn: getRecommendedUsers,
    });

  const { data: outgoingFriendReqs} =
    useQuery({
      queryKey: ["outgoingFriendReqs"],
      queryFn: getOutgoingFriendReqs,
    });

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.outgoingReqs.length > 0) {
      outgoingFriendReqs.outgoingReqs.forEach((req) => {
        outgoingIds.add(req.receiver._id);
      });
      setOutgoingIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <div className="p-6 lg:p-10 bg-base-300 min-h-screen">
      {/* Your Friends Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Friends</h2>
          <Link
            to="/notifications"
            className="btn btn-outline btn-sm rounded-xl gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Friend Requests
          </Link>
        </div>

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
      </section>

      {/* Meet New Learners Section */}
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Meet New Learners</h2>
          <p className="text-base-content/60">
            Discover perfect language exchange partners based on your profile
          </p>
        </div>

        {recommendedUsersLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : recommendedUsers && recommendedUsers?.user?.length === 0 ? (
          <p>No recommended users found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recommendedUsers?.user?.map((user) => {
              const hasRequestSent = outgoingReqIds.has(user._id);

              return (
                <RecommendUserCard
                  key={user._id}
                  user={user}
                  hasRequestSent={hasRequestSent}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
