import React from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

// Define the type for the props by extending React.HTMLProps<HTMLInputElement>
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const EmailInput: React.FC<InputProps> = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <div
      role="input"
      aria-required="true"
      className={`poppins-semibold text-complementaryLight border-b-2 mb-8 ${
        isFocused ? 'border-b-[#5C2E12]' : ''
      }`}
    >
      <label htmlFor="email" className="block text-md font-medium">
        Email
      </label>
      <div className="flex items-center">
        <EmailOutlinedIcon />
        <input
          {...props}
          type="email"
          name="email"
          autoComplete="email"
          className={`${
            props.className || ''
          } w-full border-none focus:ring-0 placeholder-complementaryLight`}
          onFocus={(e) => {
            if (props.onFocus) props.onFocus(e);
            setIsFocused(true);
          }}
          onBlur={(e) => {
            if (props.onBlur) props.onBlur(e);
            setIsFocused(false);
          }}
        />
      </div>
    </div>
  );
};

export default EmailInput;
