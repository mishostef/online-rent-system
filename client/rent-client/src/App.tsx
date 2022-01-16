import Login from './components/Login';
import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import Register from './components/Register';
import Profile from './components/Profile';
import AddAdvertisement from './components/AddAdvertisement';
import PrimarySearchAppBar from './components/Navigation';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Resource from './components/Resource';
import { ResourceList } from './components/ResourceList';
import { resource as res } from './enums/resource'
import { ResourceTemplate } from './models/ResourceTemplate';
import { EditAdvertisement } from './components/EditAdvertisement';
import Profile1 from './components/Profile1';
import * as authService from './services/authService';
import AddComment from './components/AddComment';
import EditComment from './components/EditComment';
import { IUser } from './models/IUser';
import { userRole } from './enums/Role';
import { emptyUser, getInfo } from './constants';
import AllUsersAdmin from './components/AllUsersAdmin';
import { getCookieJWTInfo } from './services/userservice';
import NotFound from './components/NotFound';




function App() {


  const location = useLocation();

  const [user, setUser] = useState<IUser>(emptyUser)
  ///const [isLogged, setIsLogged] = useState(false);

  React.useEffect(() => {
    console.log('Location changed');
    const newUser = getInfo(emptyUser);
    setUser(newUser);
  }, [location]);


  function useAuth() {
    return sessionStorage['SESSION_TOKEN'];
  }

  function adminAuth(): boolean {
    const user = getCookieJWTInfo();
    if (user) return user.role == userRole.Admin;
    return false;
  }

  function RequireAuth({ children }: { children: JSX.Element }) {

    let auth = useAuth();
    let location = useLocation();
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} />;
      // navigate("/login", {state: { from: location } })
    }

    return children;
  }

  function RequireAdmin({ children }: { children: JSX.Element }) {
    let auth = adminAuth();
    let location = useLocation();
    if (!auth) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
  }


  const resource = new ResourceTemplate();
  return (
    <div className="App">
      <PrimarySearchAppBar user={user} />
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users/:id" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile1 user={user} /></RequireAuth>} />
        <Route path="/edit-advertisement/:resourceId" element={<RequireAuth><EditAdvertisement /></RequireAuth>} />
        <Route path="/add-advertisement" element={<RequireAuth>< AddAdvertisement props={resource} method='post' /></RequireAuth>} />
        <Route path="/add-comment/:resourceId" element={<RequireAuth><AddComment initialV='' /></RequireAuth>} />
        <Route path="/edit-comment/:commentId" element={<RequireAuth><EditComment /></RequireAuth>} />
        <Route path="/all-users/" element={<RequireAdmin><AllUsersAdmin /></RequireAdmin>} />
        <Route path="/*" element={<NotFound/>} />        
      </Routes>
    </div >
  );
}




export default App;


