/**
 * Challenge Cards Component
 *
 * Cards for challenge section in hack center
 */

function ChallengeCard(props) {
  // if(props.prizes !== null && props.prizes !== undefined){
  //   console.log(props.prizes);
  // }
  return (
    <div className="max-w-[22rem] min-w-[22rem] min-h-[22rem] m-4 text-center sm:p-6 p-2 border-2 rounded-lg">
      <div className="lg:min-h-[5rem] min-h-[3rem] md:text-xl text-lg font-bold mb-4">
        {props.title}
      </div>
      <div className="">
        <div className=" md:text-sm text-xs">{props.description}</div>
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
