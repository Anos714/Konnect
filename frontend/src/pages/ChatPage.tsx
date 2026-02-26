import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getStreamToken } from "../lib/api";
import { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import{Channel,ChannelHeader,Chat,MessageInput,MessageList,Thread,Window} from 'stream-chat-react'
import { StreamChat,type Channel as StreamChannel } from "stream-chat";
import toast from "react-hot-toast";
import ChatLoader from "../components/loader/ChatLoader";
import CallButton from "../components/stream/CallButton";


const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
 
  const {id}=useParams()
  const [chatClient, setChatClient] = useState<StreamChat | null>(null)
const [channel, setChannel] = useState<StreamChannel | null>(null)
  const[loading,setLoading]=useState(true)


  const{authUser}=useAuthUser()
  if(!authUser){
    return <div>Please log in to access the chat.</div>
  }

  if(!id){
    return <div>No user specified for chat.</div>
  }

  const{data:streamTokenData}=useQuery({
    queryKey:["streamToken"],
    queryFn:getStreamToken,
    enabled:!!authUser
  })

  useEffect(()=>{
    const initChat=async()=>{
if(!streamTokenData?.token)return;
try {
  console.log("Initializing stream chat client");
  const client=StreamChat.getInstance(STREAM_API_KEY)
  await client.connectUser(
    {
      id:authUser._id,
      name:authUser.fullName,
      image:authUser.avatar
    },streamTokenData.token)

    const channelId=[authUser?._id,id].sort().join("-")
    const currentChannel=client.channel("messaging",channelId,{
      members:[authUser?._id,id]
    })
    await currentChannel.watch()
    setChannel(currentChannel)
    setChatClient(client)
    
    
} catch (error) {
  console.error("Error initializing chat:",error);
  toast.error("Failed to initialize chat. Please try again later.")
  
}finally{
  setLoading(false)
}
    }
    initChat()
  },[authUser,streamTokenData,id])

  const handleVideoCall=()=>{
if(channel){
  const callUrl=`${window.location.origin}/call/${channel.id}`
  channel.sendMessage({
    text:`${authUser.fullName} is inviting you to a video call
    ${callUrl}`,
   
  })
  toast.success("Video call invitation sent!")
}
  }

  if(loading||!chatClient||!channel) return <ChatLoader/>
  return <div className="h-[93vh]">
    <Chat client={chatClient}>
      <Channel channel={channel}>
        <div className="w-full relative">
          <CallButton handleVideoCall={handleVideoCall}/>
        <Window>
          <ChannelHeader/>
          <MessageList/>
          <MessageInput/>
        </Window>
        </div>
        <Thread/>
      </Channel>
    </Chat>
  </div>;
};

export default ChatPage;
