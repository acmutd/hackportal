import React, { useState, useEffect } from 'react';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PinDrop from '@material-ui/icons/PinDrop';
import ClockIcon from '@material-ui/icons/AccessTime';
import Backpack from '@material-ui/icons/LocalMall';

/**
 * HackCenter Spotlight Card Component
 *
 * Cards for the Spotlight Carousel under HackCenter page
 */

function SpotlightCard(props: any) {
  const [day, getDayString] = useState('');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    getDayString(days[props.dateTime.getDay()]);
  });

  var speakerString = '';
  if (props.speakers !== undefined && props.speakers !== null && props.speakers.length !== 0) {
    if (props.speakers.length == 1) {
      speakerString = `Hosted by ${props.speakers[0]}`;
    } else if (props.speakers.length == 2) {
      speakerString = `Hosted by ${props.speakers[0]} & ${props.speakers[1]}`;
    } else if (props.speakers.length == 3) {
      speakerString = `Hosted by ${props.speakers[0]}, ${props.speakers[1]}, and ${props.speakers[2]}`;
    } else {
      speakerString = `Hosted by: `;
      for (const speaker of props.speakers) {
        speakerString += speaker + ', ';
      }
      speakerString = speakerString.substring(0, speakerString.length - 2);
    }
  }

  var dayString = '';
  if (day !== undefined && props.date !== undefined) {
    dayString = day.substring(0, 3) + ', ' + props.date.substring(0, props.date.length - 6);
  }

  return (
    <>
      <div className="scrollItem flex flex-col justify-between min-w-3/4 h-[90%] bg-aqua rounded-lg p-3 my-4 mx-12">
        <h1 className="lg:text-4xl text-xl font-black">{props.title}</h1>
        <h3 className="md:text-md text-sm font-black">{speakerString}</h3>
        {/* info section */}
        <div className="flex flex-col justify-around w-full min-h-1/2 rounded-lg bg-darkAqua p-3">
          {/* top row info */}
          <div className="flex justify-around">
            <div className="flex items-center lg:text-lg sm:text-md text-xs">
              {<CalendarIcon style={{ fontSize: 'medium', margin: '2px' }} />}
              <p>{dayString}</p>
            </div>
            <div className="flex items-center lg:text-lg sm:text-md text-xs">
              {<PinDrop style={{ fontSize: 'medium', margin: '2px' }} />}
              <p>{props.location}</p>
            </div>
          </div>
          {/* botton row info */}
          <div className="flex justify-around">
            <div className="flex items-center lg:text-lg sm:text-md text-xs">
              {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
              <p>
                {props.startTime} - {props.endTime}
              </p>
            </div>
            <div className="flex items-center lg:text-lg sm:text-md text-xs">
              {<Backpack style={{ fontSize: 'medium', margin: '2px' }} />}
              <p>{props.page}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotlightCard;
