import { howItWorks } from "@/lib/data";
import React from "react";
import { useId } from "react";

export function FeaturesGradient() {
  return (
    <div className="py-16 lg:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {howItWorks.map((feature, index) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8 rounded-3xl overflow-hidden border border-neutral-200/50 dark:border-neutral-700/50 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group hover:scale-[1.02]"
          >
            <Grid size={20} />
            
            {/* Animated gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            {/* Step number indicator */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
              {String(index + 1).padStart(2, '0')}
            </div>
            
            <div className="relative z-20">
              <p className="text-xl font-bold text-neutral-800 dark:text-white mb-4 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 text-base font-normal leading-relaxed group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
            
            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-700 ease-out" />
          </div>
        ))}
      </div>
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] from-primary/20 via-primary/10 to-primary/20 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay fill-primary/20 stroke-primary/20 dark:fill-primary/10 dark:stroke-primary/10 group-hover:fill-primary/30 group-hover:stroke-primary/30 transition-all duration-500"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
