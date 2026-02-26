import { VideoIcon } from "lucide-react"

const CallButton = ({handleVideoCall}:{handleVideoCall:()=>void}) => {
  return (
   <div className="flex p-3 border-b items-center justify-end max-w-7xl mx-auto w-full absolute top-0 right-0">
        <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
            <VideoIcon size={20} />
        </button>
    </div>
  )
}
export default CallButton