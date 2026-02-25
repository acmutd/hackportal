import { useEffect, useRef, useState } from 'react';
import FloatingDockItem from './item';

type Props = {
  items: JSX.Element[];

  settings?: {
    widthScaleFactor?: number;
    distanceMagnify?: number;
  };

  classes?: {
    wrapperDiv?: string;
    itemDiv?: string;
  };
};

export default function FloatingDockWrapper(props: Props) {
  const originalWidths = props.items.map((item) => {
    const el = item.props?.id ? document.getElementById(item.props.id) : null;
    return el?.getBoundingClientRect().width ?? 0;
  });

  const originalHeights = props.items.map((item) => {
    const el = item.props?.id ? document.getElementById(item.props.id) : null;
    return el?.getBoundingClientRect().height ?? 0;
  });

  // in pixels
  const widthScaleFactor = props.settings?.widthScaleFactor ?? 0.25;
  const distanceMagnify = props.settings?.distanceMagnify ?? 140;

  const boxRef = useRef<HTMLDivElement>(null);

  // distance of cursor from center of each item
  const [cursorFromCenters, setCursorFromCenters] = useState<number[]>(
    Array(props.items.length).fill(distanceMagnify),
  );

  useEffect(() => {
    const box = boxRef.current;

    if (!box) {
      return;
    }

    // Get children ---

    const children: (Element | null)[] = [];
    for (let i = 0; i < box.children.length; ++i) {
      children.push(box.children.item(i));
    }

    // Handle mouse move ---

    const handleMouseMove = (e: MouseEvent) => {
      if (checkWithinRange(box, e.clientX, e.clientY)) {
        const newDiffs = [...cursorFromCenters];
        for (let i = 0; i < children.length; ++i) {
          const child = children[i];
          if (child && child instanceof HTMLElement) {
            const el = child as HTMLElement;
            const rect = el.getBoundingClientRect();
            const center = rect.x + rect.width / 2;
            const diff = e.clientX - center;
            newDiffs[i] = diff;
          }
        }
        setCursorFromCenters(newDiffs);
      } else {
        setCursorFromCenters(Array(props.items.length).fill(distanceMagnify));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [boxRef, cursorFromCenters, distanceMagnify, props.items]);

  const checkWithinRange = (box: HTMLElement, mouseX: number, mouseY: number) => {
    const { x, y, width, height } = box.getBoundingClientRect();
    return mouseX >= x && mouseX <= x + width && mouseY >= y && mouseY <= y + height;
  };

  return (
    <div
      ref={boxRef}
      className={props.classes?.wrapperDiv ?? 'gap-4 flex justify-center items-center flex-wrap'}
    >
      {props.items.map((item, i) => (
        <FloatingDockItem
          key={i}
          className={props.classes?.itemDiv}
          originalHeight={originalHeights[i]}
          originalWidth={originalWidths[i]}
          widthScaleFactor={widthScaleFactor}
          distanceMagnify={distanceMagnify}
          cursorFromCenter={cursorFromCenters[i]}
        >
          {item}
        </FloatingDockItem>
      ))}
    </div>
  );
}
