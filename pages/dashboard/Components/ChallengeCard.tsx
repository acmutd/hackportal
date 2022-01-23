/**
 * Challenge Cards Component
 *
 * Cards for challenge section in hack center
 * To add a linebreak for the description, simply add \n into the string value where needed in firebase
 */

function ChallengeCard(props) {
  var description;
  if (props.description !== undefined && props.description !== null) {
    description = props.description.replaceAll('\\n', '\n');
  }
  return (
    <div className="inline-block w-full mb-[1em] sm:p-6 p-2 border-2 rounded-lg">
      <div className="md:text-xl text-lg font-bold mb-4">{props.title}</div>
      <div className="">
        <div className="whitespace-pre-line md:text-sm text-xs">{description}</div>
      </div>
      {props.prizes !== null && props.prizes !== undefined && (
        <div className="md:text-base text-sm">
          <div className="mt-4 font-bold underline">Prizes</div>
          <ul className="list-decimal list-inside">
            {props.prizes.map((prize, idx) => (
              <li key={idx}>{prize}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChallengeCard;
