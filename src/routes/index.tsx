import React from 'react'; 
import { Switch } from 'react-router-dom';

import Route from './Route'; 

import Home from '../pages/Home'; 
import SignIn from '../pages/SignIn'; 
import ForgotPassword from '../pages/ForgotPassword'; 
import ResetPassword from '../pages/ResetPassword'; 
import SignUp from '../pages/SignUp'; 
import Dashboard from '../pages/Dashboard'; 
import Checkout from '../pages/Checkout'; 
import Profile from '../pages/Profile'; 
  
const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/checkout" component={Checkout} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />
    </Switch>

);

export default Routes; 