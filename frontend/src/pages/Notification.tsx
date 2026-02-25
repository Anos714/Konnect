import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendReq, getFriendReqs, rejectFriendReq } from "../lib/api";
import { UserPlus, Bell, Check, X, UserCheck, Clock } from "lucide-react";

const Notification = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequest"],
    queryFn: getFriendReqs,
  });

  const { mutate: acceptFriendReqMutation, isPending: acceptFriendPending } =
    useMutation({
      mutationFn: (id: string) => acceptFriendReq(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["friendRequest"] });
        queryClient.invalidateQueries({ queryKey: ["friends"] });
      },
    });

  const { mutate: rejectFriendReqMutation, isPending: rejectFriendPending } =
    useMutation({
      mutationFn: (id: string) => rejectFriendReq(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["friendRequest"] });
        queryClient.invalidateQueries({ queryKey: ["friends"] });
      },
    });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  console.log(incomingRequests, acceptedRequests);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>

      {/* Friend Requests Section */}
     
        
          {isLoading ? (
            <div className="flex items-center py-12">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : (
              <section>
            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 mb-6">
              <UserPlus className="w-5 h-5 text-success" />
              <h2 className="text-xl font-semibold">Friend Requests</h2>
              <span className="badge badge-success badge-sm">
                {incomingRequests.length}
              </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
          {incomingRequests.length > 0 ? (
            incomingRequests.map((req) => (
              <div
                key={req._id}
                className="card bg-base-200/50 border border-base-content/10 shadow-sm"
              >
                <div className="card-body p-4 md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                        <img src={req.sender.avatar} alt="avatar" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {req.sender.fullName}
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="badge badge-primary badge-outline text-[10px] h-5">
                          Native: {req.sender.nativeLang}
                        </span>
                        <span className="badge badge-secondary badge-outline text-[10px] h-5">
                          Learning: {req.sender.learningLang}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => acceptFriendReqMutation(req._id)}
                      disabled={acceptFriendPending}
                      className="btn btn-success btn-sm md:btn-md rounded-xl flex-1 md:flex-none px-6"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => rejectFriendReqMutation(req._id)}
                      disabled={rejectFriendPending}
                      className="btn btn-outline btn-error btn-sm md:btn-md rounded-xl flex-1 md:flex-none"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-base-content/50 italic ml-7">
              No pending requests
            </p>
          )}
        </div>
            </div>
             </section>
          )}
        

        
     

      {/* New Connections Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5 text-info" />
          <h2 className="text-xl font-semibold">New Connections</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {acceptedRequests.length > 0 ? (
            acceptedRequests.map((req) => (
              <div
                key={req._id}
                className="card bg-base-200/30 border border-base-content/5"
              >
                <div className="card-body p-4 flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="avatar online placeholder">
                      <div className="w-10 h-10 rounded-full bg-neutral text-neutral-content">
                        <img src={req.receiver.avatar} alt="avatar" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm md:text-base">
                        {req.receiver.fullName}
                      </h3>
                      <p className="text-xs opacity-60 flex items-center gap-1">
                        {req.receiver.fullName} accepted your friend request
                      </p>
                      <p className="text-[10px] opacity-40 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Recently
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="badge badge-info badge-outline gap-2 p-3">
                      <UserCheck className="w-3 h-3" /> New Friend
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-base-content/50 italic ml-7">
              No new connections yet
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Notification;
