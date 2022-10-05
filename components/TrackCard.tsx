/**
 * Track Cards Component
 *
 * Cards for tracks section in home page
 * To add a linebreak for the description, simply add \n into the string value where needed in firebase
 */

export default function TrackCard(props) {
  var description;
  if (props.description !== undefined && props.description !== null) {
    description = props.description.replaceAll('\\n', '\n');
  }
  return (
    <div className="trackCardSelected min-h-[25rem] rounded-md p-6">
      <div className="font-semibold md:text-2xl test-base">{props.track}</div>
      <p className="whitespace-pre-line my-5 md:text-base text-xs">{description}</p>
      {props.prizes !== null && props.prizes !== undefined && (
        <div className="md:text-base text-sm">
          <div className="font-semibold md:text-lg text-base">Prizes</div>
          <ul className="list-decimal list-inside md:text-base text-sm">
            {props.prizes.map((prize, idx) => (
              <li key={idx}>{prize}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
