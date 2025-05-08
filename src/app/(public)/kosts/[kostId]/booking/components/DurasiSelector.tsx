"use client";

export default function DurasiSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        type="button"
        onClick={handleDecrease}
        className="px-3 py-2 border rounded-full text-xl"
      >
        -
      </button>
      <span className="text-lg font-medium">{value} Bulan</span>
      <button
        type="button"
        onClick={handleIncrease}
        className="px-3 py-2 border rounded-full text-xl"
      >
        +
      </button>
    </div>
  );
}
