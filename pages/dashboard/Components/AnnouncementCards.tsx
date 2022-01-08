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
        className="bg-000 min-h-[1/4] rounded-lg p-3 text-purple border-2 border-purple"
      >
        {props.text}
      </div>
      <p className="text-right">{props.time}</p>
    </>
  );
}

export default AnouncementCard;
