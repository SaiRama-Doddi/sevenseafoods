const fishes = Array.from({ length: 26 });
const icons = ["🐟", "🐠", "🐡", "🦐"];
const depths = ["far", "mid", "near"] as const;

export default function GlobalFishBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {fishes.map((_, i) => {
        const depth = depths[Math.floor(Math.random() * depths.length)];
        const direction = i % 2 === 0 ? "swim-down" : "swim-up";

        return (
          <span
            key={i}
            className={`fish ${direction} ${depth}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${30 + Math.random() * 25}s`,
              animationDelay: `${Math.random() * 20}s`,
              fontSize:
                depth === "far"
                  ? `${Math.random() * 6 + 14}px`
                  : depth === "mid"
                  ? `${Math.random() * 10 + 20}px`
                  : `${Math.random() * 12 + 28}px`,
            }}
          >
            {icons[Math.floor(Math.random() * icons.length)]}
          </span>
        );
      })}
    </div>
  );
}
