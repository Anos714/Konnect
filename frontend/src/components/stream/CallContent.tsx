import { CallControls, CallingState, SpeakerLayout, StreamTheme, useCallStateHooks } from "@stream-io/video-react-sdk"
import { Navigate } from "react-router"

const CallContent = () => {
    const {useCallCallingState}=useCallStateHooks()
    const callingState=useCallCallingState()
    

    if(callingState===CallingState.LEFT)return<Navigate to="/" replace/>
  return (
    <StreamTheme>
      <SpeakerLayout/>
      <CallControls/>
    </StreamTheme>
  )
}
export default CallContent