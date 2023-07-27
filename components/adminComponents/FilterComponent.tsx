import Checkbox from '@material-ui/core/Checkbox';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

interface FilterComponentProps {
  title: string;
  checked: boolean;
  onCheck: () => void;
}

export default function FilterComponent({ title, checked, onCheck }: FilterComponentProps) {
  const CustomCheckbox = withStyles({
    root: {
      color: blue[400],
      '&$checked': {
        color: blue[600],
      },
    },
    checked: {},
  })((props) => (
    <Checkbox
      checked={checked}
      onChange={() => {
        onCheck();
      }}
      color="default"
      {...props}
    />
  ));

  return (
    <div className="flex items-center text-sm md:text-base">
      <CustomCheckbox />
      <h4>{title}</h4>
    </div>
  );
}
