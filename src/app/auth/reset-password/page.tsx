import ResetPasswordForm from "@/features/auth/Login/ResetPassword";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        <ResetPasswordForm />
      </Suspense>
    </>
  );
};

export default page;
