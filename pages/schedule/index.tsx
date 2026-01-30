import * as React from 'react';
import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

/* Calendar */
export default function Calendar() {
  const [scheduleCard, setScheduleCard] = useState([]);
  const [filter, setFilter] = useState('All');

  /* Fetch Data */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const scheduleData = await fetch(
          `${window.location.protocol}//${window.location.host}/api/schedule`,
        ).then((res) => res.json());
        setScheduleCard(scheduleData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  if (scheduleCard.length === 0) {
    return <div>Fetching Data</div>;
  }

  /* Event Colors */
  const eventColors = {
    All: 'border-gray-500 text-gray-500',
    Required: 'border-[#FC012E] text-[#FC012E]',
    Food: 'border-[#56E100] text-[#56E100]',
    Social: 'border-[#FFB900] text-[#FFB900]',
    Sponsor: 'border-[#008CF1] text-[#008CF1]',
    Workshop: 'border-[#5200FF] text-[#5200FF]',
    'All-Filter': 'border-gray-500 bg-gray-500 text-white',
    'Required-Filter': 'border-[#FC012E] bg-[#FC012E] text-white',
    'Food-Filter': 'border-[#56E100] bg-[#56E100] text-white',
    'Social-Filter': 'border-[#FFB900] bg-[#FFB900] text-white',
    'Sponsor-Filter': 'border-[#008CF1] bg-[#008CF1] text-white',
    'Workshop-Filter': 'border-[#5200FF] bg-[#5200FF] text-white',
  };

  /* Filter Functionality */

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

  const sortedEvents = [...scheduleCard].sort((a, b) => {
    return +new Date(a.startDate) - +new Date(b.startDate);
  });

  return (
    <div className="bg-[#F2F3FF]">
      <div className="text-center text-5xl font-bold text-[#05149C] p-4 font-fredoka">
        What to Expect?
      </div>

      {/* Filter */}
      <div className="md:flex justify-center items-center mx-8">
        <div className="bg-white border-2 border-blue-900 rounded-3xl px-8 my-4 border-opacity-40">
          <div className="text-center py-1 text-xl font-bold text-[#05149C] font-poppins">
            Filters
          </div>
          <div className="flex flex-wrap justify-center mb-2 font-poppins">
            <div
              onClick={() => changeFilter('All')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl border-gray-500 mb-1
              ${filter === 'All' ? eventColors['All-Filter'] : eventColors['All']}`}
            >
              All
            </div>

            <div
              onClick={() => changeFilter('Required')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Required' ? eventColors['Required-Filter'] : eventColors['Required']}`}
            >
              Required
            </div>

            <div
              onClick={() => changeFilter('Sponsor')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Sponsor' ? eventColors['Sponsor-Filter'] : eventColors['Sponsor']}`}
            >
              Sponsor
            </div>

            <div
              onClick={() => changeFilter('Food')}
              className={`text-sm cursor-pointer	mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Food' ? eventColors['Food-Filter'] : eventColors['Food']}`}
            >
              Food
            </div>

            <div
              onClick={() => changeFilter('Workshop')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Workshop' ? eventColors['Workshop-Filter'] : eventColors['Workshop']}`}
            >
              Workshop
            </div>

            <div
              onClick={() => changeFilter('Social')}
              className={`text-sm cursor-pointer mx-1 px-2 h-8 py-1 border-2 rounded-xl
              ${filter === 'Social' ? eventColors['Social-Filter'] : eventColors['Social']}`}
            >
              Social
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex justify-center px-4">
        <div className="w-full max-w-4xl">
          <div className="bg-white mb-8 p-2 border-2 rounded-2xl border-[#05149C] border-opacity-20 max-w-3xl mx-auto">
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
