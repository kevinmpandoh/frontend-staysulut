import ForgotPasswordForm from "@/features/auth/Login/ForgotPassword";
import { Suspense } from "react";

const ForgotPasswordPage = () => {
  return (
    <>
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        <ForgotPasswordForm />
      </Suspense>
    </>
  );
};

export default ForgotPasswordPage;
