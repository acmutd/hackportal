export default function HomeChallengesCard(props: { challenge: Challenge; blockType: number }) {
  return (
    <div className="h-full w-full mx-auto">
      <div className="w-4/5 md:w-full mx-auto">
        {/* Block */}
        <div className="relative w-5/6 h-[200px] mx-auto bg-[#8B5A2B] rounded-lg shadow-lg flex items-center justify-center">
          <span className="stats-title">COMING SOON</span>
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
