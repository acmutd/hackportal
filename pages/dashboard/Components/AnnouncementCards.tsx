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
        className="md:min-h-[17%] rounded-lg p-3 announcements mb-3 relative"
      >
        {props.text}
        <p className="absolute bottom-2 right-2">{props.time}</p>
      </div>
    </>
  );
}

export default AnouncementCard;
