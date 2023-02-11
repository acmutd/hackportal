/**
 * Challenge Cards Component
 *
 * Cards for challenge section in home page
 * To add a linebreak for the description, simply add \n into the string value where needed in firebase
 */

function HomeChallengeCard(props) {
  var description;
  if (props.description !== undefined && props.description !== null) {
    description = props.description.replaceAll('\\n', '\n');
  }
  return (
    <div className="bg-purple-200 min-h-[100%] rounded-sm p-6">
      <div className="text-center font-bold md:text-2xl test-base">{props.title}</div>
      <div className="text-center md:text-xl test-base">Presented by {props.organization}</div>
      <p className="whitespace-pre-line my-3 md:text-base text-xs">{description}</p>
      {props.prizes !== null && props.prizes !== undefined && (
        <div className="md:text-base text-sm">
          <div className="underline font-medium md:text-base text-sm">Prizes</div>
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

export default HomeChallengeCard;
