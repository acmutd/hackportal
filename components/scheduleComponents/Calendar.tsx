import { CSSProperties, useMemo, useState } from 'react';

const HACK_DAY_1 = new Date('Nov 4, 2023');
const HACK_DAY_2 = new Date('Nov 5, 2023');

function Toolbar({ date, setDate }) {
  return (
    <div className="p-2 md:px-5 md:pb-2 md:mx-2 mb-3 md:mb-5 min-h-16 w-max text-white text-lg md:text-2xl flex flex-row justify-start items-center">
      <div className="inline-block">
        {date === HACK_DAY_2 && (
          <button onClick={() => setDate(HACK_DAY_1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
      </div>
      <span className="inline-block uppercase border-b-4 border-primary">
        {' '}
        {date.toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })}{' '}
      </span>
      <div className="inline-block">
        {date === HACK_DAY_1 && (
          <button onClick={() => setDate(HACK_DAY_2)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={4}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

// TODO: support start/end time
function CalendarGrid({
  offset,
  increment,
  tracks,
  events,
}: {
  offset: number;
  increment: number;
  tracks: {
    track: string;
    background: string;
  }[];
  events: ScheduleEvent[];
}) {
  const minutesInDay = 60 * 24;
  const labeledSections = useMemo(() => minutesInDay / increment, [minutesInDay, increment]);

  // create events as list of divs
  const Events = useMemo(
    () =>
      events.map((event) => {
        // convert to Date (just in case; idempotent)
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        // get offset from 00:00 in minutes
        const start = startDate.getHours() * 60 + startDate.getMinutes();
        const end = endDate.getHours() * 60 + endDate.getMinutes();
        // compute row start from start time (or go to the start of the schedule if the event starts on the previous day)
        const rowStart = start < end ? increment + start + 1 + 1 : 0;
        // compute row end from end time (or go to the end of the schedule if the event ends on the next day)
        const rowEnd = start < end ? increment + end + 1 : -1;
        // compute column from track
        const col = tracks.map((track) => track.track).indexOf(event.track) + 1 + 1;

        const durationFormatter = new Intl.DateTimeFormat('default', {
          hour: 'numeric',
          minute: 'numeric',
        });
        return (
          <div
            key={event.Event}
            style={
              {
                gridRowStart: rowStart,
                gridRowEnd: rowEnd,
                gridColumn: col,
                background: tracks.find((track) => track.track === event.track).background,
              } as CSSProperties
            }
            className="rounded-md p-2 z-10"
          >
            <div className="text-2xl">{event.title}</div>
            {event.type && (
              <div className="lowercase">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 m-1 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{durationFormatter.formatRange(startDate, endDate)}</span>
              </div>
            )}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 m-1 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>
        );
      }),
    [tracks, events],
  );

  // create cells as list of divs
  const Cells = useMemo(
    () =>
      Array.from({ length: labeledSections * tracks.length }, (_, i) => {
        // compute row and column from index number of cell
        const row = Math.floor(i / tracks.length);
        const col = i % tracks.length;
        return (
          <div
            key={i}
            // provide row and column number to css
            style={
              {
                gridRowStart: row * increment + increment + 1,
                gridRowEnd: row * increment + increment * 2 + 1,
                gridColumn: col + 1 + 1,
              } as CSSProperties
            }
            className="border-t border-l"
          />
        );
      }),
    [labeledSections, increment, tracks],
  );

  // label every track with the correct header, placed above the first cell in the track
  const TrackLabels = useMemo(
    () =>
      tracks.map((track, i) => (
        <div
          key={i}
          style={
            {
              gridRowStart: 1,
              gridRowEnd: increment + 1,
              gridColumn: i + 1 + 1,
            } as CSSProperties
          }
          className="text-secondary text-2xl md:text-4xl border-l flex flex-col justify-center items-center"
        >
          {track.track}
        </div>
      )),
    [tracks, increment],
  );

  // label every increment with the correct time
  const Labels = useMemo(
    () =>
      Array.from({ length: labeledSections }, (_, i) => {
        const time = new Date();
        time.setHours(0, i * increment, 0, 0);
        return (
          <div
            style={
              {
                gridRowStart: i * increment + increment + 1,
                gridRowEnd: i * increment + increment * 2 + 1,
                gridColumn: 1,
              } as CSSProperties
            }
            className="text-xl text-right px-1 text-secondary lowercase flex flex-col justify-center items-center border-t"
          >
            {time.toLocaleTimeString('default', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </div>
        );
      }),
    [labeledSections, increment],
  );

  return (
    <div>
      <div
        className="w-full overflow-x-auto grid gap-0 grid-auto-cols grid-cols-[max-content] font-secondary"
        style={{ gridTemplateRows: `repeat(${minutesInDay + increment}, 1.6px)` } as CSSProperties}
      >
        {/* event cells */}
        {Events}
        {/* background cells */}
        {Cells}
        {/* time labels */}
        {Labels}
        {/* track labels */}
        {TrackLabels}
      </div>
    </div>
  );
}

export default function Calendar(props: {
  events: ScheduleEvent[];
  tracks: { track: string; background: string }[];
}) {
  const [date, setDate] = useState(HACK_DAY_1); // default to the first day
  // only show days that start or end on the current day
  const daysEvents = useMemo(
    () =>
      props.events.filter(
        (event) =>
          new Date(event.startDate).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) ||
          new Date(event.endDate).setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0),
      ),
    [date, props.events],
  );
  return (
    <div>
      <Toolbar date={date} setDate={setDate} />
      <div>
        <div>
          <CalendarGrid offset={0} increment={30} tracks={props.tracks} events={daysEvents} />
        </div>
      </div>
    </div>
  );
}
