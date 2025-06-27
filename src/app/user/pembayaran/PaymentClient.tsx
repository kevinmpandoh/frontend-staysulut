// "use client";

// import { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { toast } from "sonner";

// import { useBilling } from "@/hooks/useBilling";
// import { usePayment } from "@/hooks/usePayment";
// import { isAxiosErrorWithStatus } from "@/utils/isAxiosErrorWithStatus";
// import { PAYMENT_METHOD } from "@/constants/paymentMethod";

// import { CountdownTimer } from "@/components/payment/CountdownTimer";
// import { InvoiceSection } from "@/components/payment/InvoiceSection";
// import { PaymentMethodSelector } from "@/components/payment/PaymentMethodSelector";
// import { PaymentCTA } from "@/components/payment/PaymentCTA";
// import { PaymentInstruction } from "@/components/payment/PaymentInstruction";
// import { PaymentSummary } from "@/components/payment/PaymentSummary";
// import { PaymentMethodDialog } from "@/components/Modal/PaymentMethodModal";
// import useCountdown from "./hooks/useCountdown";

// import { ArrowLeft } from "lucide-react";

// const PaymentClient = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTemp, setSelectedTemp] = useState(null);
//   const [confirmedMethod, setConfirmedMethod] = useState(null);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const billingId = searchParams.get("billingId") ?? "";

//   const {
//     billing,
//     loadingBilling,
//     billingError,
//     changeMethod,
//     confirmPayment,
//     confirmingPayment,
//   } = useBilling({ billingId });

//   const { payment, loadingPayment, createPayment, creatingPayment } =
//     usePayment({
//       billingId,
//       hasPayment: billing?.hasPayment,
//     });

//   const timeLeft = useCountdown(payment?.expiry_time ?? null);

//   useEffect(() => {
//     if (!loadingPayment && payment) {
//       const { status } = payment;
//       if (status === "success" || status === "failed" || status === "expired") {
//         router.push("/user/pengajuan-sewa");
//       }
//     }
//   }, [loadingPayment, payment, router]);

//   if (!billingId) {
//     return (
//       <p className="text-red-500">
//         Silakan pilih tagihan melalui halaman daftar tagihan.
//       </p>
//     );
//   }

//   if (isAxiosErrorWithStatus(billingError, 404)) {
//     return (
//       <p className="text-center text-red-500">Tagihan tidak ditemukan (404).</p>
//     );
//   }

//   if (loadingBilling || loadingPayment || !billing) {
//     return (
//       <div className="flex justify-center items-center h-96">Loading...</div>
//     );
//   }

//   const handleConfirmMethod = () => {
//     if (!selectedTemp)
//       return toast.error("Pilih metode pembayaran terlebih dahulu.");
//     if (payment) {
//       changeMethod({ billingId: billing.id, provider: selectedTemp.value });
//     } else {
//       setConfirmedMethod(selectedTemp);
//     }
//     setIsModalOpen(false);
//   };

//   const handleClick = () => {
//     if (!confirmedMethod)
//       return toast.error("Silakan pilih metode pembayaran terlebih dahulu.");
//     createPayment({ billingId: billing.id, provider: confirmedMethod.value });
//   };

//   const handleConfirm = () => {
//     if (!billing)
//       return toast.error("Tidak ada tagihan yang bisa dikonfirmasi.");
//     confirmPayment(billing.id);
//   };

//   return (
//     <main className="flex flex-col md:flex-row max-w-7xl mx-auto py-10 gap-10 flex-grow">
//       <section className="flex-1 w-full">
//         <button className="flex items-center text-gray-700 font-semibold text-sm mb-6 gap-2">
//           <ArrowLeft size={18} /> Kembali
//         </button>

//         <h1 className="text-3xl font-extrabold mb-8">Pembayaran</h1>

//         {timeLeft && payment && (
//           <CountdownTimer
//             timeLeft={timeLeft}
//             expiry_time={payment.expiry_time}
//           />
//         )}

//         <InvoiceSection invoice={billing.invoice} />

//         {!payment ? (
//           <>
//             <PaymentMethodSelector
//               confirmedMethod={confirmedMethod}
//               openModal={() => setIsModalOpen(true)}
//             />
//             <PaymentCTA
//               creatingPayment={creatingPayment}
//               handleClick={handleClick}
//               confirmedMethod={confirmedMethod}
//             />
//           </>
//         ) : (
//           <>
//             <PaymentInstruction payment={payment} />
//             <div className="flex space-x-4">
//               <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="flex-1 border border-blue-600 text-blue-600 font-semibold rounded-md py-2 hover:bg-blue-50"
//               >
//                 Ganti Metode Pembayaran
//               </button>
//               <button
//                 onClick={handleConfirm}
//                 disabled={confirmingPayment}
//                 className="flex-1 bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700"
//               >
//                 {confirmingPayment ? "Memproses..." : "Saya sudah bayar"}
//               </button>
//             </div>
//           </>
//         )}
//       </section>

//       <PaymentSummary billing={billing} />

//       <PaymentMethodDialog
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleConfirmMethod}
//         selected={selectedTemp}
//         setSelected={setSelectedTemp}
//         methods={PAYMENT_METHOD}
//       />
//     </main>
//   );
// };

// export default PaymentClient;
