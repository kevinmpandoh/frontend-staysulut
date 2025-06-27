"use client";
import { Button } from "@/components/ui/button";
import { useCreateKostStore } from "@/stores/createKost.store";
import React from "react";

const FooterKostType = ({
  lastCompletedStep,
}: {
  lastCompletedStep: number;
}) => {
  const { currentStep, setCurrentStep, triggerNext } = useCreateKostStore();

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    triggerNext(); // Ini akan diproses oleh komponen step aktif
  };

  return (
    <footer className="fixed bottom-0 left-[320px] right-0 bg-white border-t border-gray-200 z-50">
      <div className="px-10 py-8 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          size={"xl"}
        >
          Kembali
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentStep > 4 || currentStep > lastCompletedStep + 1}
          className="bg-primary text-white"
          size={"xl"}
        >
          Edit Data
        </Button>
      </div>
    </footer>
  );
};

export default FooterKostType;
