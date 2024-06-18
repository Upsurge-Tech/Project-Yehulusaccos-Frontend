"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode } from "react";
const Layout = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Layout;
