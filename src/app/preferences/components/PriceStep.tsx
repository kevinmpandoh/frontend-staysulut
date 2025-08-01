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
    <div className="space-y-6">
      <div>
        <label className="block mb-2">Harga Minimum</label>
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-md font-semibold text-muted-foreground">
            Rp{" "}
          </span>
          <Input
            type="text"
            inputMode="numeric"
            value={formatCurrency(price.min)}
            onChange={(e) => setPrice({ min: parseCurrency(e.target.value) })}
            className="p-6 rounded pl-12 md:text-sm text-gray-600"
            placeholder="Contoh: 1000000"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">Harga Maksimum</label>
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-md font-semibold text-muted-foreground">
            Rp{" "}
          </span>
          <Input
            type="text"
            inputMode="numeric"
            value={formatCurrency(price.max)}
            onChange={(e) => setPrice({ max: parseCurrency(e.target.value) })}
            className="p-6 rounded pl-12 md:text-sm text-gray-600"
            placeholder="Contoh: 2000000"
          />
        </div>
      </div>
    </div>
  );
}
