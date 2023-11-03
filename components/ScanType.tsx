export interface ScanTypeProps {
  /**
   * Raw JSON of the scan.
   */
  data: any;
  /**
   * Name of the scan.
   */
  name: string;
  /**
   * Click callback.
   */
  onClick: () => void;
}
export default function ScanType({ name, onClick, data }: ScanTypeProps) {
  return (
    <div
      className="cursor-pointer w-full bg-secondaryDark py-4 flex justify-start rounded-lg"
      onClick={onClick}
    >
      <div className="w-full text-center md:text-lg font-bold text-primary">
        {name} {data.netPoints !== 0 ? `(${data.netPoints})` : ''}
      </div>
    </div>
  );
}
