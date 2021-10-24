import { ColorScheme } from '../utilities/colorScheme';

interface Props {
  name: string;
  description: string;
  cardColor: ColorScheme;
}

const MemberCard: React.FC<Props> = ({ name, description, cardColor: { light, dark } }) => {
  return (
    <div className="flex flex-row my-3">
      <div className="w-1/3" style={{ backgroundColor: light }}>
        &nbsp;
      </div>
      <div style={{ backgroundColor: dark }} className="p-5 flex flex-col gap-y-3">
        <h4 className="font-bold text-2xl">{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default MemberCard;
