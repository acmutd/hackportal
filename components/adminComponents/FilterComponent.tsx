import React, { ForwardedRef } from 'react';

interface FilterComponentProps {
  title: string;
  checked: boolean;
  onCheck: () => void;
}

const FilterComponent = React.forwardRef(
  (props: FilterComponentProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { title, checked, onCheck } = props;

    return (
      <div className="flex items-center text-sm md:text-base px-3 py-2" ref={ref}>
        <input
          type="checkbox"
          className="mr-2 rounded-md text-primaryDark focus:ring-0 border border-primary"
          checked={checked}
          onChange={onCheck}
        />
        <h4 className="ml-2 text-primary">{title}</h4>
      </div>
    );
  },
);

FilterComponent.displayName = 'FilterComponent';

export default FilterComponent;
