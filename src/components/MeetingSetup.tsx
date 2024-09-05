"use client";

import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();

  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call)
    throw Error("usestreamcall must be used with in a streamcall component");

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (callTimeNotArrived) {
    <Alert
      title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
    />;
  }

  if (callHasEnded) {
    <Alert
      iconUrl="/icons/call-ended.svg"
      title="The call has been ended by the host"
    />;
  }
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />

      <div className="flex h-16 items-center justify-center gap-3">
        <label
          className="flex items-center justify-center gap-2 font-medium"
          htmlFor="checkbox"
        >
          <Input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join With Mic and Camera off
        </label>
        <DeviceSettings />
      </div>

      <Button
        className="rounded-md  bg-green-500 px-4  py-2.4"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join Meeting
      </Button>
    </section>
  );
};

export default MeetingSetup;
