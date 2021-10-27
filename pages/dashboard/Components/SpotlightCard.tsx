import React from 'react';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PinDrop from '@material-ui/icons/PinDrop';
import ClockIcon from '@material-ui/icons/AccessTime';
import Backpack from '@material-ui/icons/LocalMall';

/**
 * HackCenter Spotlight Card Component
 *
 * Cards for the Spotlight Carousel under HackCenter page
 */

function SpotlightCard(props) {
  var speakerString = '';
  if (props.speakers !== undefined && props.speakers !== null && props.speakers.length !== 0) {
    if (props.speakers.length == 1) {
      speakerString = `Hosted by ${props.speakers[0]}`;
    } else if (props.speakers.length == 2) {
      speakerString = `Hosted by ${props.speakers[0]} & ${props.speakers[1]}`;
    } else if (props.speakers.length == 3) {
      speakerString = `Hosted by ${props.speakers[0]}, ${props.speakers[1]}, and ${props.speakers[2]}`;
    }
  }

  return (
    <>
      <div className="carousel__item">
        <div className="w-full h-full bg-lightBackground flex justify-center pt-2">
          <div className="w-3/4 h-9/10 bg-aqua rounded-lg p-3 flex flex-col justify-between">
            <h1 className="lg:text-4xl text-xl font-black">{props.title}</h1>
            <h3 className="md:text-md text-sm font-black">{speakerString}</h3>
            {/* info section */}
            <div className="rounded-lg bg-darkAqua w-full min-h-1/2 p-3 flex flex-col justify-around">
              {/* top row info */}
              <div className="flex justify-around">
                <div className="lg:text-lg sm:text-md text-xs flex items-center">
                  {<CalendarIcon style={{ fontSize: 'medium', margin: '2px' }} />}
                  <p>{props.date}</p>
                </div>
                <div className="lg:text-lg sm:text-md text-xs flex items-center">
                  {<PinDrop style={{ fontSize: 'medium', margin: '2px' }} />}
                  <p>{props.location}</p>
                </div>
              </div>
              {/* botton row info */}
              <div className="flex justify-around">
                <div className="lg:text-lg sm:text-md text-xs flex items-center">
                  {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
                  <p>{props.time}</p>
                </div>
                <div className="lg:text-lg sm:text-md text-xs flex items-center">
                  {<Backpack style={{ fontSize: 'medium', margin: '2px' }} />}
                  <p>{props.page}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotlightCard;
