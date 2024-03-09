import classes from '../styles/Error.module.css'

interface ErrorProps {
  errorMessage: string
}

export function Error({errorMessage}: ErrorProps) {
  return (
    <p className={classes.error}>{errorMessage}</p>
  )
}