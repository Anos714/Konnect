import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { getStreamToken } from "../lib/api";
import{
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  Call, 
} from '@stream-io/video-react-sdk'
import '@stream-io/video-react-sdk/dist/css/styles.css';
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";
import CallContent from "../components/stream/CallContent";


const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY
const CallPage = () => {
  const {id:callId}=useParams()
  const [client, setClient] = useState<StreamVideoClient | null>(null)
const [call, setCall] = useState<Call | null>(null)
  const[isConnecting,setIsConnecting]=useState(true)


  const{authUser,isLoading}=useAuthUser()
  if(!authUser){
    return <div>Please log in to access the chat.</div>
  }

  if(!callId){
    return <div>No call specified.</div>
  }

  const{data:streamTokenData}=useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    enabled:!!authUser
  })


  useEffect(()=>{
const initCall=async()=>{
  if(!streamTokenData?.token||!authUser||!callId)return;
  try {
    console.log("Initializing Stream video client...");
    const user={
      id:authUser._id,
      name:authUser.fullName,
      image:authUser.avatar
    }
    const videoClient=new StreamVideoClient({
      apiKey:STREAM_API_KEY,
      user,
      token:streamTokenData.token
    })

    const callInstance= videoClient.call("default",callId)
    await callInstance.join({create:true})
    console.log("Joined call successfully");
    setClient(videoClient)
    setCall(callInstance)
  } catch (error) {
    console.error("Error initializing call:", error);
    toast.error("Failed to join call. Please try again later.")
  }finally{
setIsConnecting(false)
  }
}
initCall()
  },[streamTokenData,authUser,callId])

  if(isLoading||isConnecting)return <Loader/>
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client &&call?(
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent/>
            </StreamCall>
            </StreamVideo>
            
        ):(
          <div className="flex items-center justify-center h-full">
          <p>Could not initialize call. Please regresh or try again later</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CallPage