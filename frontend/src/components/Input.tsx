import classNames from "classnames"
import classes from '../styles/Input.module.css'
import { Error } from "./Error"


interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  variant?: string,
  value: string,
  setValue: (value: string) => void,
  errors?: string []
}

export function Input({ variant = 'primary', className, errors, value, setValue , ...props }: InputProps) {
  return (
    <>
      <input 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={classNames(className, classes.input, classes[variant])}
        {...props} />
      {errors && <Error errorMessage={errors.join(', ')}/>}
    </>
  )
}
