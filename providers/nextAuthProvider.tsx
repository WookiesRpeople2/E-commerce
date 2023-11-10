"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

interface nextAuthProviderProps {
  children: React.ReactNode;
}

export const NextAuthProvider: React.FC<nextAuthProviderProps> = ({
  children,
}) => {
  return <SessionProvider>{children}</SessionProvider>;
};
