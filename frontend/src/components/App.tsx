import '../styles/App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BookLibrary } from './BookLibrary';
import { PublicOutlet } from './PublicOutlet';
import { BookDetails } from './BookDetails';
import { Login } from './Login';
import { UserPage } from './UserPage';
import { Header } from './Header';
import { User, userInfoService } from '../services/userInfoService';
import { PrivateOutlet } from './PrivateOutle';
import { AddBooKForm } from './AddBookForm';

export function App() {
  const [user, setUser] = useState<User | null>(userInfoService.getSavedUserInfo());

  useEffect(() => {
    userInfoService.setHandler(setUser);

    return () => {
      userInfoService.setHandler(null);
    }
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header user={user}/>} path='/'>
          <Route element={<BookLibrary />}  path='library' />
          <Route element={<PrivateOutlet user={user}/>}>
            <Route element={<BookDetails />} path='bookDetails/:id'/>
            <Route element={<UserPage />} path='user'/>
            <Route element={<AddBooKForm />} path='books/new'/>
          </Route>
          <Route element={<Navigate to='/library' />} path='*' />
          <Route element={<Navigate to='/library' />} path='' />
        </Route>
        <Route element={<PublicOutlet user={user} />} path='/login'>
          <Route element={<Login/>} path=''/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
