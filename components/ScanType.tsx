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
      className="bg-red-300 p-4 rounded-xl cursor-pointer m-3 hover:brightness-125"
      onClick={onClick}
    >
      <div className="text-center text-lg font-bold">{name}</div>
    </div>
  );
}
