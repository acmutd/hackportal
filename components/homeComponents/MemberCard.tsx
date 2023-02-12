/**
 *
 * Represent props used by MemberCard component
 *
 * @param name name of the member
 * @description a paragraph describing the member
 * @cardColor object containing color codes used by the component
 *
 */
interface MemberCardProps {
  name: string;
  description: string;
  cardColor: ColorScheme;
}

/**
 *
 * Component representing a member card in /about
 *
 */
export default function MemberCard({
  name,
  description,
  cardColor: { light, dark },
}: MemberCardProps) {
  return (
    <div className="flex flex-row my-3 w-full">
      <div className="w-1/3" style={{ backgroundColor: light }}>
        &nbsp;
      </div>
      <div style={{ backgroundColor: dark }} className="w-full p-5 flex flex-col gap-y-3">
        <h4 className="font-bold text-2xl">{name}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
