import * as React from 'react';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

/* Calendar */
export default function HomeSchedule(props: { scheduleCard: ScheduleEvent[] }) {
  /* Event Colors (updated to match design) */
  const eventColors = {
    All: 'text-white',
    Required: 'bg-[#D97706] text-white',
    Food: 'text-[#7FFF00]',
    Social: 'text-[#FFB84D]',
    Sponsor: 'text-white',
    Workshop: 'text-[#D2691E]',
    'All-Filter': 'bg-[#6b2f00] text-white',
    'Required-Filter': 'bg-[#D97706] text-white',
    'Food-Filter': 'bg-[#7FFF00] text-black',
    'Social-Filter': 'bg-[#FFB84D] text-black',
    'Sponsor-Filter': 'bg-[#6b2f00] text-white',
    'Workshop-Filter': 'bg-[#D2691E] text-white',
  };

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
    const endDate = new Date(data.endDate);
    const formattedTime = startDate
      .toLocaleString([], { hour: 'numeric', minute: 'numeric' })
      .replace(' ', '')
      .replace('AM', 'am')
      .replace('PM', 'pm');
    const formattedEndTime = endDate
      .toLocaleString([], { hour: 'numeric', minute: 'numeric' })
      .replace(' ', '')
      .replace('AM', 'am')
      .replace('PM', 'pm');
    const eventTypes = Array.isArray(data.type)
      ? data.type.filter(Boolean)
      : typeof data.type === 'string' && data.type.includes(',')
      ? data.type
          .split(',')
          .map((value) => value.trim())
          .filter(Boolean)
      : data.type
      ? [data.type]
      : ['All'];

    const showEvent = filter === 'All' || eventTypes.includes(filter);
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
              <div className="text-md font-bold font-dmSans">
                {formattedTime} - {formattedEndTime}
              </div>
              <div className="text-md font-bold font-dmSans">{data.title}</div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2 flex-wrap">
                {eventTypes.map((eventType) => (
                  <div
                    key={`${data.title}-${eventType}`}
                    className={`bg-white text-xs rounded-xl py-1 px-2 border-2 font-dmSans ${
                      eventColors[eventType] || eventColors.All
                    }`}
                  >
                    {eventType}
                  </div>
                ))}
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

  const sortedEvents = [...props.scheduleCard].sort((a, b) => {
    return +new Date(a.startDate) - +new Date(b.startDate);
  });

  return (
    <div
      id="schedule-section"
      className="schedule-alfa py-16 md:py-24"
      style={{ paddingTop: '15rem' }}
    >
      <div
        className="text-center p-4 white-text"
        style={{
          fontFamily: "'Alfa Slab One', cursive",
          fontWeight: 250,
          fontSize: 'clamp(28px, 4vw, 68px)',
        }}
      >
        What to Expect?
      </div>

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
        <div className="w-full px-4 md:px-0">
          <div className="bg-white mb-8 mx-auto p-2 border-2 rounded-2xl border-[#05149C] border-opacity-20 max-w-3xl">
            {sortedEvents.map((event, index, array) => (
              <Event
                data={event}
                key={event.title + index}
                index={index}
                arrayLength={array.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
