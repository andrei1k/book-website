import classNames from 'classnames';
import classes from '../styles/Form.module.css'

export type FormProps = React.HTMLAttributes<HTMLFormElement>;

export function Form({ children, className, ...rest }: FormProps) {
  return (
    <form className={classNames(classes.form, className)} {...rest}>
      {children}
    </form>
  );
}
