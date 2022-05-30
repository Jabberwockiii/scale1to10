//import logo from "./logo.svg";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
//aws 
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const App = () => {
  return (
    <Authenticator>
       {({ signOut, user }) => (
         <div className="App">
         <NavBar signOut={signOut}/>           
         <Outlet />
       </div>
       )}
    </Authenticator>
  );
};

export default App;
