import { Fish, Shrimp} from "lucide-react";

const icons = [Fish, Shrimp];
const fishes = Array.from({ length: 14 });

export default function FishIconBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {fishes.map((_, i) => {
        const Icon = icons[i % icons.length];

        return (
          <span
            key={i}
            className="fish swim-down"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              opacity: Math.random() * 0.25 + 0.25,
              transform: `scale(${Math.random() * 0.4 + 1.1})`,
            }}
          >
            <Icon
              size={Math.random() * 22 + 36}
              strokeWidth={2.5}
              className="text-[#005F86]/60"
            />
          </span>
        );
      })}
    </div>
  );
}
