"use client";

import { Users } from "lucide-react";

interface Props {
  selected: string[];
  onToggle: (value: string) => void;
}

const kostTypes = [
  { label: "Putra", icon: Users },
  { label: "Putri", icon: Users },
  { label: "Campur", icon: Users },
];

export default function KostTypeFilter({ selected, onToggle }: Props) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-3">
        {kostTypes.map(({ label, icon: Icon }) => {
          const isActive = selected.includes(label);
          return (
            <button
              key={label}
              onClick={() => onToggle(label)}
              type="button"
              className={`flex flex-col w-36 items-center justify-center gap-2 border rounded-xl p-3 cursor-pointer transition-colors
                ${
                  isActive
                    ? "bg-primary/10 text-primary border-primary"
                    : "bg-white text-muted-foreground hover:bg-muted"
                }`}
            >
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
