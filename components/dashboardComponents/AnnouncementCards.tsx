import React from 'react';

/**
 * Announcement Cards Component
 *
 * Cards for announcements section in hack center
 */

function AnouncementCard(props) {
  return (
    <>
      <div
        id="announcement-content"
        className="md:min-h-1/4 rounded-lg p-3 bg-[#a8947c] text-[#FFFCF9] md:mr-4"
      >
        {props.text}
      </div>
      <p className="text-right text-secondary md:mr-4">{props.time}</p>
    </>
  );
}

export default AnouncementCard;
