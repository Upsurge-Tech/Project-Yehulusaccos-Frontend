"use server";
import { cloudinary } from "@/cloudinary.config";
import { errorIfNotLoggedIn } from "./server-utils";

export const getSignature = async () => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) {
    console.error("session error", sessionError);
    return sessionError;
  }
  const secret = process.env.CLOUDINARY_API_SECRET as string;
  const upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET as string;

  if (!secret || !upload_preset) {
    return { error: `One of cloudinary env variables is missing` };
  }

  if (!secret) return { error: "Cloudinary secret not found" };

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp: timestamp, upload_preset },
    secret
  );

  return { timestamp, upload_preset, signature };
};
