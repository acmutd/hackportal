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
      className="bg-red-300 md:p-4 p-2 rounded-xl cursor-pointer m-3 hover:brightness-[1.15] hover:border-black border-transparent border-2 box-border md:whitespace-normal whitespace-nowrap"
      onClick={onClick}
    >
      <div className="text-center md:text-lg font-bold">{name}</div>
    </div>
  );
}
