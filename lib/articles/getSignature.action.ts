"use server";
import { cloudinary } from "@/cloudinary.config";
import { errorIfNotLoggedIn } from "./server-utils";

export const getSignature = async (): Promise<{
  timestamp: number;
  upload_presets: [string, string, string];
  signatures: [string, string, string];
}> => {
  const sessionError = await errorIfNotLoggedIn();
  if (sessionError) {
    console.error("session error", sessionError);
    throw new Error(sessionError.error);
  }
  const secret = process.env.CLOUDINARY_API_SECRET as string;
  const upload_preset_medium = process.env
    .NEXT_PUBLIC_CLOUDINARY_PRESET_MEDIUM as string;
  const upload_preset_low = process.env
    .NEXT_PUBLIC_CLOUDINARY_PRESET_LOW as string;
  const upload_preset_very_low = process.env
    .NEXT_PUBLIC_CLOUDINARY_PRESET_VERY_LOW as string;

  if (
    !secret ||
    !upload_preset_medium ||
    !upload_preset_low ||
    !upload_preset_very_low
  ) {
    throw new Error(`One of cloudinary env variables is missing`);
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signatureMedium = cloudinary.utils.api_sign_request(
    { timestamp: timestamp, upload_preset: upload_preset_medium },
    secret
  );
  const signatureLow = cloudinary.utils.api_sign_request(
    { timestamp: timestamp, upload_preset: upload_preset_low },
    secret
  );
  const signatureVeryLow = cloudinary.utils.api_sign_request(
    { timestamp: timestamp, upload_preset: upload_preset_very_low },
    secret
  );

  return {
    timestamp,
    upload_presets: [
      upload_preset_medium,
      upload_preset_low,
      upload_preset_very_low,
    ],
    signatures: [signatureMedium, signatureLow, signatureVeryLow],
  };
};
