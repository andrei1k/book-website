import classNames from "classnames";
import classes from '../styles/Button.module.css'

interface InputProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: string;
  disabled?: boolean
}

export function Button({ variant = "primary", className, disabled = false, children, ...props }: InputProps) {
  return (
    <button
      className={classNames(className, classes.button, classes[disabled ? 'disabled' : variant])}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
