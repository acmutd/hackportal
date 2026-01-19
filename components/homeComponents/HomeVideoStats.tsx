import { stats } from '../../lib/data';

export default function HomeVideoStats() {
  return (
    <>
      {/* Stats container */}
      <div
        className="stats-container"
        style={{
          position: 'absolute',
          top: 'clamp(1720px, 33vw, 650px)',
          left: 'clamp(600px, 30vw, 300px)',
          zIndex: 20,
        }}
      >
        <div className="space-y-2 md:space-y-3">
          {stats.map((stat) => (
            <div key={stat.data}>
              <p className="stats-title text-[clamp(1.6rem,3vw,2.2rem)] leading-tight">
                {stat.data}
              </p>
              {stat.object ? (
                <p className="stats-subtitle text-[#8c3d00] font-semibold text-sm md:text-base mt-1">
                  {stat.object}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
