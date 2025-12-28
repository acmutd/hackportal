import React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Define the type for the props by extending React.HTMLProps<HTMLInputElement>
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput: React.FC<InputProps> = (props) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div
      role="input"
      aria-required="true"
      className={`poppins-semibold text-complementaryLight border-b-2 mb-8 ${
        isFocused ? 'border-b-[#5C2E12]' : ''
      }`}
    >
      <label htmlFor="password" className="block text-md font-medium">
        Password
      </label>
      <div className="flex items-center">
        <LockOutlinedIcon />
        <input
          {...props}
          type={showPassword ? 'text' : 'password'}
          name="password"
          autoComplete="password"
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
        <div onClick={toggleShowPassword} className="cursor-pointer">
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </div>
      </div>
    </div>
  );
};

export default PasswordInput;
