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

  const speakersData = props.speakers
    ? props.speakers.filter((speaker: string) => speaker.length !== 0)
    : undefined;

  var speakerString = '';
  if (speakersData !== undefined && speakersData !== null && speakersData.length !== 0) {
    if (speakersData.length == 2) {
      speakerString = `Hosted by ${speakersData[0]} & ${speakersData[1]}`;
    } else if (speakersData.length == 1) {
      speakerString = `Hosted by ${speakersData[0]}`;
    } else {
      speakerString = 'Hosted by ';
      for (var i = 0; i < speakersData.length; i++) {
        if (i === speakersData.length - 1) {
          speakerString += 'and ' + speakersData[i];
        } else {
          speakerString += speakersData[i] + ', ';
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
      <div className="scrollItem flex flex-col justify-between h-[90%] bg-[url('/assets/about-bg.jpeg')] text-complementaryDark rounded-lg lg:p-6 p-3 mb-4 lg:mr-3">
        <div className="mb-8">
          <h1 className="lg:text-4xl text-2xl font-black">{props.title}</h1>
          <h3 className="md:text-xl text-lg font-black">{speakerString}</h3>
        </div>
        {/* info section */}
        <div className="flex justify-between">
          <div className="flex items-center lg:text-xl sm:text-lg text-base">
            {<CalendarIcon style={{ fontSize: 'large', margin: '2px' }} />}
            <p>{dayString}</p>
          </div>
          <div className="flex items-center lg:text-xl sm:text-lg text-base">
            {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
            <p>
              {(startDate.getHours() + 24) % 12 || 12}:{startDate.getMinutes() < 10 ? '0' : ''}
              {startDate.getMinutes()} {startDate.getHours() < 12 ? 'AM' : 'PM'} -{' '}
              {(endDate.getHours() + 24) % 12 || 12}:{endDate.getMinutes() < 10 ? '0' : ''}
              {endDate.getMinutes()} {endDate.getHours() < 12 ? 'AM' : 'PM'}
            </p>
          </div>
          <div className="flex items-center lg:text-xl sm:text-lg text-base">
            {<PinDrop style={{ fontSize: 'large', margin: '2px' }} />}
            <p>{props.location}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotlightCard;
