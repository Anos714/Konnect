import { VideoIcon } from "lucide-react"

const CallButton = ({handleVideoCall}:{handleVideoCall:()=>void}) => {
  return (
   <div className="flex p-4 items-center justify-end max-w-7xl mx-auto w-full absolute top-0 right-0 z-10">
        <button onClick={handleVideoCall} className="btn btn-primary btn-sm">
            <VideoIcon size={20} />
        </button>
    </div>
  )
}
export default CallButton