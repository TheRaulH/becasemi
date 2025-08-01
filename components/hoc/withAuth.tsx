/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSession } from "@/components/SessionProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const withAuth = (Component: React.ComponentType) => {
  return function ProtectedRoute(props: any) {
    const { session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (session === null) {
        router.push("/login");
      }
    }, [session, router]);

    if (session === undefined || session === null) {
      return null; // o un spinner de carga
    }

    return <Component {...props} />;
  };
};
