"use client";

import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  isCurrent?: boolean;
  onClick: () => void;
}

const PricingCard = ({ title, price, features, isCurrent, onClick }: PricingCardProps) => {
  return (
    <div
      className={cn(
        "border p-6 rounded-lg shadow-md flex flex-col justify-between",
        isCurrent && "border-primary"
      )}
    >
      <div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-4xl font-semibold mb-4">{price}</p>
        <ul className="mb-6 space-y-2">
          {features.map((feature) => (
            <li key={feature} className="text-muted-foreground text-sm">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClick}
        className="mt-4 w-full py-2 rounded bg-primary text-white hover:bg-primary/90 transition"
      >
        {isCurrent ? "Manage" : "Subscribe"}
      </button>
    </div>
  );
};

export default PricingCard;