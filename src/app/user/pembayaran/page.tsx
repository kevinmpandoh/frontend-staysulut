"use client";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";

import { useBilling } from "@/hooks/useBilling";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { isAxiosErrorWithStatus } from "@/utils/isAxiosErrorWithStatus";
import { PAYMENT_METHOD } from "@/contstans/paymentMethod";
import { PaymentMethodDialog } from "@/components/Modal/PaymentMethodModal";
import { PaymentMethodSelector } from "@/components/payment/PaymentMethodSelector";
import { InvoiceSection } from "@/components/payment/InvoiceSection";
import { PaymentCTA } from "@/components/payment/PaymentCTA";
import { PaymentInstruction } from "@/components/payment/PaymentInstruction";
import { CountdownTimer } from "@/components/payment/CountdownTimer";
import { PaymentSummary } from "@/components/payment/PaymentSummary";

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
  const bookingId = searchParams.get("bookingId") ?? "";

  const {
    unpaidBilling,
    loadingBilling,
    payment,
    loadingPayment,
    createPayment,
    creatingPayment,
    confirmPayment,
    confirmingPayment,
    billingError,
    changeMethod,
  } = useBilling(bookingId);

  const timeLeft = useCountdown(payment?.expiry_time ?? null);

  if (isAxiosErrorWithStatus(billingError, 404)) {
    return (
      <p className="text-center text-red-500">Tagihan tidak ditemukan (404).</p>
      // atau <NotFoundPage />
    );
  }

  if (!bookingId) {
    return <p className="text-red-500">Booking ID tidak ditemukan di URL.</p>;
  }

  if (loadingBilling || loadingPayment)
    return (
      <div className="flex justify-center items-center h-96">
        {/* <Spinner /> Komponen loading animasi */}
        Loading
      </div>
    );

  if (!unpaidBilling) return <p>Tidak ada tagihan yang belum dibayar.</p>;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleConfirmMethod = () => {
    if (!selectedTemp) {
      toast.error("Pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (payment) {
      changeMethod({
        billingId: unpaidBilling.id,
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
    if (unpaidBilling && confirmedMethod) {
      createPayment({
        billingId: unpaidBilling.id,
        provider: confirmedMethod.value,
      });
    }
  };

  const handleConfirm = () => {
    if (!unpaidBilling) {
      toast.error("Tidak ada tagihan yang bisa dikonfirmasi.");
      return;
    }
    confirmPayment(unpaidBilling.id, {
      onSuccess: () => {
        toast.success("Pembayaran berhasil dikonfirmasi.");
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message || "Gagal mengonfirmasi pembayaran."
        );
      },
    });
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

          {timeLeft && payment && (
            <CountdownTimer
              timeLeft={timeLeft}
              expiry_time={payment.expiry_time}
            />
          )}

          <InvoiceSection invoice={unpaidBilling.invoice} />
          {!payment ? (
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
          ) : (
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
                  disabled={confirmingPayment || !unpaidBilling}
                  className="flex-1 bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition"
                >
                  {confirmingPayment ? "Memproses..." : "Saya sudah bayar"}
                </button>
              </div>
            </>
          )}
        </section>

        {/* Right Section */}
        <PaymentSummary unpaidBilling={unpaidBilling} />
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
