import { Input } from "@/components/ui/input";
import { usePreferenceStore } from "@/stores/preference.store";
import { formatCurrency } from "@/utils/format";

const parseCurrency = (formatted: string) => {
  return formatted.replace(/[^\d]/g, "");
};

export default function PriceStep() {
  const price = usePreferenceStore((state) => state.price);
  const setPrice = usePreferenceStore((state) => state.setPrice);

  return (
    <div>
      <label className="block mb-2">Harga Kost per Bulan</label>
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-md font-semibold text-muted-foreground">
          Rp{" "}
        </span>
        <Input
          type="text"
          inputMode="numeric"
          value={formatCurrency(price)}
          onChange={(e) => {
            const raw = parseCurrency(e.target.value);
            setPrice(raw);
          }}
          className=" p-6 rounded pl-12 md:text-sm text-gray-600"
          placeholder="Contoh: 1500000"
        />
      </div>
    </div>
  );
}
