"use client";

import { useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { getFacilities } from "@/services/facilities.service";

import { preferenceService } from "@/services/preference.service";
import LocationPicker from "../common/LocationPicker";
import ExpandableCheckboxList from "../common/ExpandableCheckboxList";

// const fasilitasOptions = ["WiFi", "Parkir", "Dapur", "AC", "Kamar Mandi Dalam"];
const keamananOptions = ["CCTV", "Keamanan 24 Jam", "Akses Fingerprint"];

export default function PreferensiPengguna() {
  const { data, isLoading } = useQuery({
    queryKey: ["userPreference"],
    queryFn: preferenceService.getPreference,
  });
  const { data: fasilitas } = useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
  });

  // console.log(fasilitas?.map((f: any) => f.nama_fasilitas));

  const fasilitasOptions = fasilitas?.map((f: any) => f.nama_fasilitas);
  console.log(fasilitasOptions);

  const [form, setForm] = useState({
    price: { min: 0, max: 0 },
    fasilitasKost: [] as string[],
    fasilitasKamar: [] as string[],
    jenis_kost: "",
    keamanan: [] as string[],
    lokasi: {
      koordinat: { lat: -6.1751, lng: 106.865 },
    },
  });

  const { mutate, isPending: isSubmitting } = useMutation({
    mutationFn: preferenceService.createOrUpdatePreference,
    onSuccess: () => toast.success("Preferensi berhasil disimpan!"),
    onError: () => toast.error("Gagal menyimpan preferensi."),
  });

  useEffect(() => {
    if (data) {
      setForm({
        price: data.harga,
        fasilitasKost: data.fasilitasKost || [],
        fasilitasKamar: data.fasilitasKamar || [],
        jenis_kost: data.jenis_kost,
        keamanan: data.keamanan || [],
        lokasi: data.lokasi || { koordinat: { lat: -6.1751, lng: 106.865 } },
      });
    }
  }, [data]);

  const handleCheckboxChange = (
    key: "fasilitasKost" | "fasilitasKamar" | "keamanan",
    value: string
  ) => {
    setForm((prev) => {
      const selected = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: selected };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "min" || name === "max") {
      setForm((prev) => ({
        ...prev,
        price: {
          ...prev.price,
          [name]: Number(value),
        },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(form);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Range Harga</h3>
        <div className="flex gap-4">
          <Input
            type="number"
            name="min"
            value={form.price.min}
            onChange={handleChange}
            placeholder="Min"
          />
          <Input
            type="number"
            name="max"
            value={form.price.max}
            onChange={handleChange}
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Jenis Kost</h3>
        <RadioGroup
          value={form.jenis_kost}
          onValueChange={(value) =>
            setForm((prev) => ({ ...prev, jenis_kost: value }))
          }
        >
          <div className="flex gap-4">
            {["Putra", "Putri", "Campur"].map((jenis) => (
              <Label key={jenis} className="flex items-center gap-2">
                <RadioGroupItem value={jenis} id={jenis} />
                {jenis}
              </Label>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div>
        {/* <h3 className="font-semibold mb-2">Fasilitas Kost</h3> */}
        {/* <div className="grid grid-cols-4 gap-2"> */}
        <ExpandableCheckboxList
          label="Fasilitas Kost"
          options={fasilitasOptions}
          selected={form.fasilitasKost}
          onChange={(value) => handleCheckboxChange("fasilitasKost", value)}
          initialVisibleCount={8}
        />
        {/* </div> */}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Keamanan</h3>
        <div className="grid grid-cols-2 gap-2">
          {keamananOptions.map((item) => (
            <Label key={item} className="flex items-center gap-2">
              <Checkbox
                checked={form.keamanan.includes(item)}
                onCheckedChange={() => handleCheckboxChange("keamanan", item)}
              />
              {item}
            </Label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Lokasi Preferensi</h3>
        <p className="text-sm text-gray-500 mb-2">
          Klik pada peta untuk memilih lokasi kost yang diinginkan.
        </p>
        <div className="h-[300px] rounded overflow-hidden">
          <LocationPicker
            value={form.lokasi.koordinat}
            onChange={(lat, lng) =>
              setForm((prev) => ({
                ...prev,
                lokasi: { koordinat: { lat, lng } },
              }))
            }
          />
        </div>
        <p className="text-sm mt-2 text-gray-600">
          Koordinat: {form.lokasi.koordinat.lat.toFixed(5)},{" "}
          {form.lokasi.koordinat.lng.toFixed(5)}
        </p>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Menyimpan..." : "Simpan Preferensi"}
      </Button>
    </form>
  );
}
