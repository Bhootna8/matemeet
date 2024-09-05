"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "@/hooks/use-toast";
import Loader from "./Loader";
import MeetingModal from "./MeetingModal";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create Meeting");
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "instant Meeting";

      await call.create({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetail(call);

      if (!values.description) {
        router.push(`meeting/${call?.id}`);
      }

      toast({ title: "Meeting Created" });
    } catch (error) {
      console.log(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  console.log(client)

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;
  return (
    <section className=" flex justify-evenly gap-y-6 flex-wrap">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant Meeting"
        
        handleClick={() => setMeetingState("isInstantMeeting")}
      />

      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        className=" bg-blue-1"
        description="via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />

      <HomeCard
        img="/icons/schedule.svg"
        className=" bg-purple-1"
        title="Schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("isScheduleMeeting")}
      />

      <HomeCard
        img="/icons/recordings.svg"
        className="bg-yellow-1"
        title="View Recordings"
        description="Meeting Recordings"
        handleClick={() => router.push("/recordings")}
      />

      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-x-2.5">
            <label
              className="text-base font-normal leading-[22.4px] text-sky-2"
              htmlFor="desc"
            >
              Add a description
            </label>
            <textarea
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-dark-3"
              name="desc"
              id="desc"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-x-2.5">
            <label
              className="text-base font-normal leading-[22.4px] text-sky-2"
              htmlFor="date-time"
            >
              Select Date and Time
            </label>

            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => navigator.clipboard.writeText(meetingLink)}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        buttonText="Join Meeting"
        className="text-center"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 "
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        handleClick={createMeeting}
        title="Start an instant meeting"
        className="text-center"
        buttonText="Start Meeting"

      />
    </section>
  );
};

export default MeetingTypeList;
