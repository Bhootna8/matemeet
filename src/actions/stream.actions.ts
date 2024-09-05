"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const streamApiKey = process.env.NEXT_PUBIC_STREAM_API_KEY;
const streamSecretKey = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  try {
    const user = await currentUser();

    const streamClient = new StreamClient(streamApiKey!, streamSecretKey!);

    const expirationTime = Math.floor(Date.now() / 1000) + 3600;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamClient.createToken(user?.id!, expirationTime, issuedAt)

    return token
  } catch (error) {
    console.log(error)
    throw new Error(`there is error ${error}`);
  }
};
