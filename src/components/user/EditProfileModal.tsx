// components/EditProfileDialog.tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { editProfileSchema } from "@/validation/tenant.validation";

import { Pencil } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useEffect } from "react";

interface EditProfileDialogProps {
  open: boolean;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  onSubmit: (data: any) => void;
}

export const EditProfileModal = ({
  open,
  onOpenChange,
  user,
  onSubmit,
  isLoading,
}: EditProfileDialogProps) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: "",
      jenis_kelamin: "Laki-laki",
      pekerjaan: "",
      pekerjaan_lainnya: "",
      kota_asal: "",
      tanggal_lahir: "",
      kontak_darurat: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        jenis_kelamin: user.jenis_kelamin || "Laki-laki",
        pekerjaan: user.pekerjaan || "",
        pekerjaan_lainnya: user.pekerjaan_lainnya || "",
        kota_asal: user.kota_asal || "",
        tanggal_lahir: user.tanggal_lahir || "",
        kontak_darurat: user.kontak_darurat || "",
      });
    }
  }, [user, reset]);

  const pekerjaan = watch("pekerjaan");

  const pekerjaanOptions = [
    "Pelajar",
    "Mahasiswa",
    "Karyawan",
    "Wiraswasta",
    "Lainnya",
  ];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button className="bg-[#E0E7FF] rounded-full p-2 hover:bg-[#C7D2FE] transition">
          <Pencil className="text-[#4338CA]" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Profil</DialogTitle>
          <DialogDescription>Perbarui informasi akun Anda.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Nama */}
          <div>
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" {...register("name")} placeholder="Nama lengkap" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Jenis Kelamin */}
          <div>
            <Label>Jenis Kelamin</Label>
            <RadioGroup
              defaultValue="Laki-laki"
              className="flex gap-6"
              {...register("jenis_kelamin")}
            >
              <Label className="flex items-center space-x-2">
                <RadioGroupItem value="Laki-laki" />
                <span>👨 Laki-laki</span>
              </Label>
              <Label className="flex items-center space-x-2">
                <RadioGroupItem value="Perempuan" />
                <span>👩 Perempuan</span>
              </Label>
            </RadioGroup>
            {errors.jenis_kelamin && (
              <p className="text-sm text-red-500">
                {errors.jenis_kelamin.message}
              </p>
            )}
          </div>

          {/* Pekerjaan */}
          <div>
            <Label htmlFor="pekerjaan">Pekerjaan</Label>
            <select
              id="pekerjaan"
              {...register("pekerjaan")}
              className="border rounded w-full h-10 px-2"
            >
              <option value="">-- Pilih pekerjaan --</option>
              {pekerjaanOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.pekerjaan && (
              <p className="text-sm text-red-500">{errors.pekerjaan.message}</p>
            )}
          </div>

          {/* Pekerjaan Lainnya */}
          {pekerjaan === "Lainnya" && (
            <div>
              <Label htmlFor="pekerjaan_lainnya">Pekerjaan Lainnya</Label>
              <Input
                id="pekerjaan_lainnya"
                {...register("pekerjaan_lainnya")}
                placeholder="Isi pekerjaan lainnya"
              />
              {errors.pekerjaan_lainnya && (
                <p className="text-sm text-red-500">
                  {errors.pekerjaan_lainnya.message}
                </p>
              )}
            </div>
          )}

          {/* Tanggal Lahir */}
          <div>
            <Label htmlFor="tanggal_lahir">Tanggal Lahir</Label>
            <Input
              type="date"
              id="tanggal_lahir"
              {...register("tanggal_lahir")}
            />
            {errors.tanggal_lahir && (
              <p className="text-sm text-red-500">
                {errors.tanggal_lahir.message}
              </p>
            )}
          </div>

          {/* Nama */}
          <div>
            <Label htmlFor="kota_asal">Kota Asal</Label>
            <Input
              id="kota_asal"
              {...register("kota_asal")}
              placeholder="Kota Asal"
            />
            {errors.kota_asal && (
              <p className="text-sm text-red-500">{errors.kota_asal.message}</p>
            )}
          </div>

          {/* Kontak Darurat */}
          <div>
            <Label htmlFor="kontak_darurat">Kontak Darurat</Label>
            <Input
              id="kontak_darurat"
              placeholder="08xxxxxxxxxx"
              {...register("kontak_darurat")}
            />
            {errors.kontak_darurat && (
              <p className="text-sm text-red-500">
                {errors.kontak_darurat.message}
              </p>
            )}
          </div>

          <Button disabled={isLoading} type="submit">
            {isLoading ? "Memproses..." : "Simpan Perubahan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
