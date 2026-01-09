import { stats } from '../../lib/data';

export default function HomeVideoStats() {
  return (
    <section className="section-bg bg-3 z-0 relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-screen">
      {/* Absolutely position the stats inside the relative section */}
      <div className="absolute left-[80px] top-[220px] md:left-[140px] md:top-[260px] lg:left-[580px] lg:top-[350px]">
        <div className="space-y-3 md:space-y-8 text-center">
          {stats.map((stat) => (
            <div key={stat.data} className="mx-auto">
              <p className="stats-title text-2xl md:text-4xl lg:text-5xl">{stat.data}</p>
              {stat.object ? (
                <p className="stats-subtitle text-[#8c3d00] font-semibold text-sm md:text-base mt-1">
                  {stat.object}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
