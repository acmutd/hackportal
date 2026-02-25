import Image from 'next/image';
import { PropsWithChildren } from 'react';

type InsetValues = {
  top: string;
  right: string;
  bottom: string;
  left: string;
};

type SignSectionProps = PropsWithChildren<{
  src: string;
  alt: string;
  inset?: InsetValues;
  align?: 'center' | 'right';
}>;

const defaultInset: InsetValues = {
  top: '18%',
  right: '12%',
  bottom: '18%',
  left: '12%',
};

export default function SignSection({
  src,
  alt,
  inset = defaultInset,
  align = 'center',
  children,
}: SignSectionProps) {
  const alignClasses =
    align === 'right'
      ? 'place-items-center md:place-items-end text-center md:text-right'
      : 'place-items-center text-center';

  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '1920 / 990' }}>
        <Image src={src} alt={alt} fill sizes="100vw" className="object-contain" />
        <div
          className={`absolute z-10 grid ${alignClasses}`}
          style={{
            top: inset.top,
            right: inset.right,
            bottom: inset.bottom,
            left: inset.left,
          }}
        >
          <div className="w-full h-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
