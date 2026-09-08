import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
} from "../lib/api";
import { Link } from "react-router";
import FriendCard from "../components/friends/FriendCard";
import RecommendUserCard from "../components/friends/RecommendUserCard";

const Home = () => {
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

  const outgoingReqIds = new Set(
    outgoingFriendReqs?.outgoingReqs.map((req) => req.receiver._id) ?? [],
  );
  const [optimisticOutgoingIds, setOptimisticOutgoingIds] =
    useState<Set<string>>(new Set());
  const requestIds = new Set([...outgoingReqIds, ...optimisticOutgoingIds]);

  return (
    <div className="space-y-12 py-4 lg:py-8">
      {/* Your Friends Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="section-label mb-2">Your circle</p>
            <h2 className="page-heading text-3xl font-semibold">Your Friends</h2>
          </div>
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
          <h2 className="page-heading text-3xl font-semibold">Meet New Learners</h2>
          <p className="mt-2 text-base-content/60">
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
              const hasRequestSent = requestIds.has(user._id);

              return (
                <RecommendUserCard
                  key={user._id}
                  user={user}
                  hasRequestSent={hasRequestSent}
                  onRequestStateChange={(sent) => {
                    setOptimisticOutgoingIds((current) => {
                      const next = new Set(current);
                      if (sent) next.add(user._id);
                      else next.delete(user._id);
                      return next;
                    });
                  }}
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
