"use client";
import { ReactNode } from "react";
import { SessionProvider as S } from "next-auth/react";

const SessionProvider = ({ children }: { children: ReactNode }) => {
  return <S>{children}</S>;
};

export default SessionProvider;
