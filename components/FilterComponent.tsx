import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

interface FilterComponentProps {
  title: string;
}

const CustomCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function FilterComponent({ title }: FilterComponentProps) {
  return (
    <div className="flex flex-row items-center gap-x-2">
      <CustomCheckbox />
      <h4>{title}</h4>
    </div>
  );
}
