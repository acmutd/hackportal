import * as React from 'react';
import { useState, useEffect } from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'clsx';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import Calendar from '../../components/scheduleComponents/Calendar';
import { CalendarIcon, ClockIcon, PencilAltIcon } from '@heroicons/react/outline';

const trackBackground = (track: string) => {
  // FIXME: these need to match exactly. is this how events will be created>
  if (track === 'General') return 'linear-gradient(180deg, #F6D498 0%, #D3A85B 100%)';
  if (track === 'Club' || track == 'Company')
    return 'linear-gradient(180deg, #FFF1E4 0%, #FFB1A0 100%)';
  if (track === 'Social') return 'linear-gradient(180deg, #EEE 0%, #B9B9B9 100%)';
  else return 'linear-gradient(180deg, #F6D498 0%, #D3A85B 100%)';
};

export default function SchedulePage(props: { scheduleCard: ScheduleEvent[] }) {
  // Hooks
  const [eventData, setEventData] = useState({
    title: '',
    speakers: '',
    date: '',
    time: '',
    page: '',
    description: '',
    location: '',
    track: '',
    background: trackBackground(''),
  });
  const [eventDescription, setEventDescription] = useState(null);

  const changeEventData = (data: ScheduleEvent) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    // format date of event
    const dateFormatter = new Intl.DateTimeFormat('default', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const dayString = dateFormatter.format(startDate);

    const speakersData = data.speakers?.filter((speaker) => speaker.length !== 0);

    // format list of speakers of event, leaving blank if no speakers
    const speakerFormatter = new Intl.ListFormat('default', { style: 'long', type: 'conjunction' });
    const speakerString =
      speakersData?.length || 0 > 0 ? `Hosted by ${speakerFormatter.format(speakersData)}` : '';
    // format time range of event
    const timeFormatter = new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const timeString = timeFormatter.formatRange(startDate, endDate);

    //setting new event data based on event clicked
    setEventData({
      title: data.title,
      speakers: speakerString,
      date: dayString,
      time: timeString,
      page: data.page,
      description: data.description,
      location: data.location,
      track: data.track,
      background: trackBackground(data.track),
    });
  };

  useEffect(() => {
    // Split event description by newlines
    const descSplit = eventData.description.split('\n');
    setEventDescription(
      descSplit.map((d, i) => (
        <p key={i} className="mb-2">
          {d}
        </p>
      )),
    );
  }, [eventData]);

  const grouping = [
    {
      resourceName: 'track',
    },
  ];

  const scheduleEvents = props.scheduleCard;
  const tracks = Array.from(new Set(scheduleEvents.map((event) => event.track))).map((track) => ({
    track: track,
    background: trackBackground(track),
  }));
  // sort tracks to bring general to the front. other than that, we don't care.
  tracks.sort((x, y) => {
    return x.track === 'General' ? -1 : y.track === 'General' ? 1 : 0;
  });

  return (
    <>
      <div className="flex flex-wrap lg:justify-between px-6 h-[75vh]">
        {/* Calendar */}
        <div className="overflow-y-auto overflow-x-hidden lg:w-[62%] w-full h-full">
          <Calendar events={scheduleEvents} tracks={tracks} onEventClick={changeEventData} />
        </div>

        {/* Event info card */}
        <div
          className="overflow-y-auto flex flex-col justify-between lg:w-[36%] w-full h-full lg:my-0 my-2 border-2 border-black rounded-md bg-white p-4 font-secondary"
          style={{ background: eventData.background }}
        >
          <section>
            {eventData.title === '' ? (
              <div className="text-2xl">Click on an event for more info</div>
            ) : (
              <div />
            )}
            <h1 className="md:text-4xl text-2xl font-bold">{eventData.title}</h1>
            <div className="md:text-lg text-sm mb-4">{eventData.speakers}</div>

            {/* Shows card info if user has clicked on an event */}
            <div className={eventData.title === '' ? 'hidden' : 'inline'}>
              <div className="grid grid-cols-2 gap-y-2 md:my-8 my-6 md:text-lg text-sm">
                <div className="">
                  <p className="flex items-center font-semibold">
                    <CalendarIcon className="w-6 h-6" />
                    Date
                  </p>
                  <p>{eventData.date}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {/* FIXME: why is this not in the heroicons react package */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
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
                    Location
                  </p>
                  <p>{eventData.location}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    <ClockIcon className="w-6 h-6" />
                    Time
                  </p>
                  <p>{eventData.time}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold w-6 h-6">
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="fluent:backpack-28-regular">
                        <path
                          id="Vector"
                          d="M6.06689 8.27091C6.06689 7.9832 6.12356 7.69832 6.23366 7.43251C6.34376 7.16671 6.50514 6.92519 6.70857 6.72176C7.11943 6.3109 7.67668 6.08008 8.25772 6.08008H10.6171C10.9048 6.08008 11.1897 6.13675 11.4555 6.24685C11.7213 6.35694 11.9628 6.51832 12.1662 6.72176C12.3697 6.92519 12.531 7.16671 12.6411 7.43251C12.7512 7.69832 12.8079 7.9832 12.8079 8.27091C12.8079 8.58378 12.6836 8.88383 12.4624 9.10506C12.2411 9.32629 11.9411 9.45058 11.6282 9.45058H7.24657C6.9337 9.45058 6.63365 9.32629 6.41241 9.10506C6.19118 8.88383 6.06689 8.58378 6.06689 8.27091ZM8.25772 7.09123C7.94485 7.09123 7.6448 7.21552 7.42356 7.43675C7.20233 7.65798 7.07805 7.95804 7.07805 8.27091C7.07805 8.36393 7.15354 8.43943 7.24657 8.43943H11.6282C11.6729 8.43943 11.7158 8.42168 11.7474 8.39007C11.779 8.35847 11.7967 8.3156 11.7967 8.27091C11.7967 7.95804 11.6725 7.65798 11.4512 7.43675C11.23 7.21552 10.9299 7.09123 10.6171 7.09123H8.25772Z"
                          fill="#4C4950"
                        />
                        <path
                          id="Vector_2"
                          d="M9.43729 1.36133C8.63705 1.36135 7.8629 1.64604 7.25331 2.16449C6.64371 2.68294 6.23843 3.40134 6.10993 4.1912C5.07618 4.7576 4.21381 5.59165 3.61322 6.60592C3.01262 7.6202 2.69591 8.77735 2.69629 9.95611V15.0119C2.69629 15.6823 2.96262 16.3253 3.43669 16.7993C3.91076 17.2734 4.55373 17.5397 5.22417 17.5397H13.6504C14.3209 17.5397 14.9638 17.2734 15.4379 16.7993C15.912 16.3253 16.1783 15.6823 16.1783 15.0119V9.95611C16.1787 8.77735 15.862 7.6202 15.2614 6.60592C14.6608 5.59165 13.7984 4.7576 12.7647 4.1912C12.6362 3.40134 12.2309 2.68294 11.6213 2.16449C11.0117 1.64604 10.2375 1.36135 9.43729 1.36133ZM9.26877 3.38363C8.59265 3.38363 7.94079 3.48542 7.32736 3.67484C7.52338 3.28311 7.82458 2.95369 8.19723 2.72346C8.56988 2.49323 8.99926 2.37129 9.43729 2.37129C9.87533 2.37129 10.3047 2.49323 10.6774 2.72346C11.05 2.95369 11.3512 3.28311 11.5472 3.67484C10.9183 3.48111 10.2639 3.38294 9.60582 3.38363H9.26877ZM9.26877 4.39478H9.60582C10.3361 4.39478 11.0593 4.53863 11.734 4.81811C12.4088 5.09759 13.0219 5.50724 13.5383 6.02366C14.0547 6.54007 14.4643 7.15315 14.7438 7.82788C15.0233 8.50261 15.1671 9.22578 15.1671 9.95611V10.7987H3.70744V9.95611C3.70744 8.48115 4.29336 7.06661 5.33632 6.02366C6.37927 4.9807 7.79381 4.39478 9.26877 4.39478ZM6.06679 11.8099V12.9896C6.06679 13.1236 6.12006 13.2522 6.21487 13.3471C6.30969 13.4419 6.43828 13.4951 6.57237 13.4951C6.70645 13.4951 6.83505 13.4419 6.92986 13.3471C7.02468 13.2522 7.07794 13.1236 7.07794 12.9896V11.8099H15.1671V15.0119C15.1671 15.4141 15.0073 15.7999 14.7229 16.0843C14.4385 16.3688 14.0527 16.5286 13.6504 16.5286H5.22417C4.82191 16.5286 4.43612 16.3688 4.15168 16.0843C3.86724 15.7999 3.70744 15.4141 3.70744 15.0119V11.8099H6.06679Z"
                          fill="#4C4950"
                        />
                      </g>
                    </svg>
                    Page
                  </p>
                  <p>{eventData.page}</p>
                </div>
              </div>

              <div className="lg:text-base text-sm">
                <p className="flex items-center font-semibold">
                  <PencilAltIcon className="w-6 h-6" />
                  Description
                </p>
                <p>{eventDescription}</p>
              </div>
            </div>
          </section>

          <div className="text-right">*All events are given in CST</div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: scheduleData } = await RequestHelper.get<ScheduleEvent[]>(
    `${protocol}://${context.req.headers.host}/api/schedule`,
    {},
  );
  return {
    props: {
      scheduleCard: scheduleData,
    },
  };
};
