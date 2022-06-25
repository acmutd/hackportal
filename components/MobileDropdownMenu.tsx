import React, { useState } from 'react';
import Crop75Icon from '@mui/icons-material/Crop75';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Indigo from '@material-ui/core/colors/indigo';

type DropdownMenuProps = {
  /** Name of the menu, will append " Menu" to the end when displaying */
  name: string;

  /** Content to display in the dropdown menu */
  content: MobileDropdownSection[];

  /** Extra formatting for menu div */
  className?: string;
};

const sectionStyle = 'bg-indigo-100 w-full pl-3 h-8 cursor-pointer relative flex items-center';
const activeSectionStyle = sectionStyle + ' bg-indigo-200';
const subsectionStyle = 'bg-indigo-100 w-full pl-9 pr-3 h-8 flex items-center';

/**
 * Menu for navigating within pages on a mobile device.
 * The menu has a fixed position with a height of 20 (80px)
 * and contains a "ghost" element that will occupy the same
 * amount of space at the top of the page, in the scroll container.
 *
 * Note that for anchor links (eg. `#Section1`) to work properly,
 * you must define a scroll-padding or extra margins in the
 * ::before CSS property:
 *
 * - Tailwind v2: `before:content-[''] before:block before:h-36 before:-mt-36`
 * - Tailwind v3: `scroll-pt-36`
 */
export default function MobileDropdownMenu({ name, content, className }: DropdownMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState<boolean[]>(
    new Array<boolean>(content.length).fill(false),
  );
  const [selectedSection, setSelectedSection] = useState(
    content.length > 0 ? content[0].title : '[No sections]',
  );

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const goToSection = (changed: number) => {
    setSectionOpen(sectionOpen.map((val, i) => (i === changed ? true : val)));
    setSelectedSection(content[changed].title);
    toggleMenu();
  };

  const toggleSection = (e: React.MouseEvent, changed: number, open: boolean) => {
    e.stopPropagation();
    setSectionOpen(sectionOpen.map((val, i) => (i === changed ? open : val)));
  };

  // If there's no content, then there can be no menu
  if (content.length == 0) {
    return <div>Menu has no content!</div>;
  }

  return (
    <>
      {/* ghost section to fill in for fixed menu */}
      <section
        id="ghost"
        className="flex md:hidden justify-center w-screen sticky top-0 h-20 mb-4 md:h-0 text-xs md:text-xs lg:text-sm overflow-auto"
      ></section>

      <div className={`py-4 px-6 w-full fixed flex flex-col bg-gray-50 z-10 ${className}`}>
        <span className="font-bold">{name} Menu</span>
        <div className="flex flex-col w-full relative">
          {menuOpen ? null : (
            <Crop75Icon
              style={{ position: 'absolute', right: 4, top: 3, cursor: 'pointer', zIndex: 5 }}
              onClick={toggleMenu}
            />
          )}
          {menuOpen ? (
            <>
              {content.map((mainSection, i) => (
                <>
                  <a
                    key={i}
                    href={mainSection.href || '#'}
                    className={
                      mainSection.title === selectedSection ? activeSectionStyle : sectionStyle
                    }
                    onClick={goToSection.bind(this, i)}
                  >
                    <span className="flex-1 leading-loose">{mainSection.title}</span>
                    {sectionOpen[i] ? (
                      <ArrowDropDownIcon
                        style={{
                          cursor: 'pointer',
                          color: Indigo[300],
                          justifySelf: 'flex-end',
                          paddingRight: 8,
                          width: 32,
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
                        }}
                        onClick={(e) => {
                          toggleSection(e, i, true);
                        }}
                      />
                    )}
                  </a>
                  {mainSection.sections.map((section) => (
                    <a
                      key={section.title}
                      href={section.href || '#'}
                      className={subsectionStyle}
                      style={{ display: sectionOpen[i] ? 'block' : 'none' }}
                      onClick={goToSection.bind(this, i)}
                    >
                      <span className="flex-1 leading-loose">{section.title}</span>
                    </a>
                  ))}
                </>
              ))}
            </>
          ) : (
            <div className={activeSectionStyle} onClick={toggleMenu}>
              {selectedSection}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
