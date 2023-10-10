import {CSSProperties, useMemo, useState} from 'react';

function Toolbar({date, setDate}) {
  /// increment a date by a number of days
  const incrementDate = () =>
    setDate(new Date(date.setDate(date.getDate() + 1)));

  return (
    <div className="p-2 md:px-5 min-h-16 text-white">
       <span className="uppercase text-xl py-2 mx-3 border-b-4 border-primary">
           {date.toLocaleDateString(undefined, {weekday: "long", month: "short", day: "numeric"})}
       </span>
      <button onClick={incrementDate}>
        &lsaquo;
      </button>
    </div>
  );
}

// TODO: support start/end time
function CalendarGrid({
                        increment, tracks, events,
                      }: {
  increment: number;
  tracks: string[];
  events: ScheduleEvent[];
}) {
  const minutesInDay = 60 * 24;
  const labeledSections = useMemo(() => minutesInDay / increment, [minutesInDay, increment]);

  // create events as list of divs
  const Events = useMemo(
    () =>
      events.map((event) => {
        const start = new Date(event.startDate).getMinutes();
        const end = new Date(event.endDate).getMinutes();
        // compute row start from start time (or go to the start of the schedule if the event starts on the previous day)
        const rowStart = start < end ? start + 1 + 1 : 0;
        // compute row end from end time (or go to the end of the schedule if the event ends on the next day)
        const rowEnd = start < end ? end + 1 : -1;
        // compute column from track
        const col = tracks.indexOf(event.track) + 1 + 1;

        return (
          <div
            key={event.Event}
            style={{gridRowStart: rowStart, gridRowEnd: rowEnd, gridColumn: col} as CSSProperties}
            className="bg-blue-200 rounded-md p-2 z-10"
          >
            <div>{event.title}</div>
            {event.type ? <div>Type: {event.type}</div> : null}
            <div>Location: {event.location}</div>
          </div>
        );
      }),
    [tracks, events],
  );

  // create cells as list of divs
  const Cells = useMemo(
    () => Array.from({length: labeledSections * tracks.length}, (_, i) => {
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
            className="border hover:bg-gray-100"
          />
        );
      }),
    [increment, tracks],
  );

  // label every track with the correct header, placed above the first cell in the track
  const TrackLabels = useMemo(() => tracks.map((track, i) => (<div
    style={{
      gridRow: 1,
      gridColumn: i + 1 + 1,
    } as CSSProperties}
    className="text-center text-slate-500"
  >
    {track}
  </div>)), [tracks, increment]);

  // label every increment with the correct time
  const Labels = useMemo(
    () => Array.from({length: labeledSections}, (_, i) => {
        const time = new Date();
        time.setHours(0, i * increment, 0, 0);
        return (
          <div
            style={
              {
                gridRowStart: i * increment + increment + 1,
                gridRowEnd: i * increment + increment * 2,
                gridColumn: 1,
              } as CSSProperties
            }
            className="text-right px-1 text-slate-500"
          >
            {time.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'})}
          </div>
        );
      }),
    [labeledSections, increment],
  );

  return (
    <div>
      <div
        className="w-full overflow-x-auto grid gap-0 grid-auto-cols grid-cols-[max-content] grid-rows-[repeat(calc(60_*_24),_1.6px)]">
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

export default function Calendar(props: { events: ScheduleEvent[]; tracks: string[] }) {
  const [date, setDate] = useState(new Date()); // default to today's date
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
      <Toolbar date={date} setDate={setDate}/>
      <div>
        <div>
          <CalendarGrid increment={30} tracks={props.tracks} events={daysEvents}/>
        </div>
      </div>
    </div>
  );
}
