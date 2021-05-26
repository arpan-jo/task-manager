import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import PrivateRoute from './Components/PrivateRoute';
import TaskManager from './Components/TaskManager';

export const UserContext = createContext();
function App() {
   const [loggedInUser, setLoggedInUser] = useState();
   return (
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
         <Router>
            <Switch>
               <Route exact path="/">
                  <Login />
               </Route>
               <PrivateRoute path="/task">
                  <TaskManager />
               </PrivateRoute>
            </Switch>
         </Router>
      </UserContext.Provider>
   );
}

export default App;
