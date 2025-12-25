export default function HomeChallengesCard(props: { challenge: Challenge; blockType: number }) {
  const borderConfiguration = ['rounded-tr-[100px]', 'rounded-br-[100px]', 'rounded-tl-[100px]'];
  return (
    <div className="h-full w-full mx-auto">
      <div className="w-4/5 md:w-full mx-auto">
        {/* Block */}
        <div
          className={`bg-[#C1C8FF] ${borderConfiguration[props.blockType]} w-5/6 h-[200px] mx-auto`}
        >
          &nbsp;
        </div>
        <div className="w-5/6 mx-auto">
          {/* Challenge Name */}
          <h1 className="font-nunito text-2xl font-bold mt-4">
            {props.challenge.title.toUpperCase()}
          </h1>
          {/* Company Name */}
          <h1 className="font-nunito text-xl text-[#ffffff] font-bold my-4">
            {props.challenge.organization}
          </h1>
          {/* Description */}
          <div className="mb-8 max-w-fit">
            <p className="text-md line-clamp-5 text-balance">{props.challenge.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
