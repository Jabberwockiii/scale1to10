import logo from "./logo.svg";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
//aws 
import { Authenticator, useAuthenticator,  } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';
import { Header} from './Header';
import {Grid, Flex, Image, View} from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

export function Home() {
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
}
