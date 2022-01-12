/**
 * Challenge Cards Component
 *
 * Cards for challenge section in hack center
 */

function ChallengeCard(props) {
  return (
    <div className="border-2 rounded-lg max-w-[22rem] min-w-[22rem] min-h-[22rem] m-4 text-center sm:p-6 p-2">
      <div className="md:text-xl text-lg font-bold mb-4 lg:min-h-[5rem] min-h-[3rem]">
        {props.title}
      </div>
      <div className="">
        <div className=" md:text-base text-sm">{props.description}</div>
      </div>
    </div>
  );
}

export default ChallengeCard;
