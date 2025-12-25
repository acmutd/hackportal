import * as React from 'react';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

/* Calendar */
export default function HomeSchedule(props: { scheduleCard: ScheduleEvent[]; dateCard: Dates }) {
  /* Event Colors (updated to match design) */
  const eventColors = {
    All: 'text-white',
    Required: 'bg-[#D97706] text-white',
    Food: 'text-[#56E100]',
    Social: 'text-[#FF9A2E]',
    Sponsor: 'text-white',
    Workshop: 'text-[#A64D00]',
    'All-Filter': 'bg-[#6b2f00] text-white',
    'Required-Filter': 'bg-[#D97706] text-white',
    'Food-Filter': 'bg-[#56E100] text-white',
    'Social-Filter': 'bg-[#FF9A2E] text-white',
    'Sponsor-Filter': 'bg-[#6b2f00] text-white',
    'Workshop-Filter': 'bg-[#A64D00] text-white',
  };

  /* Dates Values */
  const dateValues = {
    year: props.dateCard[0].year,
    day1: props.dateCard[0].day1,
    day1Month: props.dateCard[0].day1Month,
    day2: props.dateCard[0].day2,
    day2Month: props.dateCard[0].day2Month,
    endTime: props.dateCard[0].endTime,
    startTime: props.dateCard[0].startTime,
  };

  /* Set event dates and times */
  const day1StartDateAndTime = new Date(
    dateValues['year'],
    dateValues['day1Month'],
    dateValues['day1'],
    dateValues['startTime'],
    0,
  );
  const day2StartDateAndTime = new Date(
    dateValues['year'],
    dateValues['day2Month'],
    dateValues['day2'],
    dateValues['startTime'],
    0,
  );
  const eventEndDateAndTime = new Date(
    dateValues['year'],
    dateValues['day1Month'],
    dateValues['day2'] + 1,
    dateValues['endTime'],
    0,
  );

  /* Filter Functionality */
  const [filter, setFilter] = useState('All');

  const changeFilter = (newFilter: string) => {
    if (newFilter === filter) {
      setFilter('All');
    } else {
      setFilter(newFilter);
    }
  };

  /* Event Component */
  const Event = ({ data, index, arrayLength }) => {
    const startDate = new Date(data.startDate);
    const formattedTime = startDate
      .toLocaleString([], { hour: 'numeric', minute: 'numeric' })
      .replace(' ', '')
      .replace('AM', 'am')
      .replace('PM', 'pm');

    const showEvent = filter === 'All' || filter === data.type;
    const showFilteredEvents = filter !== 'All';

    const isLastEvent = index === arrayLength - 1;
    const hasEvenIndex = index % 2 === 0;

    return (
      showEvent && (
        <>
          <div
            className={`${
              !showFilteredEvents
                ? `${!hasEvenIndex && filter === 'All' ? 'bg-[#F2F3FF]' : 'bg-white'} 
                             ${
                               !isLastEvent && filter === 'All'
                                 ? 'p-4 border-b border-[#05149C]'
                                 : 'rounded-b-xl p-4'
                             }`
                : 'p-4 border-b border-[#05149C]'
            }
                          `}
          >
            <div className="flex justify-between pb-1">
              <div className="text-md font-bold font-dmSans">{formattedTime}</div>
              <div className="text-md font-bold font-dmSans">{data.title}</div>
            </div>
            <div className="flex justify-between">
              <div
                className={`bg-white text-xs rounded-xl py-1 px-2 border-2 font-dmSans ${
                  eventColors[data.type]
                }`}
              >
                {data.type}
              </div>
              <div className="text-gray-600 flex items-center font-dmSans">
                <LocationOnIcon style={{ fontSize: 'large', marginRight: '2px' }} />
                {data.location}
              </div>
            </div>
          </div>
        </>
      )
    );
  };

  /* Filter Daily Events */
  const getDailyEvents = (startTime, endTime) => {
    return props.scheduleCard
      .sort((a, b) => {
        return +new Date(a.startDate) - +new Date(b.startDate);
      })
      .filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= startTime && eventDate <= endTime;
      })
      .map((event, index, array) => (
        <Event data={event} key={event.title + index} index={index} arrayLength={array.length} />
      ));
  };

  const day1Events = getDailyEvents(day1StartDateAndTime, day2StartDateAndTime);
  const day2Events = getDailyEvents(day2StartDateAndTime, eventEndDateAndTime);

  return (
    <div
      id="schedule-section"
      className="bg-7 schedule-alfa min-h-[90vh] md:min-h-[100vh] lg:min-h-[120vh] py-20 md:py-32 mb-24"
    >
      <div className="text-center text-5xl font-bold p-4">What to Expect?</div>

      {/* Filter */}
      <div className="md:flex justify-center items-center mx-8">
        <div className="bg-[#8d572f] rounded-3xl px-8 py-3 my-4 inline-block shadow-lg">
          <div className="text-center py-1 text-xl font-bold text-[#3a1e0f]">Filters</div>
          <div className="flex flex-wrap justify-center mb-2">
            <div
              onClick={() => changeFilter('All')}
              className={`text-sm cursor-pointer mx-1 px-4 h-8 py-1 rounded-full mb-1 transition-all duration-150 ${
                filter === 'All' ? eventColors['All-Filter'] : eventColors['All']
              }`}
            >
              All
            </div>

            <div
              onClick={() => changeFilter('Required')}
              className={`text-sm cursor-pointer mx-1 px-4 h-8 py-1 rounded-full mb-1 transition-all duration-150 ${
                filter === 'Required' ? eventColors['Required-Filter'] : eventColors['Required']
              }`}
            >
              Required
            </div>

            <div
              onClick={() => changeFilter('Sponsor')}
              className={`text-sm cursor-pointer mx-1 px-4 h-8 py-1 rounded-full mb-1 transition-all duration-150 ${
                filter === 'Sponsor' ? eventColors['Sponsor-Filter'] : eventColors['Sponsor']
              }`}
            >
              Sponsor
            </div>

            <div
              onClick={() => changeFilter('Food')}
              className={`text-sm cursor-pointer mx-1 px-4 h-8 py-1 rounded-full mb-1 transition-all duration-150 ${
                filter === 'Food' ? eventColors['Food-Filter'] : eventColors['Food']
              }`}
            >
              Food
            </div>

            <div
              onClick={() => changeFilter('Workshop')}
              className={`text-sm cursor-pointer mx-1 px-4 h-8 py-1 rounded-full mb-1 transition-all duration-150 ${
                filter === 'Workshop' ? eventColors['Workshop-Filter'] : eventColors['Workshop']
              }`}
            >
              Workshop
            </div>

            <div
              onClick={() => changeFilter('Social')}
              className={`text-sm cursor-pointer mx-1 px-4 h-8 py-1 rounded-full mb-1 transition-all duration-150 ${
                filter === 'Social' ? eventColors['Social-Filter'] : eventColors['Social']
              }`}
            >
              Social
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="md:flex p-1 overflow-y-auto overflow-x-hidden mx-auto lg:w-[80%] w-full h-full">
        <div className="w-full lg:w-1/2 px-4 md:px-0">
          <div className="text-3xl font-black py-6 text-[#5C2E12]">Day 1: Saturday</div>
          <div className="bg-white mb-8 mx-2 p-2 border-2 rounded-2xl border-[#05149C] border-opacity-20">
            {day1Events}
          </div>
        </div>

        <div className="w-full lg:w-1/2 md:ml-6 px-4 md:px-0">
          <div className="text-3xl font-black py-6 text-[#5C2E12]">Day 2: Sunday</div>
          <div className="bg-white mb-8 mx-2 p-2 border-2 rounded-2xl border-[#05149C] border-opacity-20">
            {day2Events}
          </div>
        </div>
      </div>
    </div>
  );
}
