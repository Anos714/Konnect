import { LoaderIcon } from "lucide-react"


const ChatLoader = () => {
  return (
    <div className="app-main h-screen flex flex-col items-center justify-center p-4">
<LoaderIcon className="animate-spin size-8 text-primary"/>
<p className="mt-4 text-center text-sm font-medium text-base-content/60">Opening your conversation...</p>
    </div>
  )
}
export default ChatLoader