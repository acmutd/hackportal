import { stats } from '../../lib/data';

export default function HomeVideoStats() {
  return (
    <section className="section-bg bg-3 z-0 relative min-h-[70vh] md:min-h-[80vh] lg:min-h-[720px] py-[5rem] md:py-[7rem] mb-16">
      <div className="flex flex-col justify-center items-center">
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
