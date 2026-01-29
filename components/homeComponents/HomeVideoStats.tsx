import { stats } from '../../lib/data';

export default function HomeVideoStats() {
  return (
    <section
      className="
        relative
        w-full
        h-full
        z-20
        pointer-events-none
        px-4 sm:px-6 md:px-8
      "
    >
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.data}>
            <p className="stats-title text-[clamp(1.6rem,3vw,2.2rem)] leading-tight">{stat.data}</p>
            {stat.object && (
              <p className="stats-subtitle text-[#8c3d00] font-semibold text-[clamp(12px,1.2vw,16px)] mt-1">
                {stat.object}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
