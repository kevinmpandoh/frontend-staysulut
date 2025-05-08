import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const TagihanPage = () => {
  return (
    <div>
      <Tabs defaultValue="belum" className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="belum">Belum Dibayar</TabsTrigger>
          <TabsTrigger value="sudah">Sudah Dibayar</TabsTrigger>
        </TabsList>

        <TabsContent value="sudah">
          <div className="mt-4 space-y-4">
            <div className="rounded-lg border shadow-sm p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Pay–123123</span>
                <span className="text-orange-500 font-semibold">
                  Menunggu Pembayaran
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <div>
                  <p className="font-semibold text-gray-900">Kost Vinshi</p>
                  <p className="text-xs text-gray-500">Pembayaran bulan ke-1</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Jatuh Tempo</p>
                  <p className="text-sm text-gray-800">1 Desember 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total Pembayaran</p>
                  <p className="text-base font-bold text-gray-900">
                    Rp 7.000.000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="belum">
          <div className="mt-4 text-sm text-gray-500">
            Belum ada tagihan yang harus dibayar.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TagihanPage;

// {/* <div className="flex flex-col lg:flex-row lg:space-x-8">
//   {/* Left sidebar */}

//   {/* Right content */}
//   <section className="flex-grow mt-10 lg:mt-0 bg-white rounded-lg p-8">
//     <a
//       href="#"
//       className="inline-flex items-center text-gray-700 font-semibold text-sm mb-4 hover:underline"
//     >
//       <i className="fas fa-arrow-left mr-2"></i> Kembali
//     </a>
//     <h1 className="text-2xl font-extrabold text-[#1f2937] mb-6">
//       Tagihan Kost
//     </h1>

//     {/* Tabs */}
//     <div className="flex border-b border-gray-200 mb-6 space-x-8 text-sm font-semibold">
//       <button
//         onClick={() => setTab("belum")}
//         className={`pb-2 ${
//           tab === "belum"
//             ? "text-[#373fff] border-b-2 border-[#373fff]"
//             : "text-gray-500"
//         }`}
//       >
//         Belum Dibayar
//       </button>
//       <button
//         onClick={() => setTab("sudah")}
//         className={`pb-2 ${
//           tab === "sudah"
//             ? "text-gray-700 border-b-2 border-gray-300"
//             : "text-gray-400"
//         }`}
//       >
//         Sudah Dibayar
//       </button>
//     </div>

//     {/* Card */}
//     {tab === "belum" && (
//       <div className="border border-gray-200 rounded-lg p-6 shadow-sm max-w-4xl">
//         <div className="flex justify-between text-xs text-gray-600 mb-3">
//           <div>12 Juli 2024 | Pay-123123</div>
//           <div>
//             <span className="inline-block bg-[#ffedd5] text-[#c2410c] text-[10px] font-semibold px-2 py-0.5 rounded-full select-none">
//               Menunggu Pembayaran
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-gray-300 text-sm">
//           <div className="sm:flex-1 pr-0 sm:pr-6 mb-4 sm:mb-0">
//             <p className="font-semibold text-[#111827] mb-1">Kost Vinshi</p>
//             <p className="text-gray-600 text-xs">Pembayaran bulan ke-1</p>
//           </div>
//           <div className="sm:flex-1 px-0 sm:px-6 mb-4 sm:mb-0">
//             <p className="font-semibold text-[#111827] mb-1">
//               Metode Pembayaran
//             </p>
//             <p className="text-gray-600 text-xs">Transfer Bank</p>
//             <div className="mt-1">
//               <img
//                 src="https://placehold.co/24x16/png?text=BNI+Logo"
//                 alt="BNI bank logo in orange and blue colors"
//                 className="inline-block"
//               />
//             </div>
//           </div>
//           <div className="sm:flex-1 pl-0 sm:pl-6 flex flex-col justify-between items-end">
//             <div>
//               <p className="font-semibold text-[#111827] mb-1 text-right">
//                 Total Pembayaran
//               </p>
//               <p className="font-extrabold text-[#111827] text-lg text-right">
//                 Rp 7.000.000
//               </p>
//             </div>
//             <button
//               type="button"
//               className="mt-4 sm:mt-0 border border-[#373fff] text-[#373fff] font-semibold rounded-md px-4 py-2 hover:bg-[#373fff] hover:text-white transition-colors"
//             >
//               Bayar Sekarang
//             </button>
//           </div>
//         </div>
//       </div>
//     )}

//     {tab === "sudah" && (
//       <div className="text-center text-gray-400 py-20">
//         Sudah Dibayar content here
//       </div>
//     )}
//   </section>
// </div>; */}
