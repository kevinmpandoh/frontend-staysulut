"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useBilling } from "@/hooks/useBilling";
import { toast } from "sonner";
import { notFound, useSearchParams } from "next/navigation";
import { PAYMENT_METHOD } from "@/constants/paymentMethod";
import { PaymentMethodDialog } from "@/components/Modal/PaymentMethodModal";
import { PaymentMethodSelector } from "@/components/payment/PaymentMethodSelector";
import { InvoiceSection } from "@/components/payment/InvoiceSection";
import { PaymentCTA } from "@/components/payment/PaymentCTA";
import { PaymentInstruction } from "@/components/payment/PaymentInstruction";
import { CountdownTimer } from "@/components/payment/CountdownTimer";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { usePayment } from "@/hooks/usePayment";
import { APIError } from "@/utils/handleAxiosError";
import ErrorDisplay from "@/components/errors/ErrorDisplay";

// === Countdown Hook ===
function useCountdown(expiredAt: string | null) {
  const calculateTimeLeft = () => {
    if (!expiredAt) return null;
    const difference = +new Date(expiredAt) - +new Date();
    if (difference <= 0) return null;
    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!expiredAt) return null;
      const difference = +new Date(expiredAt) - +new Date();
      if (difference <= 0) return null;
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredAt]);

  return timeLeft;
}

const PaymentTenant = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState<{
    name: string;
    logo: string;
    value: string;
  } | null>(null);
  const [confirmedMethod, setConfirmedMethod] = useState<{
    name: string;
    logo: string;
    value: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const invoice = searchParams.get("invoice") ?? "";

  const { billing, loadingBilling, errorBilling } = useBilling({ invoice });

  const {
    payment,
    loadingPayment,
    createPayment,
    creatingPayment,
    changeMethod,
    changingMethod,
    confirmPayment,
    confirmingPayment,
  } = usePayment({ billingId: billing?.id, hasPayment: billing?.hasPayment });

  const timeLeft = useCountdown(payment?.expiry_time ?? null);
  const sudahBayar =
    billing?.status === "paid" || payment?.status === "success";

  if (errorBilling instanceof APIError) {
    if (errorBilling.status === 404) {
      return <ErrorDisplay status={404} message="Tagihan tidak ditemukan." />;
    }
    return (
      <ErrorDisplay
        status={errorBilling.status}
        message={errorBilling.message}
      />
    );
  }

  if (!invoice) {
    notFound();
  }

  if (loadingBilling || !billing || loadingPayment || changingMethod)
    return (
      <div className="flex justify-center items-center h-96">
        {/* <Spinner /> Komponen loading animasi */}
        Loading
      </div>
    );

  if (sudahBayar) {
    return (
      <main className="flex w-full items-center justify-center h-[70vh] px-4">
        <div className="max-w-md w-full bg-green-100 border border-green-400 text-green-800 rounded-lg p-6 text-center shadow">
          <h2 className="text-2xl font-bold mb-2">Pembayaran Berhasil ✅</h2>
          <p className="text-sm">Tagihan ini telah dibayar. Terima kasih!</p>
        </div>
      </main>
    );
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleConfirmMethod = () => {
    if (!selectedTemp) {
      toast.error("Pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (payment) {
      changeMethod({
        paymentId: payment.id,
        provider: selectedTemp.value,
      });
      // setSelectedTemp(null);
      closeModal();
    } else {
      setConfirmedMethod(selectedTemp);
      // setSelectedTemp(null);
      closeModal();
    }
  };

  const handleClick = () => {
    if (!confirmedMethod) {
      toast.error("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }
    if (billing && confirmedMethod) {
      createPayment({
        billingId: billing.id,
        provider: confirmedMethod.value,
      });
    }
  };

  const handleConfirm = () => {
    if (!payment) {
      toast.error("Tidak ada Pembayaran yang bisa dikonfirmasi.");
      return;
    }
    confirmPayment(payment.id);
  };

  return (
    <>
      {/* Header */}

      {/* Main Content */}
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto py-10 gap-10 flex-grow">
        {/* Left Section */}
        <section className="flex-1 w-full">
          <button
            type="button"
            className="flex items-center text-gray-700 font-semibold text-sm mb-6 select-none gap-2"
          >
            <ArrowLeft size={18} /> Kembali
          </button>
          <h1 className="text-3xl font-extrabold mb-8 select-text">
            Pembayaran
          </h1>

          {(billing.status === "paid" || payment?.status === "success") && (
            <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md mb-6">
              Tagihan sudah dibayar.
            </div>
          )}

          {timeLeft && payment && (
            <CountdownTimer
              timeLeft={timeLeft}
              expiry_time={payment.expiry_time}
            />
          )}

          <InvoiceSection invoice={billing?.invoice} />
          {!payment && !sudahBayar ? (
            <>
              <PaymentMethodSelector
                confirmedMethod={confirmedMethod}
                openModal={openModal}
              />

              <PaymentCTA
                creatingPayment={creatingPayment}
                handleClick={handleClick}
                confirmedMethod={confirmedMethod}
              />
            </>
          ) : payment && !sudahBayar ? (
            <>
              <PaymentInstruction payment={payment} />

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="flex-1 border border-blue-600 text-blue-600 font-semibold rounded-md py-2 hover:bg-blue-50 transition"
                >
                  Ganti Metode Pembayaran
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={confirmingPayment || !billing}
                  className="flex-1 bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition"
                >
                  {confirmingPayment ? "Memproses..." : "Saya sudah bayar"}
                </button>
              </div>
            </>
          ) : null}
        </section>

        {/* Right Section */}
        <PaymentSummary billing={billing} />
      </main>

      {/* Modal */}
      <PaymentMethodDialog
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmMethod}
        selected={selectedTemp}
        setSelected={(method) => setSelectedTemp(method)}
        methods={PAYMENT_METHOD}
      />
    </>
  );
};

export default PaymentTenant;
