"use client";

import Image from "next/image";
// import { useUploadFile } from "@/hooks/useUploadFile";
import { useState } from "react";

export default function UploadDocument({
  onChange,
}: {
  onChange: (file: File | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(null);
  // const { mutate: uploadFile } = useUploadFile();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
      // try {
      //   // Mengupload file dan mendapatkan URL
      //   const data = await uploadFile(file);
      //   console.log(data, "Data Upload File");
      //   onChange(data?.url || null); // Kirim URL ke parent
      // } catch (error) {
      //   console.error("File upload failed:", error);
      // }
    }
  };

  return (
    <div className="border-2 border-dashed w-[300px] border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-400">
      <label className="cursor-pointer flex flex-col items-center">
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded"
            width={120}
            height={120}
          />
        ) : (
          <>
            <svg
              className="w-8 h-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16v4h10v-4m-4-4l4-4m0 0l-4-4m4 4H3"
              />
            </svg>
            <span>Upload</span>
          </>
        )}
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>
      <p className="mt-2 text-sm text-gray-500">Foto KTP (Opsional)</p>
    </div>
  );
}
