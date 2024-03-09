import { Link, Outlet, useLocation } from "react-router-dom";
import { authService } from "../services/authService";
import { Button } from "./Button";
import classes from '../styles/Header.module.css'
import { useEffect, useState } from "react";
import { User } from "../services/userInfoService";

interface HeaderProps {
  user?: User | null
}

export function Header({user}: HeaderProps) {

  const location = useLocation();
  const isInUserPage = location.pathname === '/user';
  const isInLibrary = location.pathname === '/library';

  const [lightTheme, setLightTheme] = useState(document.body.classList.value === 'light')  

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(lightTheme ? 'light': 'dark')
  }, [lightTheme])

  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <h1 className={classes.title}>Detskij Mir</h1>
          <Button className={classes.image} variant="image" onClick={() => setLightTheme(!lightTheme)}>
            {<img alt="theme icon" src={lightTheme ? '../../images/moon.svg' : '../../images/sun.svg'}/>}
          </Button>
        
        <div className={classes.controlers}>
          <>
            <Button disabled={!user || isInUserPage}><Link className={classes.link} to='/user'>{user ? user.username : "User Page"}</Link></Button>
            <Button disabled={isInLibrary}><Link className={classes.link} to='/library'>Library</Link></Button>
            {user ? <Button variant='accent' onClick={() => authService.logout()}>Logout</Button> :
                   <Button><Link className={classes.link} to='/login'>Login</Link></Button>}
          </>
        </div>
      </header>
      <Outlet />
    </div>

  )
}