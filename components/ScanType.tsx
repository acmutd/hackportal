export interface ScanTypeProps {
  /**
   * Raw JSON of the scan.
   */
  data: object;
  /**
   * Name of the scan.
   */
  name: string;
  /**
   * Click callback.
   */
  onClick: () => void;
}
export default function ScanType({ name, onClick }: ScanTypeProps) {
  return (
    <div
      className="cursor-pointer w-full bg-secondaryDark py-4 flex justify-start rounded-lg"
      onClick={onClick}
    >
      <div className="w-full text-center md:text-lg font-bold text-primary">{name}</div>
    </div>
  );
}
