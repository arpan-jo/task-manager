import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Button } from 'semantic-ui-react';
import { UserContext } from '../App';
import firebase from './firebaseConfig';

const Login = () => {
   const Style = {
      padding: '30px 60px 60px 60px',
      textAlign: 'center',
      height: '100vh',
   };
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const history = useHistory();
   const location = useLocation();
   const { from } = location.state || { from: { pathname: '/task' } };

   const provider = new firebase.auth.GoogleAuthProvider();
   const handleSignin = () => {
      firebase
         .auth()
         .signInWithPopup(provider)
         .then(result => {
            const user = result.user;
            setLoggedInUser(user);
            history.replace(from);
         })
         .catch(error => {
            const errorMessage = error.message;
            alert(errorMessage);
         });
   };

   return (
      <div style={Style}>
         <h1 style={{ marginBottom: '100px' }}>BO0NGG TASK MANAGER</h1>
         <h4>Please login first!</h4>
         <Button onClick={handleSignin}>
            <h3>
               Login with<i class="google icon"></i>
            </h3>
         </Button>

         <h3 style={{ marginTop: 'calc(100vh - 50vh)' }}>
            Built by Arpan Chakma |{' '}
            <a href="https://arpanchakma.netlify.app/" target="blank">
               Website
            </a>
         </h3>
      </div>
   );
};

export default Login;
