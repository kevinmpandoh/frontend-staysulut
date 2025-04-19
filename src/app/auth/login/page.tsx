import React, { Suspense } from "react";
import LoginForm from "@/features/auth/Login/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
};

export default LoginPage;
