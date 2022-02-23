import Login from './components/user/auth/Login';
import React, { useEffect, useState } from 'react';
import './App.css';
import Register from './components/user/auth/Register';
import Profile from './components/user/Profile';
import AddAdvertisement from './components/resource/AddAdvertisement';
import PrimarySearchAppBar from './components/core/Navigation';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ResourceList } from './components/resource/ResourceList';
import { ResourceTemplate } from './models/ResourceTemplate';
import EditAdvertisement from './components/resource/EditAdvertisement';
import AddComment from './components/comment/AddComment';
import EditComment from './components/comment/EditComment';
import { IUser } from './models/IUser';
import { userRole } from './models/enums/Role';
import { emptyUser } from './constants';
import AllUsersAdmin from './components/user/AllUsersAdmin';
import NotFound from './components/core/NotFound';
import { RootState } from './rootReducer';
import { useSelector } from 'react-redux';
import store from './store';


function App() {

  const location = useLocation();
  const [user, setUser] = useState<IUser>(store.getState().auth.user||emptyUser)//(emptyUser);

  const loggedUser = useSelector((state: RootState) => {
    return state.auth.user;
  });

  function handleChange() {
    let previousValue = loggedUser
    const currentValue = (store.getState()).auth.user

    if (previousValue !== currentValue) {
      previousValue = currentValue
      setUser(currentValue!==null?currentValue:emptyUser);
    }
  }

  useEffect(() => {
    store.subscribe(handleChange);
  }, []);


  /* useEffect(() => {
     console.log('Location changed');
     const newUser: IUser = loggedUser == null ? emptyUser : loggedUser;//getInfo(emptyUser);
     setUser(newUser);
   }, [location]);
 */

  function useAuth() {
    return loggedUser !== null;
  }

  function adminAuth(): boolean {
    const user = { ...loggedUser }
    if (!user) return false;
    return Number(user.role) === userRole.Admin;
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
        <Route path="/profile" element={<RequireAuth><Profile user={user} /></RequireAuth>} />
        <Route path="/edit-advertisement/:resourceId" element={<RequireAuth><EditAdvertisement user={user} /></RequireAuth>} />
        <Route path="/add-advertisement" element={<RequireAuth>< AddAdvertisement props={resource} method='post' user={user} /></RequireAuth>} />
        <Route path="/add-comment/:resourceId" element={<RequireAuth><AddComment initialV='' /></RequireAuth>} />
        <Route path="/edit-comment/:commentId" element={<RequireAuth><EditComment /></RequireAuth>} />
        <Route path="/all-users/" element={<RequireAdmin><AllUsersAdmin /></RequireAdmin>} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div >
  );
}

export default App;


