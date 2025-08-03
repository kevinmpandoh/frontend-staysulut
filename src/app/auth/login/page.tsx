// src/app/auth/login/page.tsx
import LoginForm from "@/features/auth/Login/LoginForm";
import React, { Suspense } from "react";
// import { LoginForm } from "@/features/auth";

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
