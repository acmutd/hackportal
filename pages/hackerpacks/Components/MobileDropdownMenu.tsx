import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Indigo from '@material-ui/core/colors/indigo';

type DropdownMenuProps = {
  /** Name of the menu, will append " Menu" to the end when displaying */
  name: string;

  /** Content to display in the dropdown menu */
  content: SidebarSection[];

  /** Extra formatting for menu div */
  className?: string;
};

const sectionStyle = 'bg-indigo-200 w-full pl-3 h-8 cursor-pointer relative flex items-center';
const subsectionStyle = 'bg-indigo-100 w-full pl-9 pr-3 h-8 flex items-center';

/**
 * Menu for navigating within the Hackerpack on a mobile device.
 *
 * Note that for anchor links (eg. `#Section1`) to work properly,
 * you must define a scroll-padding or extra margins in the
 * ::before CSS property due to the AppHeader
 *
 * - Tailwind v2: `before:content-[''] before:block before:h-16 before:-mt-16`
 * - Tailwind v3: `scroll-pt-16`
 */
export default function MobileDropdownMenu({ name, content, className }: DropdownMenuProps) {
  const [sectionOpen, setSectionOpen] = useState<boolean[]>(
    new Array<boolean>(content.length).fill(false),
  );

  const toggleSection = (e: React.MouseEvent, changed: number, open: boolean) => {
    e.stopPropagation();
    setSectionOpen(sectionOpen.map((val, i) => (i === changed ? open : val)));
  };

  // If there's no content, then there can be no menu
  if (content.length == 0) return null;

  return (
    <>
      <div className={`py-4 px-6 w-full flex flex-col bg-gray-50 z-[1] ${className}`}>
        <span className="font-bold">{name} Menu</span>
        <div className="flex flex-col w-full relative">
          {content.map((mainSection, i) => (
            <>
              <div key={i} className={sectionStyle}>
                <a className="flex-1 leading-loose" href={mainSection.href || '#'}>
                  {mainSection.title}
                </a>
                {sectionOpen[i] ? (
                  <ArrowDropDownIcon
                    style={{
                      cursor: 'pointer',
                      color: Indigo[300],
                      justifySelf: 'flex-end',
                      paddingLeft: 8,
                      paddingRight: 8,
                      width: 40,
                    }}
                    onClick={(e) => {
                      toggleSection(e, i, false);
                    }}
                  />
                ) : (
                  <ArrowLeftIcon
                    style={{
                      cursor: 'pointer',
                      color: Indigo[300],
                      justifySelf: 'flex-end',
                      paddingRight: 8,
                      width: 32,
                      display: mainSection.sections ? 'block' : 'none',
                    }}
                    onClick={(e) => {
                      toggleSection(e, i, true);
                    }}
                  />
                )}
              </div>
              <div
                className="transition-all duration-500 overflow-hidden"
                style={{
                  height: sectionOpen[i]
                    ? mainSection.sections
                      ? mainSection.sections.length * 32
                      : 0
                    : 0,
                }}
              >
                {mainSection.sections.map((section) => (
                  <a key={section.title} href={section.href || '#'} className={subsectionStyle}>
                    <span className="flex-1 leading-loose">{section.title}</span>
                  </a>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
