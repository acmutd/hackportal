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
      className="md:p-4 p-2 cursor-pointer m-3 bg-secondary rounded-lg text-primaryDark hover:bg-primaryDark hover:text-secondary transition duration-300 ease-in-out h-min"
      onClick={onClick}
    >
      <div className="text-center md:text-lg font-bold">{name}</div>
    </div>
  );
}
