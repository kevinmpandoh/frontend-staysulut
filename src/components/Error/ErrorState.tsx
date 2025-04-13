"use client";

import React from "react";
import { Button } from "../ui/button";

type ErrorStateProps = {
  message: string;
};

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="text-center py-10 space-y-4">
      <p className="text-md font-semibold">{message}</p>
      <Button onClick={handleRefresh} size={"xl"}>
        Coba Lagi
      </Button>
    </div>
  );
};

export default ErrorState;
