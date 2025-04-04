import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const AuthPage: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return <h1>Sabar yaaa</h1>;
  }

  return <>{children}</>;
};

export default AuthPage;
