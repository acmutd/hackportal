import Image from 'next/image';

/**
 * Keynote Speaker card for landing page.
 */
export default function KeynoteSpeaker(props) {
  return (
    <div className="flex w-[28rem] h-[9rem] md:mr-20 mr-16 my-4">
      <div
        style={{ backgroundColor: props.cardColor.light, overflow: 'hidden' }}
        className="w-1/4 rounded-l-md"
      >
        {props.imageLink !== undefined && (
          <Image
            src={props.imageLink}
            // make sure width and height matches width and height of parent div
            width={112}
            height={144}
            objectFit="cover"
            alt=""
          />
        )}
      </div>
      <div style={{ backgroundColor: props.cardColor.dark }} className="w-3/4 p-2 rounded-r-md">
        <h1 className="text-lg font-bold"> {props.name}</h1>
        <div className="text-xs">{props.description}</div>
      </div>
    </div>
  );
}
