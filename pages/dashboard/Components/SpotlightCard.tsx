import React, { useState, useEffect } from 'react';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PinDrop from '@material-ui/icons/PinDrop';
import ClockIcon from '@material-ui/icons/AccessTime';
import Backpack from '@material-ui/icons/LocalMall';
import firebase from 'firebase';

/**
 * HackCenter Spotlight Card Component
 *
 * Cards for the Spotlight Carousel under HackCenter page
 */

function SpotlightCard(props: any) {
  const startDate = new firebase.firestore.Timestamp(props.startDate._seconds, 0).toDate();
  const endDate = new firebase.firestore.Timestamp(props.endDate._seconds, 0).toDate();

  var speakerString = '';
  if (props.speakers !== undefined && props.speakers !== null && props.speakers.length !== 0) {
    if (props.speakers.length == 2) {
      speakerString = `Hosted by ${props.speakers[0]} & ${props.speakers[1]}`;
    } else if (props.speakers.length == 1) {
      speakerString = `Hosted by ${props.speakers[0]}`;
    } else {
      speakerString = 'Hosted by ';
      for (var i = 0; i < props.speakers.length; i++) {
        if (i === props.speakers.length - 1) {
          speakerString += 'and ' + props.speakers[i];
        } else {
          speakerString += props.speakers[i] + ', ';
        }
      }
    }
  }

  //first match extracts day abbreviation
  //second match extracts month abbreviation and the number day of the month
  var dayString =
    startDate.toString().match(/^[\w]{3}/)[0] +
    ', ' +
    startDate.toString().match(/^\w+ (\w{3} \d{1,2})/)[1];

  return (
    <>
      <div className="scrollItem flex flex-col justify-between w-full h-[10rem] events rounded-lg p-3 mb-3">
        <div>
          <h1 className="lg:text-4xl text-xl font-medium">{props.title}</h1>
          <h3 className="md:text-md text-sm">{speakerString}</h3>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center xl:text-lg lg:text-sm md:text-lg sm:text-sm text-xs">
            {<CalendarIcon style={{ fontSize: 'medium', margin: '2px' }} />}
            <p>{dayString}</p>
          </div>
          <div className="flex items-center xl:text-lg lg:text-sm md:text-lg sm:text-sm text-xs">
            {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
            <p>
              {(startDate.getHours() + 24) % 12 || 12}:{startDate.getMinutes() < 10 ? '0' : ''}
              {startDate.getMinutes()} {startDate.getHours() < 12 ? 'AM' : 'PM'} -{' '}
              {(endDate.getHours() + 24) % 12 || 12}:{endDate.getMinutes() < 10 ? '0' : ''}
              {endDate.getMinutes()} {endDate.getHours() < 12 ? 'AM' : 'PM'}
            </p>
          </div>
          <div className="flex items-center xl:text-lg lg:text-sm md:text-lg sm:text-md text-xs">
            {<PinDrop style={{ fontSize: 'medium', margin: '2px' }} />}
            <p>{props.location}</p>
          </div>
        </div>
        {/* info section */}
        {/* <div className="flex flex-col justify-around w-full min-h-1/2 rounded-lg p-3">
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
          <div className="flex justify-around">
            <div className="flex items-center lg:text-lg sm:text-md text-xs">
              {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
              <p>
                {(startDate.getHours() + 24) % 12 || 12}:{startDate.getMinutes() < 10 ? '0' : ''}
                {startDate.getMinutes()} {startDate.getHours() < 12 ? 'AM' : 'PM'} -{' '}
                {(endDate.getHours() + 24) % 12 || 12}:{endDate.getMinutes() < 10 ? '0' : ''}
                {endDate.getMinutes()} {endDate.getHours() < 12 ? 'AM' : 'PM'}
              </p>
            </div>
            <div className="flex items-center lg:text-lg sm:text-md text-xs">
              {<Backpack style={{ fontSize: 'medium', margin: '2px' }} />}
              <p>{props.page}</p>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default SpotlightCard;
